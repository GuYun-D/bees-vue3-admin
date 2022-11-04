import md5 from 'md5'
import { loginApi, getUserInfoApi } from '@/api/sys'
import { getItem, setItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { SET_TOKEN, SET_USER_INFO } from './types'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state () {
    return {
      token: getItem(TOKEN) || '',
      userInfo: {}
    }
  },

  mutations: {
    [SET_TOKEN] (state, token) {
      state.token = token
      setItem(TOKEN, token)
    },

    [SET_USER_INFO] (state, userInfo) {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    login ({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        loginApi({
          username,
          password: md5(password)
        })
          .then((data) => {
            commit(SET_TOKEN, data.token)
            router.push('/')
            setTimeStamp()
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 获取用户信息
    async getUserInfo ({ commit }) {
      const res = await getUserInfoApi()
      commit(SET_USER_INFO, res)
      return res
    },

    // 退出登录
    logout ({ commit }) {
      commit(SET_TOKEN, '')
      commit(SET_USER_INFO, '')
      removeAllItem()
      // TODO: remove permission info
      router.push('/login')
    }
  }
}
