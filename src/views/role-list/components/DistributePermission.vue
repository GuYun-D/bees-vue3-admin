<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      node-key="id"
      :data="allPermission"
      :props="defaultProps"
      show-checkbox
      check-strictly
      default-expand-all
    ></el-tree>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t("msg.universal.cancel") }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t("msg.universal.confirm")
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { getAllPermissionListApi } from '../../../api/permission'
import { watchSwitchLanguage } from '../../../utils/i18n'
import {
  getUserPermissionApi,
  updateRolePermissionApi
} from '../../../api/role'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

// 点击确定
const i18n = useI18n()
const onConfirm = async () => {
  await updateRolePermissionApi({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  getUserRoles()
  closed()
}

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}

// 获取所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await getAllPermissionListApi()
}

// 获取用户的权限
getPermissionList()
watchSwitchLanguage(getPermissionList)

// el-tree config
const treeRef = ref(null)
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// 当前用户的权限
const getUserRoles = async () => {
  const checkedKeys = await getUserPermissionApi(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}

watch(
  () => props.roleId,
  (val) => {
    if (val) getUserRoles()
  }
)
</script>

<style lang="scss" scoped></style>
