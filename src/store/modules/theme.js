import { DEFAULT_COLOR, MAIN_COLOR } from '../../constant'
import { getItem, setItem } from '../../utils/storage'
import { SET_MAIN_COLOR } from './types'

export default {
  namespaced: true,
  state () {
    return {
      mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
    }
  },

  mutations: {
    [SET_MAIN_COLOR] (state, newColor) {
      state.mainColor = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}
