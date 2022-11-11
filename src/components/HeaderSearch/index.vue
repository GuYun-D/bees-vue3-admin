<template>
  <div
    class="header-search"
    :class="{
      show: isShow,
    }"
  >
    <SvgIcon
      class-name="search-icon"
      icon="search"
      @click="handleShowClick"
    ></SvgIcon>
    {{ searchPool }}

    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      :filter-method="querySearch"
      filterable
      remote
      default-first-option
      placeholder="search"
      @change="handleSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join('->')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '../SVgIcon'
import { filterRoutes } from '../../utils/route'
import Fuse from 'fuse.js'
import { generateRoutes } from './fuseData'

const search = ref('')
const isShow = ref(false)

const router = useRouter()

// 搜索数据源
const searchPool = computed(() => {
  const filterRouters = filterRoutes(router.getRoutes())
  return generateRoutes(filterRouters)
})

// 搜索实现
const fuse = new Fuse(searchPool.value, {
  shouldSort: true, // 按照优先级进行搜索
  minMatchCharLength: 1, // 匹配超过几个字符算搜索到了
  keys: [
    {
      name: 'title', // 搜索的键
      weight: 0.7 // 权重
    },
    {
      name: 'path',
      weight: 0.3
    }
  ]
})

const handleShowClick = () => {
  isShow.value = !isShow.value
}

const searchOptions = ref('')
const querySearch = (query) => {
  searchOptions.value = query ? fuse.search(query) : []
}

// 点击了搜索的选项
const handleSelectChange = (item) => {
  router.push(item.path)
}

/**
 * 当点击了搜索框其他的地方时，应该隐藏输入框
 */
const headerSearchSelectRef = ref()

const handleClose = () => {
  console.log('点击了')
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

watch(
  () => isShow.value,
  (val) => {
    console.log('草泥吗', val)
    if (val) {
      headerSearchSelectRef.value.focus()
      document.body.addEventListener('click', handleClose)
    } else {
      document.body.removeEventListener('click', handleClose)
    }
  }
)
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
