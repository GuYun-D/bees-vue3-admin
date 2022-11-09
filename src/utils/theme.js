import rgbHex from 'rgb-hex'
import formual from '../constant/formula.json'
import axios from 'axios'
import color from 'css-color-function'

/**
 * 把生成的演示表写到style中
 * @param {*} newStyle
 */
export const writeNewStyle = (newStyle) => {
  const style = document.createElement('style')
  style.innerText = newStyle
  document.head.appendChild(style)
}

/**
 * 根据主题色生成最新的样式表
 * @description 根据主题色生成新的样式表，获取当前element-plus的默认样式表，并且把需要进行替换的颜色值打上标记，遍历生成的色指标，在默认样式表进行全局替换
 * @param {*} parimaryColor
 */
export const generateNewStyle = async (parimaryColor) => {
  const colors = generateColors(parimaryColor)
  let cssText = await getOriginalStyle()

  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })

  return cssText
}

export const generateColors = (primary) => {
  if (!primary) {
    return
  }

  const colors = {
    primary
  }

  Object.keys(formual).forEach((key) => {
    const value = formual[key].replace(/primary/g, primary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })

  return colors
}

/**
 * 获取当前 element-plus的默认样式表
 */
export const getOriginalStyle = async () => {
  const elementPlusVersion = require('element-plus/package.json').version
  // const url = `https://unpkg.com/element-plus@${elementPlusVersion}/dist/index.css`
  const url = `https://unpkg.com/element-plus@${elementPlusVersion}/lib/theme-chalk/index.css`
  const { data } = await axios.get(url)
  return getStyleTemplate(data)
}

/**
 * 把需要进行替换的色值打上标记
 * @param {*} data
 */
export const getStyleTemplate = (data) => {
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#337ecc': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
