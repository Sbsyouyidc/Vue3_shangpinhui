import { reqGetCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from "@/api"
import { State, Info } from "./types"
import { setToken, getToken, removeToken } from "@/utils/token"

const state: State = {
  code: '',
  token: getToken() || '',
  userInfo: {}
}

const mutations = {
  CODE(state: State, code: string) {
    state.code = code
  },
  USERLOGIN(state: State, token: string) {
    state.token = token
  },
  USERINFO(state: State, userInfo: Info) {
    state.userInfo = userInfo
  },
  CLEAR(state: State) {
    state.token = ''
    state.userInfo = {}
    removeToken()
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
  }, 
  // 登录
  async login({commit}, {phone, password}) {
    let res = await reqLogin(phone, password) 
    // 服务器下发的token，是唯一标识符, 经常通过带token来找服务器要信息
    if (res.code === 200) {
      commit('USERLOGIN', res.data.token)
      setToken(res.data.token)
    } else {
      return res.message
    }
  },
  // 用户信息
  async getUserInfo({commit}) {
    let res = await reqUserInfo()
    if (res.code === 200) {
      commit('USERINFO', res.data)
      return 'ok'
    } else {
      return res.message
    }
  },
  // 退出登录
  async logout({commit}) {
    let res = await reqLogout()
    if (res.code === 200) {
      commit('CLEAR')
    } else {
      return res.message
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