import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
/* 引用postcss-px-to-viewport */
import postCssPxToViewport from 'postcss-px-to-viewport'
import PxToViewportConfig from './postcssrc.js'

/* 服务环境配置 */

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  /* 根据mode模式读取相应的env文件配置 */
  const env = loadEnv(mode, process.cwd())
  return {
    /* 插件激活 */
    plugins: [vue()],
    /* 路径重写 */
    resolve: {
      alias: {
        "@": resolve(__dirname, './src')
      }
    },
    define: {
      "process.env": env
    },
    css: {
      postcss: {
        plugins: [
          postCssPxToViewport(PxToViewportConfig) // H5端响应式单位配置
        ]
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
          main: resolve(__dirname, 'index.html'),
          page1: resolve(__dirname, 'page1.html')
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
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/entry/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
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
        }
      }
    }
  }
})
