/* 主模块路由配置 */
export default [
  { path: '/', name: 'Home', component: () => import('../views/index.vue'), meta: {} }
]