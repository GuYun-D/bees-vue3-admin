import {
  TRIGGER_SIDEBAR_OPENED,
  SET_LANGUAGE,
  ADD_TAGS_VIEW_LIST,
  CHANGE_TAGS_VIEW
} from './types'
import { getItem, setItem } from '../../utils/storage'
import { LANG, TAGS_VIEW } from '../../constant'

export default {
  namespaced: true,
  state () {
    return {
      sidebarOpened: true,
      language: getItem(LANG) || 'zh',
      tagsViewList: getItem(TAGS_VIEW) || []
    }
  },

  mutations: {
    [TRIGGER_SIDEBAR_OPENED] (state) {
      state.sidebarOpened = !state.sidebarOpened
    },

    [SET_LANGUAGE] (state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    [ADD_TAGS_VIEW_LIST] (state, tag) {
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })

      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    // tagsView 国际化
    [CHANGE_TAGS_VIEW] (state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
