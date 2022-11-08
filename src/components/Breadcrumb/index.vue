<template>
  <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumData"
        :key="item.path"
      >
        <!-- 不可点击 -->
        <span class="no-redirect" v-if="index === breadcrumData.length - 1">{{
          generateTitle(item.meta.title)
        }}</span>

        <!-- 可点击 -->
        <span class="redirect" v-else @click="handleLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '../../utils/i18n'

const route = useRoute()

const breadcrumData = ref([])
const getBreadcrumData = () => {
  // console.log(route.matched)  当前路由的标准化路有记录
  breadcrumData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}

watch(
  () => route,
  () => {
    getBreadcrumData()
  },
  {
    deep: true,
    immediate: true
  }
)

// 点击跳转
const router = useRouter()
const handleLinkClick = (item) => {
  console.log('操了', item)
  router.push(item.path)
}

// get cssColorVar
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8upx;

  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
    transition: color 280ms;

    &:hover {
      color: v-bind(linkHoverColor);
    }
  }

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
