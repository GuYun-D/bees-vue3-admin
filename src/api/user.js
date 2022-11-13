import request from '../utils/request'

// 获取功能列表
export const getFeatureApi = () => {
  return request({
    url: '/user/feature'
  })
}
