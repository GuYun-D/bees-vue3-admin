<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <!-- icon -->
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <SvgIcon icon="change-theme"></SvgIcon>
      </el-tooltip>
    </div>

    <!-- menu -->
    <template #dropdown>
      <el-dropdown-item command="color">
        {{ $t('msg.theme.themeColorChange') }}
      </el-dropdown-item>
    </template>
  </el-dropdown>

  <!-- popup -->
  <div>
    <SelectColor v-model="selectColorVisiable"></SelectColor>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import SvgIcon from '../SVgIcon'
import SelectColor from './components/SelectColor.vue'

const selectColorVisiable = ref(false)

const handleSetTheme = () => {
  selectColorVisiable.value = true
}
</script>

<style lang="scss" scoped>
</style>
