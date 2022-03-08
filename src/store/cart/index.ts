import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"
import { Store } from "vuex";
import { State, CartInfo, CartInfoList } from './types';

const state: State = {
  cartList: []
}

const mutations = {
  CARTLIST(state: State, cartList: Array<CartInfoList>) {
    state.cartList = cartList
  }
}

const actions = {
  // 获取列表数据
  async getCartList({commit}) {
    let res = await reqCartList()
    if (res.code === 200) 
      commit('CARTLIST', res.data)
  },
  // 删除列表数据
  async deleteCartById({commit}, skuId: string) {
    let res = await reqDeleteCartById(skuId)
    if (res.code === 200) {
      return 'deleted'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 修改列表数据
  async updateCheckedById({commit}, {skuId, isChecked}) {
    let res = await reqUpdateCheckedById(skuId, isChecked)
    if (res.code === 200) 
      return 'updated'
    else {
      return Promise.reject(new Error('update failed'))
    }
  },
  // 删除选中的商品
  deleteAllChecked({dispatch, getters}) {
    // context小仓库，commit、getters、dispatch、state
    // 获取购物车中全部产品
    let promiseAll:  any[] = []
    getters.cartInfoList.forEach((item: CartInfo) => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : ''
      // 将每次返回都添加到数组中
      promiseAll.push(promise)
    })
    // 全部Promise都成功，返回为成功
    return Promise.all(promiseAll)
  }
}

const getters = {
  cartInfo(state: State) {
    return state.cartList[0] || {}
  },
  cartInfoList(state: State) {
    return state.cartList[0]?.cartInfoList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}