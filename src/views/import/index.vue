<template>
  <UploadExcel :uploadSuccess="handleUploadExcelSuccess"></UploadExcel>
</template>

<script setup>
import UploadExcel from '../../components/UploadExcel'
import { formatDate, USER_EN } from './utiles'
import { userBatchImportApi } from '../../api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

// excel 上传成功
const handleUploadExcelSuccess = async ({ body }) => {
  const uploadData = generateData(body)
  await userBatchImportApi(uploadData)
  ElMessage.success(body.length + i18n.t('msg.excel.importSuccess'))
}

// 数据转换
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      if (USER_EN[key] === 'openTime') {
        userInfo[USER_EN[key]] = formatDate(item.key) // 处理 XLSX 导入时间错误的bug
        return
      }
      userInfo[USER_EN[key]] = item[key]
    })

    arr.push(userInfo)
  })

  return arr
}
</script>

<style lang="scss" scoped>
</style>
