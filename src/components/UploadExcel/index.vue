<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      accept=".xlsx, .xls"
      type="file"
      ref="excelUploadInputRef"
      class="excel-upload-input"
      @change="handleChange"
    />

    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragenter"
    >
      <i class="el-icon-upload"></i>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow } from './utile'

const props = defineProps({
  beforeUpload: Function,
  uploadSuccess: Function
})

const excelUploadInputRef = ref(null)

const loading = ref(false)
// 点击选择文件
const handleUpload = () => {
  excelUploadInputRef.value.click()
}

// 选中文件之后
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  console.log(rawFile)
  if (!rawFile) return
  upload(rawFile)
}

// 触发上传
const upload = (rawFile) => {
  // 置空已选择的
  excelUploadInputRef.value.value = null
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

// 读取 excel 数据 异步的
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    /**
     * 这个api平时还没用到过 😅 看了好久api
     */
    reader.onload = (e) => {
      // 获取到解析后的数据
      const data = e.target.result
      // 利用XLSX对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 获取第一张表格(sheet1)名称
      const firstShetName = workbook.SheetNames[0]
      // 读取第一张表格的数据
      const worksheet = workbook.Sheets[firstShetName]
      // 解析数据表头
      console.log(worksheet)
      const header = getHeaderRow(worksheet)
      // 解析数据体
      const body = XLSX.utils.sheet_to_json(worksheet)
      // 传入解析之后的数据
      generateData({ header, body })
      // 处理loading，执行成功的回调
      loading.value = false
      resolve()
    }

    reader.readAsArrayBuffer(rawFile)
  })
}

// 根据导入内容生成数据
const generateData = (excelData) => {
  props.uploadSuccess && props.uploadSuccess(excelData)
}

const handleDrop = () => {}
const handleDragover = () => {}
const handleDragenter = () => {}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
