<template>
  <!-- 外部图标 -->
  <div
    v-if="isExternal"
    :style="externalIconStyle"
    class="svg-icon svg-external-icon"
    :class="className"
  ></div>

  <!-- 内部图标 -->

  <svg v-else :class="className" class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { isExternal as external } from '@/utils/validate'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})

// computed 判断当前图标是否是外部图标
const isExternal = computed(() => external(props.icon))

// computed style 外部图标样式
const externalIconStyle = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

// computed 内部图标
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
