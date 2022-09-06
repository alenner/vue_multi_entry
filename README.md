# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## 这是一个H5端的多入口应用项目（试验阶段）

### 前言

该项目的多入口指的是多个单页面应用的集合

### 开启本地web服务调试

`yarn run dev` // 默认开启 app1应用

`yarn run dev -- --open /${app}` // app 为应用入口名称 对应`/apps`下的目录

### 打包生产环境项目

`yarn run build`

### 预览打包项目

`yarn run preview`

### 项目目录结构说明
```
build -- 项目打包的指定目录
public -- 公共资源目录
apps -- 多入口HTML文件目录
├─ app1 -- app1应用 （命名不固定）
│  ├─ index.html
├─ qpp2 -- app2应用 （命名不固定）
│  ├─ index.html
└─ xxx 等等

src -- 源码目录
├─ base/common -- 通用
│  ├─ api -- 全局api
│  ├─ assets -- 静态资源文件
│  ├─ components -- 通用组件封装
│  ├─ styles -- 通用主题、样式、scss变量和mixin（scss及主题）
│  ├─ layout -- 通用布局封装 
│  └─ utils -- 工具类
├─ apps  --  项目入口目录
│  ├─ app1 --  app1应用
│  │  ├─ modules -- 业务模块目录
│  │  │  ├─ home -- 首页
│  │  │  │  ├─ api -- 模块的api
│  │  │  │  ├─ assets -- 模块的静态资源
│  │  │  │  ├─ components -- 模块的组件
│  │  │  │  ├─ router --  模块的路由
│  │  │  │  ├─ store  --  模块的vuex/pinia
│  │  │  │  ├─ views  --  模块vue文件
│  │  │  │  └─ config.js  --  模块的导出文件
│  │  │  ├─ login -- 登录
│  │  │  ├─ xxx -- xxx业务模块
│  │  ├─ router -- vue-router路由配置
│  │  │  ├─ index.ts
│  │  │  └─ guard.ts -- 路由守卫
│  │  ├─ App.vue -- 应用根组件
│  │  ├─ config.ts  -- 业务模块统合文件
└─ └─ └─ main.ts -- 入口文件
``` 

### 关于多入口页面应用本地开发环境配置

#### 要实现如下打包后的文件目录：
```
build -- 项目打包的指定目录
├─ common -- 公共目录
│  ├─ static -- 静态目录
│  │  ├─ css
│  │  ├─ js
│  │  ├─ images
│  │  └─ 等等
├─ apps -- 应用合集目录
│  ├─ app1 -- app1应用
│  │  ├─ static -- 静态目录
│  │  │  ├─ css
│  │  │  ├─ entry -- 入口文件
│  │  │  ├─ js
│  │  │  └─ assets -- 资源目录
│  └─ └─ index.html
└─ public目录的一些文件
``` 
1. 需先在项目根目录下创建与build目录相对应的html文件目录，如图：
![img](https://p0.meituan.net/dpplatform/38d75a3cc6d127c09a7075ef26f93b365733.png "目录截图")

2. 在vite.config.ts中，配置自定义打包配置：
``` javascript
    // 在build.rollupOptions中
    rullupOpitons: {
        input: {
          app1: resolve(__dirname, 'app/app1/index.html'),
          app2: resolve(__dirname, 'apps/app2/index.html'),
          ...
        },
        output: {
            ...,
            /* 打包文件整理 */
          // 代码块整理
          chunkFileNames: (chunkInfo)=>{
            if(chunkInfo.facadeModuleId&&chunkInfo.facadeModuleId.includes('src')){
              const module_name=chunkInfo.facadeModuleId.match(/src\/apps\/(.+?)\//)[1]
              return `apps/${module_name}/static/js/[name]-[hash].js`
            }
            return 'common/static/js/[name]-[hash].js'
          },
          // 入口文件整理
          entryFileNames:(chunkInfo)=>{
            if(chunkInfo.facadeModuleId){
              const module_name=chunkInfo.facadeModuleId.match(/\/apps\/(.+?)\//)[1]
              return `apps/${module_name}/static/entry/[name]-[hash].js`
            }
            return 'common/static/entry/[name]-[hash].js'
          }, 
          // 静态资源整理
          assetFileNames: (chunkInfo)=>{
            if(chunkInfo.name&&chunkInfo.name.includes('apps')){
              const module_name=chunkInfo.name.match(/apps\/(.+?)\//)[1]
              return `apps/${module_name}/static/[ext]/[name]-[hash].[ext]`
            }
            return 'common/static/[ext]/[name]-[hash].[ext]'
          }
        }
    }
```
#### 开发环境中的多入口单页面应用配置

**问题和思考：** 对于习惯运用单入口单页面应用脚手架开发的前端来说，可能在多入口页面应用项目的架构当中开发的时候，由于devServer存在默认配置的原因，在多入口页面应用项目当中，html文件的目录会根据自身的需求去调整存放的目录路径（默认`/index.html`），而devServer中http服务在访问域名时，会默认定位到`/index.html`去访问，在多入口页面应用项目当中，这就会导致在vue-router使用history模式的进行路由跳转的时候，再次刷新页面会出现页面404的情况，原因就是项目中不存在`/index.html`的文件。那么在该多入口页面应用项目当中，要怎么实现开发环境下，能够正常的进行路由跳转而刷新不会出现404的情况，甚至可以进行跨应用跳转呢？

**以下是我的一些解决方案：**
1. 浏览器渲染页面也是需要经过请求服务获取html文件去渲染的，那么可以在本地开发服务配置当中利用proxy服务代理的方式去执行页面html请求的一个重定向，具体实现方式如下：
``` javascript
    /* 
     * 在vite.config.ts文件的server.proxy中设置
     * 其中${key} 为应用入口名称（与'/apps'目录下的文件夹名称对应）
    */ 
    porxy: {
      [`/${key}`]: {
          target: 'http://localhost',
          // 解决单页面html文件路径不为'/index.html'时，启用history路由刷新页面404问题
          bypass: (req, res, options) => {
              // 当请求的文件类型为html的时候，执行重定向
              if (req.headers.accept.indexOf('html') !== -1) {
                  return `/apps/${key}/index.html`;
              }
          }
      }
    }
```
