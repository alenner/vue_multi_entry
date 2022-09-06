/**
 * modules模板配置整合 
 */
 import { RouteRecordRaw } from 'vue-router'

 let ModuleRoutes:RouteRecordRaw[] = []
 const NoneRouter: RouteRecordRaw = { path: "/:pathMatch(.*)*", redirect: { name: "404" } } // 无法匹配的路由名将跳转404页面
 
 const files = import.meta.globEager('./modules/**/config.ts') as { [key: string]: any } // vite批量文件引用的方法
 
 Object.keys(files).forEach(path => {
   let fileData = files[path]
   fileData = fileData.default || fileData
   // TODO: 路由配置整合
   ModuleRoutes.push(...fileData.router)
 })
 
 // 添加404路由
 ModuleRoutes = [...ModuleRoutes,NoneRouter]
 
 export {
   ModuleRoutes
 }