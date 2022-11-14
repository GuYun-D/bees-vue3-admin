<template>
  <UploadExcel :uploadSuccess="handleUploadExcelSuccess"></UploadExcel>
</template>

<script setup>
import UploadExcel from '../../components/UploadExcel'

// excel 上传成功
const handleUploadExcelSuccess = (data) => {
  console.log(data)
}
</script>

<style lang="scss" scoped>
</style>
