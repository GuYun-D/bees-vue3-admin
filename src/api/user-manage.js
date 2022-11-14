import request from '@/utils/request'

// 获取用户列表
export const getUserMangageListApi = (data) => {
  console.log("怎么会是为", data);
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
