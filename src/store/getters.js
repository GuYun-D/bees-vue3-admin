import variables from '../styles/variables.scss'

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
  cssVar: (state) => variables,

  /**
   * menu 展开
   */
  sidebarOpened: (state) => state.app.sidebarOpened
}
