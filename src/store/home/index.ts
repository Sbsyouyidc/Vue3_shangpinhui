import { reqCategoryList, reqFloorList, reqGetBannerList } from "@/api"

interface State {
  categoryList: Array<any>,
  bannerList: Array<any>,
  floorList: Array<any>
}

const state: State = {
  categoryList: [],
  bannerList: [],
  floorList: []
}
// mutation是唯一修改state的地方
const mutations = {
  CATEGORYLIST(state: State, categoryList: Array<any>) {
    state.categoryList = categoryList
  },
  BANNERLIST(state: State, bannerList: Array<any>) {
    state.bannerList = bannerList
  },
  FLOORLIST(state: State,floorList: Array<any>) {
    state.floorList = floorList
  }
}
// action 是用户派发action的地方，可以写异步逻辑
const actions = {
  // 通过接口函数发送请求，获取数据
  async getCategoryList({commit}) {
    let res = await reqCategoryList()
    if (res.code === 200) {
      // 提交mutation
      commit('CATEGORYLIST', res.data)
    }
  },
  async getBannerList({commit}) {
    const res = await reqGetBannerList()
    if (res.code === 200) {
      commit('BANNERLIST', res.data)
    }
  },
  async getFloorList({commit}) {
    const res = await reqFloorList()
    if (res.code === 200) {
      commit('FLOORLIST', res.data)
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