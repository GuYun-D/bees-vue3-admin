import i18n from '../i18n'
import { watch } from 'vue'
import store from '../store'

export const generateTitle = (title) => {
  return i18n.global.t('msg.route.' + title)
}

/**
 * 监听语言的切换
 */
export const watchSwitchLanguage = (...cbs) => {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}
