<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="exportExcelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button :loading="loading" @click="handleConfirm" type="primary">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLanguage } from '../../../utils/i18n'
import { getUserMangeAllListApi } from '../../../api/user-manage'
import { USER_RELATIOS } from './Export2ExcelConstants'
import { dateFilter } from '../../../global'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const loading = ref(false)
const i18n = useI18n()
let defaultExportExcelName = i18n.t('msg.excel.defaultName')
const exportExcelName = ref(defaultExportExcelName)

watchSwitchLanguage(() => {
  defaultExportExcelName = i18n.t('msg.excel.defaultName')
  exportExcelName.value = defaultExportExcelName
})

const emits = defineEmits(['update:modelValue'])

const closed = () => {
  emits('update:modelValue', false)
}

const handleConfirm = async () => {
  loading.value = true
  const allUser = (await getUserMangeAllListApi()).list
  const excelExporter = await import('../../../utils/Export2Excel')
  const data = formatJSON(USER_RELATIOS, allUser)
  excelExporter.export_json_to_excel({
    // 表头
    header: Object.keys(USER_RELATIOS),
    // excel数据
    data,
    // 文件名称
    filename: exportExcelName.value || defaultExportExcelName
  })
  closed()
}

const formatJSON = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      // 时间处理
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>
