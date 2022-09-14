import { createApp } from 'vue'
import App from './App.vue'
// 引用vant组件库
// import vant from 'vant'

// 引入vant组件样式
// import 'vant/lib/index.css'

// 引用初始化样式
import '@/base/styles/reset.scss'

import router from './router'

const app = createApp(App)

/* 路由注册 */
app.use(router)

/* vant组件注册 */
// app.use(vant)

app.mount('#app')
