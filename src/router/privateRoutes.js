import layout from '../layout/index.vue'

/**
 * 需要权限的路由
 */
export default [
  {
    path: '/user',
    component: layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        name: 'user-manage',
        component: () => import('../views/user-mange/index.vue'),
        meta: {
          title: 'user-manage',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        name: 'role-list',
        component: () => import('../views/role-list/index.vue'),
        meta: {
          title: 'role-list',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        name: 'permission-list',
        component: () => import('../views/permission-list/index.vue'),
        meta: {
          title: 'permission-list',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'user-info',
        component: () => import('../views/user-info/index.vue'),
        meta: {
          title: 'user-info'
        }
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('../views/import/index.vue'),
        meta: {
          title: 'excel-import'
        }
      }
    ]
  },

  {
    path: '/article',
    component: layout,
    name: 'article',
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('../views/article-ranking/index.vue'),
        name: 'ranking',
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id',
        component: () => import('../views/article-detail/index.vue'),
        name: 'article-detail',
        meta: {
          title: 'article-detail'
        }
      },
      {
        path: '/article/create',
        component: () => import('../views/article-create/index.vue'),
        name: 'article-create',
        meta: {
          title: 'article-create',
          icon: 'article-create'
        }
      },
      {
        path: '/article/editor/:id',
        component: () => import('../views/article-create/index.vue'),
        name: 'article-editor',
        meta: {
          title: 'article-editor'
        }
      }
    ]
  }
]
