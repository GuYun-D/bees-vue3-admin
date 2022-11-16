import request from '../utils/request'

// 获取权限列表
export const getRolesListApi = () => {
  return request({
    url: '/role/list'
  })
}
