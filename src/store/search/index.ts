import { reqGetSearchInfo } from "@/api/index"
import {State, SearchList, listParams} from './types'

const state: State = {
  searchList: {}
}
const mutations = {
  SEARCHLIST(state: State, searchList: SearchList) {
    state.searchList = searchList
  }
}
const actions = {
  async getSearchList({commit}, params: listParams = {}) {
    // params形参：是用户派发action的时候，在第二个参数传递过来的，至少是一个空对象
    let res = await reqGetSearchInfo(params)
    if (res.code === 200) {
      commit('SEARCHLIST', res.data)
    }
  }
}
// 为了简化数据
// 可以把我们将来在组件中用的数据简化，方便获取数据
const getters = {
  // state形参为当前仓库中的state，不是大仓库的state
  goodsList(state: State) {
    // 如果网络问题，应该返回一个空数组
    return state.searchList.goodsList || []
  },
  trademarkList(state: State) {
    return state.searchList.trademarkList
  },
  attrsList(state: State) {
    return state.searchList.attrsList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}