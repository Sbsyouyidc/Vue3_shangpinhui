import { State, Address, Order } from './types'
import { reqAddress, reqOrder } from '@/api'

const state: State = {
  address: [],
  order: {}
}

const mutations = {
  ADDRESS(state: State, address: Array<Address>) {
    state.address = address
  },
  ORDER(state: State, order: Order) {
    state.order = order
  }
}

const actions = {
  async getUserAddress({commit}) {
    let res = await reqAddress()
    if (res.code === 200) {
      commit('ADDRESS', res.data)
    } else {
      return Promise.reject(res.message)
    }
  },
  // 获取商品清单
  async getOrderInfo({commit}) {
    let res = await reqOrder() 
    if (res.code === 200) {
      commit('ORDER', res.data)
    } else {
      return Promise.reject(res.message)
    }
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}