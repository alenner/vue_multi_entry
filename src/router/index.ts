/* 路由实例创建和挂载 */
import { createRouter, createWebHistory } from 'vue-router'
import { getModuleRoutes } from '@/base/config'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../modules/home/views/index.vue') },
    ...getModuleRoutes()
  ]
})

export default router