import request from '../utils/request'

// 获取权限列表
export const getRolesListApi = () => {
  return request({
    url: '/role/list'
  })
}

// 获取当前角色的权限
export const getUserPermissionApi = (roleId) => {
  return request({
    url: `/role/permission/${roleId}`
  })
}
