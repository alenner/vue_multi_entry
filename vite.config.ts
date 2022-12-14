import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
/* 引用postcss-px-to-viewport */
import postCssPxToViewport from 'postcss-px-to-viewport'
import PxToViewportConfig from './postcssrc.js'

/* 引用unplugin-auto-import插件 */
import AutoImport from 'unplugin-auto-import/vite'

/* 引用unplugin-vue-components插件 */
import Components from 'unplugin-vue-components/vite'
/* 引用VantUI解析器 */
import { VantResolver } from 'unplugin-vue-components/resolvers'
/* 服务环境配置 */
import serverPageProxy from './serverPageProxy.config'
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  /* 根据mode模式读取相应的env文件配置 */
  const env = loadEnv(mode, process.cwd())

  // 获取命令行参数信息
  const argvIndex = process.argv.findIndex(key => key === '--open') // 获取命令行带 '--open' 标识下标
  const openUrl = argvIndex > -1 ? process.argv[argvIndex + 1] : '/app1'
  return {
    /* 插件激活 */
    plugins: [
      vue(),
      /* 激活autoImport插件 */
      AutoImport({
        /**
         * 配置要自动引用的插件
         * 自动导入 Vue 组合式API，如：ref, reactive, toRef 等
         * 自动导入 vue-router 组合式API，如：useRouter，useRoute等
         */
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-import.d.ts', // 使用TypeScript的话，需要生成src路径下名为 auto-import.d.ts的是声明文件
        /* 解决eslint报错问题 */
        eslintrc: {
          enabled: true
        }
      }),
      /* 激活Components插件 */
      Components({
        resolvers: [VantResolver()] // 解析vantUI组件并实现自动按需引入
      })
    ],
    /* 路径重写 */
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    /**
     * 定义全局数据对象
     * 主要用于存放环境变量相关配置，可在项目中任意位置通过define的属性访问: 比如：process.env
     */
    define: {
      'process.env': env
    },
    css: {
      postcss: {
        plugins: [
          postCssPxToViewport(PxToViewportConfig) // H5端响应式单位配置方案
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/base/styles/global.scss';" // 项目全局共享scss变量和mixin混入
        }
      }
    },
    /* 打包配置 */
    build: {
      sourcemap: env.VITE_APP_NODE_ENV === 'development',
      outDir: 'build', // 指定输出路径
      assetsDir: 'static', // 指定⽣成静态资源的存放路径
      brotliSize: false, // 不统计
      target: 'esnext',
      minify: 'esbuild', // 混淆器，terser构建后⽂件体积更⼩
      rollupOptions: {
        input: {
          app1: resolve(__dirname, 'apps/app1/index.html'),
          app2: resolve(__dirname, 'apps/app2/index.html')
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
                case 'vant':
                  return '_' + arr[0]
                  break
                // 一些比较小的第三方库可以整合到一个文件当中
                default:
                  return '__vendor'
                  break
              }
            }
          },
          /* 打包文件整理 */
          // 代码块整理
          chunkFileNames: chunkInfo => {
            if (chunkInfo.facadeModuleId && chunkInfo.facadeModuleId.includes('src')) {
              const module_name = chunkInfo.facadeModuleId.match(/src\/apps\/(.+?)\//)[1]
              return `apps/${module_name}/static/js/[name]-[hash].js`
            }
            return 'common/static/js/[name]-[hash].js'
          },
          // 入口文件整理
          entryFileNames: chunkInfo => {
            if (chunkInfo.facadeModuleId) {
              const module_name = chunkInfo.facadeModuleId.match(/\/apps\/(.+?)\//)[1]
              return `apps/${module_name}/static/entry/[name]-[hash].js`
            }
            return 'common/static/entry/[name]-[hash].js'
          },
          // 静态资源整理
          assetFileNames: chunkInfo => {
            if (chunkInfo.name && chunkInfo.name.includes('apps')) {
              const module_name = chunkInfo.name.match(/apps\/(.+?)\//)[1]
              return `apps/${module_name}/static/[ext]/[name]-[hash].[ext]`
            }
            return 'common/static/[ext]/[name]-[hash].[ext]'
          }
        }
      }
    },
    /* 服务器配置 */
    server: {
      /* 服务代理配置 */
      proxy: {
        '/api': {
          target: 'http://localhost:8080', // 目标域名地址
          ws: true, // 开启websocket代理
          changeOrigin: true, // 开启跨域访问
          rewrite: path => path.replace('^/api', '/') // 请求路径重写
        },
        // 多应用代理设置
        ...serverPageProxy
      },
      open: openUrl
    }
  }
})
