/* 路由实例创建和挂载 */
import { createRouter, createWebHistory } from 'vue-router'
import { ModuleRoutes } from '@/base/config'

const router = createRouter({
  history: createWebHistory(),
  routes: ModuleRoutes
})

export default router