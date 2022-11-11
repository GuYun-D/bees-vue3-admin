<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '../../utils/i18n'
import { isTags } from '../../utils/tags'

const route = useRoute()
const store = useStore()

/**
 * 生成title
 */
const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }

  return title
}

watch(
  () => route,
  (to) => {
    if (!isTags(to.path)) return
    const { fullPath, meta, name, path, query, params } = to
    store.commit('app/addTagsViewList', {
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to),
      fullPath
    })
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
