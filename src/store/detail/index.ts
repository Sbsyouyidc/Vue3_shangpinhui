import { reqGoodDetail, reqAddOrUpdateCart } from "@/api";
import {State, CategoryView, GoodDetail} from './types'

const state: State = {
  goodDetail: {}
}

const mutations = {
  GOODDETAIL(state: State, goodDetail: GoodDetail) {
    state.goodDetail = goodDetail
  },
}

const actions = {
  async getGoodDetail({commit}, skuId: string) {
    let res = await reqGoodDetail(skuId)
    if (res.code === 200) {
      commit('GOODDETAIL', res.data)
    }
  },
  async addOrUpdateCart({commit}, {skuId, skuNum}) {
    let res = await reqAddOrUpdateCart(skuId, skuNum)
    if (res.code === 200) {
      return 1
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}

const getters = {
  categoryView(state: State) {
    return state.goodDetail.categoryView || {}
  },
  skuInfo(state: State) {
    return state.goodDetail.skuInfo || {}
  },
  spuSaleAttrList(state: State) {
    return state.goodDetail.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}