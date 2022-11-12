<template>
  <div @click="handleStartGuide">
    <el-tooltip :content="$t('msg.navBar.guide')">
      <div id="guide-start">
        <SvgIcon icon="guide"></SvgIcon>
      </div>
    </el-tooltip>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { useI18n } from 'vue-i18n'
import SvgIcon from '../SVgIcon'
import steps from './step'

const i18n = useI18n()

let driver = null
onMounted(() => {
  driver = new Driver({
    opacity: 0.1,
    animate: false,
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})

const handleStartGuide = () => {
  console.log(steps(i18n))
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>
<style lang="scss" scoped>
</style>
