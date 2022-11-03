import request from '@/utils/request'

// 登录
export const loginApi = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
