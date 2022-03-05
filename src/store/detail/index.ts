import { reqGoodDetail } from "@/api";
import {State, CategoryView, GoodDetail} from './types'

const state: State = {
  goodDetail: {}
}

const mutations = {
  GOODDETAIL(state: State, goodDetail: GoodDetail) {
    state.goodDetail = goodDetail
  }
}

const actions = {
  async getGoodDetail({commit}, skuId: string) {
    console.log(skuId)
    let res = await reqGoodDetail(skuId)
    console.log(res)
    if (res.code === 200) {
      commit('GOODDETAIL', res.data)
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