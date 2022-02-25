import { reqCategoryList } from "@/api"

interface State {
  categoryList: Array<any>
}

const state = {
  categoryList: []
}
const mutations = {
  CATEGORYLIST(state: State, categoryList: Array<any>) {
    state.categoryList = categoryList
  }
}
const actions = {
  // 通过接口函数发送请求，获取数据
  async getCategoryList({commit}) {
    let res = await reqCategoryList()
    // console.log(res)
    if (res.code === 200) {
      commit('CATEGORYLIST', res.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}