import { ref, watch } from 'vue'
import DynamicData from './DynamicData'
import { watchSwitchLanguage } from '../../../utils/i18n'

// 动态数据
export const dynamicData = ref(DynamicData())

// 被勾选的列数据
export const selectedDynamicLabel = ref([])

watchSwitchLanguage(() => {
  dynamicData.value = DynamicData()
  initSelectedDynamicLabel()
})

// 默认全部的列都是勾选的
const initSelectedDynamicLabel = () => {
  selectedDynamicLabel.value = dynamicData.value.map(item => item.label)
}

initSelectedDynamicLabel()

// table 的列数据
export const tableColumns = ref([])

watch(() => selectedDynamicLabel.value, val => {
  tableColumns.value = []
  const selectData = dynamicData.value.filter(item => {
    return val.includes(item.label)
  })

  tableColumns.value.push(...selectData)
}, {
  immediate: true
})
