import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import localStorage from 'function/localstorage'

export default {
  namespaced: true,
  state: {
    token: localStorage.getLocalStorage('token')
  },
  getters,
  mutations,
  actions
}