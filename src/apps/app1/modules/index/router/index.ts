/* 主模块路由配置 */
export default [
  { path: '/app1',name: 'App1', component: () => import('../views/index.vue'), meta: {} }
]