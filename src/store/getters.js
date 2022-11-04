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
  userInfo: (state) => state.user.userInfo
}
