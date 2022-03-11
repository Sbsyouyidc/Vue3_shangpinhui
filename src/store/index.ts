import { createStore } from 'vuex'
import home from './home/home'
import search from './search/search'
import detail from './detail/detail'
import cart from './cart/cart'
import user from './user/user'

interface State {
  [key: string]: any
}


export default createStore({
  state: <State>{
    
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
    cart,
    user
  }
})
