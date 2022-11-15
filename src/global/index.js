import dayjs from 'dayjs'

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

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
