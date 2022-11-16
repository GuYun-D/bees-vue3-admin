import request from '../utils/request'

// 获取所有权限
export const getAllPermissionListApi = () => {
  return request({
    url: '/permission/list'
  })
}
