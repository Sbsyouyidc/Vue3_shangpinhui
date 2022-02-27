import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav/index'
// 引入mockServe.js
import '@/mock/mockServe.js'
import "swiper/swiper-bundle.min.css"

const app = createApp(App)
// 全局组件
app.use(TypeNav)

app.use(store).use(router).mount('#app')
