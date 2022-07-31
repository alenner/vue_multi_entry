import { createRouter, createWebHistory } from 'vue-router'
import { getModuleRoutes } from '@/base/config'

const router = createRouter({
  history: createWebHistory(),
  routes: getModuleRoutes('page1')
})

export default router