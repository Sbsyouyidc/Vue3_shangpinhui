import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav/index'
import Pagination from '@/components/Pagination/index'
// 引入mockServe.js
import '@/mock/mockServe.js'
import "swiper/swiper-bundle.min.css"
import mitt from 'mitt'

const emitter = mitt()

const app = createApp(App)

// 全局注册mitt
app.config.globalProperties.emitter = emitter

// 全局组件
app.use(TypeNav).use(Pagination)

app.use(store).use(router).mount('#app')
