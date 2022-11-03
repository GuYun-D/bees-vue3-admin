import md5 from 'md5'
import { loginApi } from '@/api/sys'
import { getItem, setItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'

export default {
  namespaced: true,
  state () {
    return {
      token: getItem(TOKEN) || ''
    }
  },

  mutations: {
    setToken (state, token) {
      state.token = token
      setItem(TOKEN, token)
    }
  },

  actions: {
    login ({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        loginApi({
          username,
          password: md5(password)
        })
          .then((data) => {
            commit('setToken', data.token)
            router.push('/')
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
