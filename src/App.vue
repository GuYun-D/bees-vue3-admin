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

const store = useStore()

const elementLang = computed(() => {
  return store.getters.language === 'en' ? en : zhCn
})
</script>

<style lang="scss" scoped></style>
