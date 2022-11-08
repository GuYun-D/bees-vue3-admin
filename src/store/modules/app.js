import { TRIGGER_SIDEBAR_OPENED, SET_LANGUAGE } from './types'
import { getItem, setItem } from '../../utils/storage'
import { LANG } from '../../constant'

export default {
  namespaced: true,
  state () {
    return {
      sidebarOpened: true,
      language: getItem(LANG) || 'zh'
    }
  },

  mutations: {
    [TRIGGER_SIDEBAR_OPENED] (state) {
      state.sidebarOpened = !state.sidebarOpened
    },

    [SET_LANGUAGE] (state, lang) {
      setItem(LANG, lang)
      state.language = lang
    }
  }
}
