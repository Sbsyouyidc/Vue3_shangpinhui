import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import TypeNav from '@/views/Home/TypeNav/index'

const app = createApp(App)
// 全局组件
app.use(TypeNav)

app.use(store).use(router).mount('#app')
