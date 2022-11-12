<template>
  <div @click="handleToggleFullscreen" id="guide-full">
    <SvgIcon :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"></SvgIcon>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
import SvgIcon from '../SVgIcon'

const isFullScreen = ref(false)

const handleToggleFullscreen = () => {
  screenfull.toggle()
}

const change = () => {
  isFullScreen.value = screenfull.isFullscreen
}

onMounted(() => {
  screenfull.on('change', change)
})

onUnmounted(() => {
  screenfull.off('change', change)
})
</script>
<style lang="scss" scoped>
</style>
