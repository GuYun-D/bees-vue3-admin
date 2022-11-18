import Sortable from 'sortablejs'
import { ref } from 'vue'
export const tableRef = ref(null)

export const initSortable = () => {
  const el = tableRef.value.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]

  /**
   * @params 要拖拽的元素
   * @params 配置 obj
   */
  Sortable.create(el, {
    // 拖拽时的class
    ghostClass: 'sortable-ghost',
    // 拖拽结束的cb
    onEnd: () => {}
  })
}
