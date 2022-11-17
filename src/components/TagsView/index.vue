<template>
  <div class="tags-view-container">
    <router-link
      @contextmenu.prevent="handleOpenMenu($event, index)"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :style="{
        backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
      }"
      v-for="(tag, index) in $store.getters.tagsViewList"
      :key="tag.fullPath"
      :to="{ path: tag.fullPath }"
    >
      {{ tag.title }}
      <div class="close-wrapper" @click.prevent.stop="handleClosePage(index)">
        <svg-icon v-show="!isActive(tag)" icon="close"></svg-icon>
      </div>
    </router-link>

    <ContaxtMenu
      :index="selectIndex"
      :style="menuStyle"
      v-show="visiable"
    ></ContaxtMenu>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ContaxtMenu from './ContextMenu.vue'

const route = useRoute()

/**
 * 是否被选中
 */
const isActive = (tag) => {
  return tag.path === route.path
}

// 关闭tag
const store = useStore()
const handleClosePage = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: selectIndex.value
  })
}

/**
 * 右键菜单
 */
const visiable = ref(false)
const selectIndex = ref(0)
const menuStyle = ref({
  left: 0,
  top: 0
})
const handleOpenMenu = (e, index) => {
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  selectIndex.value = index

  visiable.value = true
}

// menu 的关闭
const closeMenus = () => {
  visiable.value = false
}

watch(
  () => visiable.value,
  (val) => {
    if (val) {
      document.body.addEventListener('click', closeMenus)
    } else {
      document.body.removeEventListener('click', closeMenus)
    }
  }
)
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  /* .tags-view-wrapper { */
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    transition: all 200ms;

    .close-wrapper {
      display: inline-block;
    }

    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
  /* } */
}
</style>
