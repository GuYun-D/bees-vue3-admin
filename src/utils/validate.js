/**
 * 判断当前路径是否为外部资源
 * @author GuYun-D
 * @param {String} path 资源路径
 * @returns {Boolean}
 */
export const isExternal = (path) => {
  return /^(https:|mailto:|tel:)/.test(path)
}
