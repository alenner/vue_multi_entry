import { createRouter, createWebHistory } from 'vue-router'
import { ModuleRoutes } from '../config'

const router = createRouter({
  history: createWebHistory(),
  routes: ModuleRoutes
})

export default router