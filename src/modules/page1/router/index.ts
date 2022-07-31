/* 主模块路由配置 */
export default [
  { path: '/page1.html', name: 'Page1', component: () => import('../views/index.vue'), meta: {} }
]