import { DEFAULT_COLOR, MAIN_COLOR } from '../../constant'
import { getItem, setItem } from '../../utils/storage'
import { SET_MAIN_COLOR } from './types'
import variables from '../../styles/variables.scss'

export default {
  namespaced: true,
  state () {
    return {
      mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
      variables: variables
    }
  },

  mutations: {
    [SET_MAIN_COLOR] (state, newColor) {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}
