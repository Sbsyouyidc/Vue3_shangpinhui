import { reqGetCode, reqRegister } from "@/api"
import { State } from "./types"

const state: State = {
  code: ''
}

const mutations = {
  CODE(state: State, code: string) {
    state.code = code
  }
}
// 获取验证码
const actions = {
  async getCode({commit}, phone: string) {
    let res = await reqGetCode(phone)
    if (res.code === 200) {
      commit('CODE', res.data)
    } else {
      return Promise.reject(new Error('fail to get code'))
    }
  },
  // 注册
  async register({commit}, {phone, code, password}) {
    let res = await reqRegister(phone, code, password)
    console.log(res)
    if (res.code === 200) {
      console.log(res.data)
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