import request from '@/utils/request'

// 获取用户列表
export const getUserMangageListApi = (data) => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}

// 批量上传
export const userBatchImportApi = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

// 删除用户
export const deleteUserApi = (id) => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}
