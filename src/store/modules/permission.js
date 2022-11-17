import pubilcRoutes from '../../router/pubilcRoutes'
import { privateRoutes } from '../../router'
import { SET_ROUTES } from './types'

export default {
  namespaced: true,
  state: () => {
    return {
      routes: pubilcRoutes
    }
  },
  mutations: {
    [SET_ROUTES] (state, roles) {
      state.roles = [...pubilcRoutes, ...roles]
    }
  },
  actions: {
    // 根据权限渲染路由
    filterRoutes ({ commit }, menus) {
      const routes = []

      menus.forEach(key => {
        routes.push(...privateRoutes.filter(item => item.name === key))
      })

      /**
       * 因为我们是动态添加的路由，所以404 page 也要 push 进去
       * 所有匹配不到路由规则的全部进入404
       */
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      commit(SET_ROUTES, routes)

      return routes
    }
  }
}
