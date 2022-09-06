import { createApp } from 'vue'
import '@/base/styles/reset.scss'
import App from './App.vue'

import router from './router'

const app = createApp(App)

/* 路由注册 */
app.use(router)

app.mount('#app')