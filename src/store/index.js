import { createStore } from 'vuex'
import user from './modules/user'
import getters from './getters'
import app from './modules/app'
import theme from './modules/theme'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  getters,
  modules: {
    user,
    app,
    theme
  }
})
