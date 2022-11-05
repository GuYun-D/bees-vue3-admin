const path = require('path')

export const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

/**
 * 获取所有的子路由
 * @param {*} routes
 * @returns
 */
export const getChildrenRoutes = (routes) => {
  const result = []

  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })

  return result
}

/**
 * 处理脱离层级的路由
 * @param {*} routes
 */
export const filterRoutes = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 根据routes 数据，返回对应 el-menu 所需要的数据
 */
export const generateMenus = (routes, basepath = '') => {
  const result = []
  routes.forEach((item) => {
    // 不存在 children 并且不存在 meta
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在 children， 不存在meta， 迭代  generateMenus
    if (!isNull(item.meta) && isNull(item.children)) {
      result.push(...generateMenus(item.children))
    }

    /**
     * 不存在 children，但是存在 meta 或者
     * 存在children并且存在meta
     */
    const routePath = path.resolve(basepath, item.path)

    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
    }

    // title和icon同时存在
    if (isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })

  return result
}
