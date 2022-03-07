import { reqCartList } from "@/api"
import {getUUID} from '@/utils/uuid_token'

const state = {

}

const mutations = {

}

const actions = {
  async getCartList({commit}) {
    let res = await reqCartList()
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