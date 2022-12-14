<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button
          v-permission="['importUser']"
          @click="handleImportExcel"
          type="primary"
          >{{ $t("msg.excel.importExcel") }}</el-button
        >
        <el-button @click="handleExportExcel" type="success">{{
          $t("msg.excel.exportExcel")
        }}</el-button>
      </div>
    </el-card>

    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- index -->
        <el-table-column label="#" type="index"></el-table-column>

        <!-- name -->
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>

        <!-- mobile -->
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>

        <!-- avatar -->
        <el-table-column align="center" :label="$t('msg.excel.avatar')">
          <template v-slot="{ row }">
            <el-image
              :preview-src-list="[row.avatar]"
              class="avatar"
              :src="row.avatar"
            ></el-image>
          </template>
        </el-table-column>

        <!-- role -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{
                item.title
              }}</el-tag>
            </div>

            <div v-else>
              <el-tag size="mini">{{ $t("msg.excel.defaultRole") }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <!-- time -->
        <el-table-column prop="openTime" :label="$t('msg.excel.openTime')">
          <template v-slot="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>

        <!-- op -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="220"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              @click="handleShowUserInfo(row._id)"
              size="mini"
            >
              {{ $t("msg.excel.show") }}
            </el-button>

            <el-button
              type="info"
              v-permission="['distributeRole']"
              size="mini"
            >
              {{ $t("msg.excel.showRole") }}
            </el-button>

            <el-button
              v-permission="['removeUser']"
              type="danger"
              @click="handleDeleteUser(row)"
              size="mini"
            >
              {{ $t("msg.excel.remove") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :total="total"
        :page-sizes="[2, 5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </el-card>

    <!-- excel import -->
    <Export2Excel v-model="exportToExcelVisible"></Export2Excel>
  </div>
</template>

<script setup>
import { onActivated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserMangageListApi, deleteUserApi } from '../../api/user-manage'
import { watchSwitchLanguage } from '../../utils/i18n'
import { useI18n } from 'vue-i18n'
import Export2Excel from './components/Export2Excel.vue'

const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

const getData = async () => {
  const result = await getUserMangageListApi({
    page: page.value,
    size: size.value
  })

  tableData.value = result.list
  total.value = result.total
}

getData()
watchSwitchLanguage(getData)

// ??????????????????????????????????????????
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getData()
}

// ????????????????????????
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getData()
}

// ????????????excel
const router = useRouter()
const handleImportExcel = () => {
  router.push('/user/import')
}

const i18n = useI18n()

// ??????????????????
const handleShowUserInfo = (id) => {
  router.push(`/user/info/${id}`)
}

// ????????????
const handleDeleteUser = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUserApi(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    getData()
  })
}

onActivated(() => {
  getData()
})

/**
 * excel import
 */
const exportToExcelVisible = ref(false)
const handleExportExcel = () => {
  exportToExcelVisible.value = true
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
