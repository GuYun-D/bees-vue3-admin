<template>
  <ElConfigProvider :locale="elementLang">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ElConfigProvider } from 'element-plus'
import { watchSwitchLanguage } from './utils/i18n'

import { generateNewStyle, writeNewStyle } from './utils/theme'
const store = useStore()
generateNewStyle(store.getters.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})

const elementLang = computed(() => {
  return store.getters.language === 'en' ? en : zhCn
})

watchSwitchLanguage(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style lang="scss" scoped></style>
