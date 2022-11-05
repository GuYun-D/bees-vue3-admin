<template>
  <el-submenu
    v-if="route.children && route.children.length > 0"
    :index="route.path"
  >
    <template #title>
      <MenuItem :title="route.meta.title" :icon="route.meta.icon"> </MenuItem>
    </template>

    <SidebarItem
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></SidebarItem>
  </el-submenu>
  <el-menu-item v-else :index="route.path">
    <MenuItem :title="route.meta.title" :icon="route.meta.icon"> </MenuItem>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'
import MenuItem from './MenuItem.vue'
import SidebarItem from './SidebarItem'

const props = defineProps({
  route: {
    type: Array,
    required: true
  }
})

setTimeout(() => {
  console.log('草泥吗', props.route)
}, 1000)
</script>

<style lang="scss" scoped>
</style>
