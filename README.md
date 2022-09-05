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

### 开启本地web服务调试

`yarn run dev -- --open /${entry}` // entry 为入口名称

### 打包生产环境项目

`yarn run build`

### 预览打包项目

`yarn run preview`

### 项目目录结构说明
```
build -- 项目打包的指定目录
public -- 公共资源目录
pages -- 多入口HTML文件目录
├─ main -- 主入口 （命名不固定）
│  ├─ index.html
├─ sub -- 子入口 （命名不固定）
│  ├─ index.html
└─ xxx 等等

src -- 源码目录
├─ base/common -- 通用
│  ├─ api -- 全局api
│  ├─ assets -- 静态（scss及主题）资源文件
│  ├─ components -- 通用组件封装
│  ├─ styles -- 通用主题、样式、scss变量和mixin
│  ├─ layout -- 通用布局封装 
│  ├─ utils -- 工具类
│  └─ config.js  -- 项目模块统合文件
├─ pages  --  项目入口目录
│  ├─ main --  main应用
│  │  ├─ modules -- 业务模块目录
│  │  │  ├─ home -- 首页
│  │  │  │  ├─ api -- 模块的api
│  │  │  │  ├─ assets -- 模块的静态资源
│  │  │  │  ├─ components -- 模块的组件
│  │  │  │  ├─ router --  模块的路由
│  │  │  │  ├─ store  --  模块的vuex
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