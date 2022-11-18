import { createRouter, createWebHashHistory } from 'vue-router'
// import privateRoutes from './privateRoutes'
import pubilcRoutes from './pubilcRoutes'

// 权限路由表
import UserManage from './modules/UserManage'
import RoleList from './modules/RoleList'
import PermissionList from './modules/PermissionList'
import Article from './modules/Article'
import ArticleCreate from './modules/ArticleCreate'
import store from '../store'

export const privateRoutes = [
  UserManage,
  RoleList,
  PermissionList,
  Article,
  ArticleCreate
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...pubilcRoutes]
})

/* 重置路由表 */
export const resetRouter = () => {
  if (store.getters.userInfo && store.getters.userInfo.permission && store.getters.userInfo.permission.menus) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach(menu => {
      router.removeRoute(menu)
    })
  }
}

export default router
