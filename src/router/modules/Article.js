import layout from '../../layout'

export default {
  path: '/article',
  component: layout,
  name: 'articleRanking',
  redirect: '/article/ranking',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/ranking',
      component: () => import('@/views/article-ranking/index.vue'),
      name: 'ranking',
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/:id',
      component: () => import('@/views/article-detail/index.vue'),
      name: 'articleDetail',
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}
