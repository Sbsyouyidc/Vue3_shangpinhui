import { createRouter, createWebHistory, RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import Routes from './routes'
import store from '@/store'

const routes: Array<RouteRecordRaw> = Routes

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return {top: 0}
  }
})

// 前置守卫，跳转前判断
router.beforeEach(async (to, from, next) => {
  // 用户登陆了才会有token
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token !== '') {
    // 用户已经登陆了，不能再去登陆页面
    if (to.path === '/login' || to.path === '/register') {
      next('/')
    } else {
      // 登录，取得不是login
      // 如果已经有用户名
      if (name) {
        next()
      } else {
        // 没有用户信息，派发action
        try {
          // 获取成功
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效了,重新登陆
          await store.dispatch('logout')
          next('/login')
        }
      }
    }
  } else {
    next()
  }
})

export default router
