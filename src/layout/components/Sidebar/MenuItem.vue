<template>
  <!-- element-icon -->
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <!-- other icon -->
  <SvgIcon v-else :icon="icon"></SvgIcon>
  <i></i>

  <span>{{ generateTitle(title) }}</span>
</template>
<script setup>
import { defineProps } from 'vue'
import SvgIcon from '@/components/SVgIcon'
import { generateTitle } from '../../../utils/i18n'

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>
<style lang="scss" scoped></style>
