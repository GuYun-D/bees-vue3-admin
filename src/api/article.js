import request from '../utils/request'

// 获取文章列表
export const getAllArticleListApi = data => {
  return request({
    url: '/article/list',
    params: data
  })
}
