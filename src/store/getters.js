import { getItem } from '../utils/storage'
import { generateColors } from '../utils/theme'
import { MAIN_COLOR } from '../constant'

export default {
  token: (state) => state.user.token,

  /**
   * 是否含有用户信息
   * @param {*} state
   * @returns {Boolean}
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state) => state.user.userInfo,
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR))
  }),

  /**
   * menu 展开
   */
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor
}
