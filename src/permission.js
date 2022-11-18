import router from './router'
import store from './store'

// 路由白名单
const whiteList = ['/login']

/**
 * 权限判断
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 用户已登录不许进入 login
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        const filterRoutes = await store.dispatch('permission/filterRoutes', permission.menus)
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })

        console.log('丢雷', router)

        // 添加完动态路由之后需要执行一次主动的跳转方可生效
        return next(to.path)
      }
      next()
    }
  } else {
    // 用户已登录，只允许进入login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
