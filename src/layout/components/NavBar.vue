<template>
  <div class="navbar">
    <!-- menu collapse -->
    <Hamburger class="hamburger-container"></Hamburger>

    <Breadcrumb id="guide-breadcrumb" class="breadcrumb-container"></Breadcrumb>

    <!-- 右侧导航栏 -->
    <div class="right-menu">
      <!-- guide -->
      <Guide class="right-menu-item hover-effect"></Guide>
      <!-- search -->
      <HeaderSearch class="right-menu-item hover-effect"></HeaderSearch>
      <!-- theme -->
      <ThemeSelect class="right-menu-item hover-effect"></ThemeSelect>
      <!-- language -->
      <LangSelect class="right-menu-item hover-effect"></LangSelect>
      <!-- full screen -->
      <Screenfull class="right-menu-item hover-effect"></Screenfull>

      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
        </div>

        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{
                $t('msg.navBar.home')
              }}</el-dropdown-item></router-link
            >
            <a href="">
              <el-dropdown-item>{{ $t('msg.navBar.doc') }} </el-dropdown-item>
            </a>
            <el-dropdown-item @click="handleLogout"
              >{{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '../../components/Hamburger'
import Breadcrumb from '../../components/Breadcrumb'
import LangSelect from '../../components/LangSelect'
import ThemeSelect from '../../components/ThemeSelect'
import Screenfull from '../../components/Screenfull'
import HeaderSearch from '../../components/HeaderSearch'
import Guide from '../../components/Guide'

const store = useStore()
const handleLogout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .avatar-container {
      cursor: pointer;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
  }
}
</style>
