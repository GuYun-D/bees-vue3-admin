import { createI18n } from 'vue-i18n'
import zhCnLoacle from './lang/zh'
import enLocale from './lang/en'
import store from '../store'

const messages = {
  zh: {
    msg: {
      ...zhCnLoacle
    }
  },

  en: {
    msg: {
      ...enLocale
    }
  }
}

const getLanguage = () => {
  return store && store.getters && store.getters.language
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
