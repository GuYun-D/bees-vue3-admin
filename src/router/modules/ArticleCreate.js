import layout from '../../layout'

export default {
  path: '/article',
  component: layout,
  name: 'articleCreate',
  redirect: '/article/ranking',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/create',
      component: () => import('@/views/article-create/index.vue'),
      name: 'article-create',
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      component: () => import('@/views/article-create/index.vue'),
      name: 'articleEditor',
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
