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

        <el-table-column :label="$t('msg.role.action')" width="200">
          <el-button type="primary" size="mini">{{
            $t('msg.role.assignPermissions')
          }}</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRolesListApi } from '../../api/role'
import { watchSwitchLanguage } from '../../utils/i18n'

const allRoleList = ref([])
const getRoleList = async () => {
  allRoleList.value = await getRolesListApi()
}

getRoleList()
watchSwitchLanguage(getRoleList)
</script>

<style lang="scss" scoped></style>
