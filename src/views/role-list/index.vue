<template>
  <div>
    <el-card>
      <el-table border style="width: 100%" :data="allRoleList">
        <el-table-column
          type="index"
          width="120"
          :label="$t('msg.role.index')"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.role.action')"
          #default="{ row }"
          width="200"
        >
          <el-button
            @click="handleOpenPermissionDialog(row)"
            type="primary"
            size="mini"
            >{{ $t("msg.role.assignPermissions") }}</el-button
          >
        </el-table-column>
      </el-table>
    </el-card>

    <DistributePermission
      :roleId="selectRoleId"
      v-model="visible"
    ></DistributePermission>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRolesListApi } from '../../api/role'
import { watchSwitchLanguage } from '../../utils/i18n'
import DistributePermission from './components/DistributePermission.vue'

const allRoleList = ref([])
const getRoleList = async () => {
  allRoleList.value = await getRolesListApi()
}

getRoleList()
watchSwitchLanguage(getRoleList)

const visible = ref(false)
const selectRoleId = ref('')
const handleOpenPermissionDialog = (row) => {
  visible.value = true
  selectRoleId.value = row.id
}
</script>

<style lang="scss" scoped></style>
