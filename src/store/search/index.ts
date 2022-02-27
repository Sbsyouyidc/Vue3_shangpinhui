import { reqGetSearchInfo } from "@/api/index"

interface State {
  searchList: Object
}

const state: State = {
  searchList: {}
}
const mutations = {
  SEARCHLIST(state: State, searchList: Array<any>) {
    state.searchList = searchList
  }
}
const actions = {
  async getSearchList({commit}, params: Object = {}) {
    // params形参：是用户派发action的时候，在第二个参数传递过来的，至少是一个空对象
    let res = await reqGetSearchInfo(params)
    if (res.code === 200) {
      commit('SEARCHLIST', res.data)
    }
  }
}
// 为了简化数据
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}