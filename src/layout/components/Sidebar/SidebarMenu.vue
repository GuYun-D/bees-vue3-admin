<template>
  <el-menu
    :unique-opened="true"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
  >
    <el-submenu index="1">
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
    </el-menu-item>
  </el-menu>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>
