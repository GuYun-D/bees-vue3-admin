import request from '../utils/request'

// 获取文章列表
export const getAllArticleListApi = data => {
  return request({
    url: '/article/list',
    params: data
  })
}

// 列表排序
export const setTableSortApi = (data) => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}
