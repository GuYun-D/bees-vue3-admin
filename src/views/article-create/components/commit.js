import { ElMessage } from 'element-plus'
import i18n from '../../../i18n'
import { createArticleApi } from '../../../api/article'

const t = i18n.global.t

export const commitArticle = async data => {
  const res = await createArticleApi(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}
