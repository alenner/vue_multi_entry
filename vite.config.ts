import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
/* 引用postcss-px-to-viewport */
import postCssPxToViewport from 'postcss-px-to-viewport'
import PxToViewportConfig from './postcssrc.js'
/* 服务环境配置 */
import serverPageProxy from './serverPageProxy.config.js'
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  /* 根据mode模式读取相应的env文件配置 */
  const env = loadEnv(mode, process.cwd())

  //获取命令行参数信息
  const argvIndex = process.argv.findIndex(key => key === '--open') // 获取命令行带 '--open' 标识下标
  const openUrl = argvIndex > -1 ? process.argv[argvIndex + 1] : '/page1'
  return {
    /* 插件激活 */
    plugins: [vue()],
    /* 路径重写 */
    resolve: {
      alias: {
        "@": resolve(__dirname, './src')
      }
    },
    /**
     * 定义全局数据对象
     * 主要用于存放环境变量相关配置，可在项目中任意位置通过define的属性访问: 比如：process.env
     */
    define: {
      "process.env": env
    },
    css: {
      postcss: {
        plugins: [
          postCssPxToViewport(PxToViewportConfig) // H5端响应式单位配置方案
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/base/styles/global.scss';` // 项目全局共享scss变量和mixin混入
        }
      }
    },
    /* 打包配置 */
    build: {
      sourcemap: env.VITE_APP_NODE_ENV === 'development',
      outDir: 'build', //指定输出路径
      assetsDir: 'static', // 指定⽣成静态资源的存放路径
      brotliSize: false, // 不统计
      target: 'esnext',
      minify: 'esbuild', // 混淆器，terser构建后⽂件体积更⼩
      rollupOptions: {
        input: {
          page1: resolve(__dirname, 'pages/page1/index.html'),
          page2: resolve(__dirname, 'pages/page2/index.html')
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const arr = id.toString().split('node_modules/')[1].split('/')
              switch (arr[0]) {
                /**
                 * 把一些比较大的第三方依赖抽离出来
                 * 比如（vue,axios,vuex,pinia,lodash,echarts,还有各种UI库等等）
                 */
                case '@popperjs':
                case '@vue':
                case 'axios':
                case 'vue-router':
                // case 'echarts':
                case 'lodash':
                case 'pinia':
                  // case 'element-plus':
                  return '_' + arr[0]
                  break;
                // 一些比较小的第三方库可以整合到一个文件当中
                default:
                  return '__vendor'
                  break;
              }
            }
          },
          /* 打包文件整理 */
          // 代码块整理
          chunkFileNames: (chunkInfo)=>{
            if(chunkInfo.facadeModuleId&&chunkInfo.facadeModuleId.includes('src')){
              const module_name=chunkInfo.facadeModuleId.match(/src\/pages\/(.+?)\//)[1]
              return `pages/${module_name}/static/js/[name]-[hash].js`
            }
            return 'common/static/js/[name]-[hash].js'
          },
          // 入口文件整理
          entryFileNames:(chunkInfo)=>{
            if(chunkInfo.facadeModuleId){
              const module_name=chunkInfo.facadeModuleId.match(/\/pages\/(.+?)\//)[1]
              return `pages/${module_name}/static/entry/[name]-[hash].js`
            }
            return 'common/static/entry/[name]-[hash].js'
          }, 
          // 静态资源整理
          assetFileNames: (chunkInfo)=>{
            if(chunkInfo.name&&chunkInfo.name.includes('pages')){
              const module_name=chunkInfo.name.match(/pages\/(.+?)\//)[1]
              return `pages/${module_name}/static/[ext]/[name]-[hash].[ext]`
            }
            return 'common/static/[ext]/[name]-[hash].[ext]'
          }
        }
      },

    },
    /* 服务器配置 */
    server: {
      /* 服务代理配置 */
      proxy: {
        '/api': {
          target: 'http://localhost:8080', // 目标域名地址
          ws: true, // 开启websocket代理
          changeOrigin: true, // 开启跨域访问
          rewrite: (path) => path.replace('^/api', '/') // 请求路径重写
        },
        // 多应用代理设置
        ...serverPageProxy
      },
      open: openUrl
    }
  }
})
