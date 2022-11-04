import { getItem, setItem } from './storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '../constant'

/**
 *获取时间戳
 * @returns
 */
export const getTimeStamp = () => {
  return getItem(TIME_STAMP)
}

/**
 * 设置token时间戳
 */
export const setTimeStamp = () => {
  setItem(TIME_STAMP, Date.now())
}

export const isTokenTimeout = () => {
  const currentTime = Date.now()
  const localTokenTime = getTimeStamp()
  return currentTime - localTokenTime > TOKEN_TIMEOUT_VALUE
}
