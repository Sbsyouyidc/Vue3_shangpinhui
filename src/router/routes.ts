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
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/index.vue'),
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
    component: () => import(/* webpackChunkName: "addCartSuccess" */ '@/views/AddCartSuccess/index.vue'),
    meta: {show: false}
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '@/views/Cart/index.vue'),
    meta: {show: false}
  },
  {
    path: '/trade',
    name: 'Trade',
    component: () => import(/* webpackChunkName: "trade" */ '@/views/Trade/index.vue'),
    meta: {show: false},
    beforeEnter: (to, from, next) => {
      // 要去交易页面，必须是从购物车来的
      if (from.path === '/cart') {
        next()
      } else {
        // 否则停留在当前页面
        next(false)
      }
    }
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import(/* webpackChunkName: "pay" */ '@/views/Pay/index.vue'),
    meta: {show: false},
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paySuccess',
    name: 'PaySuccess',
    component: () => import(/* webpackChunkName: "paySuccess" */ '@/views/PaySuccess/index.vue'),
    meta: {show: false}
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import(/* webpackChunkName: "center" */ '@/views/Center/index.vue'),
    meta: {show: false},
    children: [
      {
        path: 'myOrder',
        component: () => import(/* webpackChunkName: "myOrder" */ '@/views/Center/MyOrder/index.vue')
      },
      {
        path: 'groupOrder',
        component: () => import(/* webpackChunkName: "groupOrder" */ '@/views/Center/GroupOrder/index.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  }
]