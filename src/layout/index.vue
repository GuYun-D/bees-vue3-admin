<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 侧边栏 -->
    <SideBar
      :style="{
        background: vars.menuBg,
      }"
      class="sidebar-container"
    ></SideBar>
    <div class="main-container">
      <!-- 顶部导航 -->
      <div class="fixed-header">
        <NavBar></NavBar>
      </div>
      <!-- 主要内容区 -->
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import SideBar from './components/Sidebar'
import AppMain from './components/AppMain'
import vars from '../styles/variables.scss'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width $sidebarDuration;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSidebarWidth});
}
</style>
