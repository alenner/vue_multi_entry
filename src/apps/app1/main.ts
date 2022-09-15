import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
// 引用vant组件库
// import vant from 'vant'

// 引入vant组件样式
// import 'vant/lib/index.css'

// 引入Vant的toast组件和样式
// tips：Toast 组件是以函数形式提供的，如果项目中使用 unplugin-vue-components 插件来自动引入组件样式，则无法正确识别 Toast 组件，因此需要手动引入 Toast 组件的样式
import { Toast } from 'vant'
import 'vant/es/toast/style'

// 引用初始化样式
import '@/base/styles/reset.scss'

import router from './router'

const app = createApp(App)

/* 路由注册 */
app.use(router)

/* pinia注册 */
app.use(createPinia())

/* vant toast组件挂载 */
app.config.globalProperties.$toast = Toast

app.mount('#app')
