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
        await store.dispatch('user/getUserInfo')
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
