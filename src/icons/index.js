/**
 * 全局注册所搜的svg图标
 */
import SvgIcon from '../components/SVgIcon'

const svgRequire = require.context('./svg', false, /\.svg/)
svgRequire.keys().forEach((icon) => svgRequire(icon))

export default (app) => {
  app.component('svg-icon', SvgIcon)
}
