import { createRouter, createWebHashHistory } from 'vue-router'
// import privateRoutes from './privateRoutes'
import pubilcRoutes from './pubilcRoutes'

// 权限路由表
import UserManage from './modules/UserManage'
import RoleList from './modules/RoleList'
import PermissionList from './modules/PermissionList'
import Article from './modules/Article'
import ArticleCreate from './modules/ArticleCreate'

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

export default router
