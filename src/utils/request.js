import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isTokenTimeout } from '../utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    config.headers.icode = '1345BCE32356D252'
    if (store.getters.token) {
      if (isTokenTimeout()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('token失效，请重新登录'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }

    config.headers['Accept-Language'] = store.getters.language
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data

    // 判断是否成功
    if (success) {
      return data
    } else {
      // 失败，请求失败了，但是业务失败了
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
