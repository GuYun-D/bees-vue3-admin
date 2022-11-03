import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use((config) => {
  config.headers.icode = '1345BCE32356D252'
  return config
})

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
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
