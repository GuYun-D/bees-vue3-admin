<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <span class="sub-titel">{{ $t("msg.article.dynamicTitle") }}</span>
      <el-checkbox-group v-model="selectedDynamicLabel">
        <el-checkbox
          v-for="(item, index) in dynamicData"
          :label="item.label"
          :key="index"
          >{{ item.label }}</el-checkbox
        >
      </el-checkbox-group>
    </el-card>

    <el-card>
      <el-table :data="tableData" ref="tableRef" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :label="item.label"
          :prop="item.prop"
          :key="index"
        >
          <template v-if="item.prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>

          <template v-else-if="item.prop === 'action'" #default="{ row }">
            <el-button type="primary" size="mini" @click="handleShow(row)">{{
              $t("msg.article.show")
            }}</el-button>

            <el-button type="danger" size="mini" @click="handleDeleta(row)">{{
              $t("msg.article.remove")
            }}</el-button>
          </template>
        </el-table-column>

        <!-- <el-table-column
          :label="$t('msg.article.title')"
          prop="title"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.article.author')"
          prop="author"
        ></el-table-column>

        <el-table-column :label="$t('msg.article.publicDate')">
          <template #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('msg.article.desc')"
          prop="desc"
        ></el-table-column>

        <el-table-column :label="$t('msg.article.action')">
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="handleShow(row)">{{
              $t("msg.article.show")
            }}</el-button>

            <el-button type="danger" size="mini" @click="handleDeleta(row)">{{
              $t("msg.article.remove")
            }}</el-button>
          </template>
        </el-table-column> -->
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[5, 10, 20, 30]"
        :total="total"
        layout="total, sizes, prev, next, pager ,jumper "
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { onActivated, ref, onMounted } from 'vue'
import { getAllArticleListApi } from '../../api/article'
import { watchSwitchLanguage } from '../../utils/i18n'
import { dynamicData, selectedDynamicLabel, tableColumns } from './dynamic'
import { tableRef, initSortable } from './sortable'

// data
const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)

onMounted(() => {
  initSortable(tableData, getData)
})

const getData = async () => {
  const result = await getAllArticleListApi({
    page: page.value,
    size: size.value
  })

  tableData.value = result.list
  total.value = result.total
}

getData()
watchSwitchLanguage(getData)
onActivated(getData)

const handleShow = (row) => {}

const handleDeleta = (row) => {}

const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getData()
}

const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getData()
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  text-align: right;
}

.header {
  .sub-titel {
    margin-right: 30px;
  }

  ::v-deep .el-card__body {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}

::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff;
  background-color: #67c23a;
}
</style>
