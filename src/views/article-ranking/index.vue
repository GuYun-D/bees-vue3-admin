<template>
  <div class="article-ranking-container">
    <el-card>
      <el-table :data="tableData" ref="tableRef" border>
        <el-table-column
          :label="$t('msg.article.ranking')"
          prop="ranking"
        ></el-table-column>

        <el-table-column
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
        </el-table-column>
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
import { onActivated, ref } from 'vue'
import { getAllArticleListApi } from '../../api/article'
import { watchSwitchLanguage } from '../../utils/i18n'

// data
const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)

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
</style>
