import { createRouter, createWebHashHistory } from 'vue-router'
import privateRoutes from './privateRoutes'
import pubilcRoutes from './pubilcRoutes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...privateRoutes, ...pubilcRoutes]
})

export default router
