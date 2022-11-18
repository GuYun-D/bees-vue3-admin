import store from '../store'

const checkedPermission = (el, binding) => {
  const { value } = binding
  const points = store.getters.userInfo.permission.points
  if (value && value instanceof Array) {
    const hasPermission = points.some(point => {
      return value.includes(point)
    })

    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is a [array]')
  }
}

export default {
  mounted (el, binding) {
    checkedPermission(el, binding)
  },

  // 组件 VNode 及其子组件的 VNode 更新之后调用
  updated (el, binding) {
    checkedPermission(el, binding)
  }
}
