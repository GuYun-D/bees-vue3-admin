import request from '@/utils/request'

// 获取用户列表
export const getUserMangageListApi = (data) => {
  return request({
    url: '/user-manage/list',
    data
  })
}
