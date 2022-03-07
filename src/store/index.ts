import { createStore } from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import cart from './cart'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {

  },
  modules: {
    home,
    search,
    detail,
    cart
  }
})
