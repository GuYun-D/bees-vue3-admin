<template>
  <div>
    <el-card>
      <el-table
        :data="allPermissionList"
        style="width: 100%"
        border
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
          width="180"
        ></el-table-column>

        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
          width="180"
        ></el-table-column>

        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
          width="180"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAllPermissionListApi } from '../../api/permission'
import { watchSwitchLanguage } from '../../utils/i18n'

const allPermissionList = ref([])

const getPermissionList = async () => {
  allPermissionList.value = await getAllPermissionListApi()
}

getPermissionList()
watchSwitchLanguage(getPermissionList)
</script>

<style lang="scss" scoped></style>
