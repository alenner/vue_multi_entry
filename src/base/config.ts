/**
 * modules模板配置整合 
 */
import { RouteRecordRaw } from 'vue-router'

type WholeRouterConfig = {
  [key: string]: RouteRecordRaw[]
}
const wholeRouterConfig: WholeRouterConfig = {}
const NoneRouter: RouteRecordRaw = { path: "/:pathMatch(.*)*", redirect: { name: "404" } } // 无法匹配的路由名将跳转404页面

const files = import.meta.globEager('../modules/**/config.ts') as { [key: string]: any } // vite批量文件引用的方法

Object.keys(files).forEach(path => {
  let fileData = files[path]
  fileData = fileData.default || fileData
  // TODO: 路由配置整合，根据入口分类
  if (!wholeRouterConfig[fileData?.entry || 'main']) {
    wholeRouterConfig[fileData?.entry || 'main'] = [...fileData.router]
  } else {
    wholeRouterConfig[fileData?.entry || 'main'].push(...fileData.router)
  }
})

function getModuleRoutes(entry?: string): RouteRecordRaw[] {
  console.log('resultRoutes', [...wholeRouterConfig[entry || 'main'], NoneRouter])
  return [...wholeRouterConfig[entry || 'main'], NoneRouter]
}

export {
  getModuleRoutes
}
