import Sortable from 'sortablejs'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { setTableSortApi } from '../../../api/article'
import i18n from '../../../i18n'

export const tableRef = ref(null)

export const initSortable = (tableData, cb) => {
  const el = tableRef.value.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]

  /**
   * @params 要拖拽的元素
   * @params 配置 obj
   */
  Sortable.create(el, {
    // 拖拽时的class
    ghostClass: 'sortable-ghost',
    // 拖拽结束的cb
    onEnd: async (e) => {
      const { newIndex, oldIndex } = e
      await setTableSortApi({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })

      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))
      /**
       * 置空table，不然无法重新渲染
       */
      tableData.value = []
      cb && typeof cb === 'function' && cb()
    }
  })
}
