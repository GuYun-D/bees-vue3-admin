import { ElMessage } from 'element-plus'
import i18n from '../../../i18n'
import { createArticleApi, editArticleApi } from '../../../api/article'

const t = i18n.global.t

// 提交文章
export const commitArticle = async data => {
  const res = await createArticleApi(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}

// 编辑文章
export const editArticle = async data => {
  const res = await editArticleApi(data)
  ElMessage.success(t('msg.article.editorSuccess'))
  return res
}
