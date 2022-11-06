<template>
  <el-menu
    :default-active="activeMenu"
    :unique-opened="true"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    router
  >
    <!-- <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>海贼王</span>
      </template>

      <el-menu-item index="1-1">路飞</el-menu-item>
      <el-menu-item index="1-2">索隆</el-menu-item>
      <el-menu-item index="1-3">娜美</el-menu-item>
    </el-submenu>

    <el-menu-item index="2">
      <i class="el-icon-location"></i>
      <template #title> 火影</template>
    </el-menu-item> -->
    <SidebarItem
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></SidebarItem>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '../../../utils/route'
import SidebarItem from './SidebarItem'

const router = useRouter()

const routes = computed(() => {
  const filterRoute = filterRoutes(router.getRoutes())
  return generateMenus(filterRoute)
})

// 默认激活项
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped>
</style>
