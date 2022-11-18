import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import store from '../store'

/**
 * 时间格式化
 * @param {Number} time
 * @param {String} format
 * @returns
 */
export const dateFilter = (time, format = 'YYYY-MM-DD') => {
  if (!isNaN(time)) {
    time = parseInt(time)
  }

  return dayjs(time).format(format)
}

/**
 * 相对时间
 */
dayjs.extend(rt)
export const relativeTime = time => {
  if (!isNaN(time)) {
    time = parseInt(time)
  }
  // 先加载 rt 方法，才可以使用to
  return dayjs().locale(store.getters.language === 'en' ? 'en' : 'zh-cn'
  ).to(dayjs(time))
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
