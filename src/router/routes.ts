import Home from '@/views/Home/index.vue'

export default [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {show: true}
  },
  {
    path: '/search/:keyword?',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "search" */ '../views/Search/index.vue'),
    meta: {show: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Search/index.vue'),
    meta: {show: false}
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register/index.vue'),
    meta: {show: false}
  },
  {
    path: '/detail/:skuId',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "detail" */ '@/views/Detail/index.vue'),
    meta: {show: false}

  },
  {
    path: '/addCartSuccess',
    name: 'AddCartSuccess',
    component: () => import(/* webpackChunkNane: addCartSuccess */ '@/views/AddCartSuccess/index.vue'),
    meta: {show: false}
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: cart */ '@/views/Cart/index.vue'),
    meta: {show: false}
  },
  {
    path: '/',
    redirect: '/home'
  }
]