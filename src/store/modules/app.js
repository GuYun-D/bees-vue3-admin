import { TRIGGER_SIDEBAR_OPENED } from './types'

export default {
  namespaced: true,
  state () {
    return {
      sidebarOpened: true
    }
  },

  mutations: {
    [TRIGGER_SIDEBAR_OPENED] (state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}
