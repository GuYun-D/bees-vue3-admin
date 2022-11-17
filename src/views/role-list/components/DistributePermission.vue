  <template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    内容

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { getUserPermissionApi } from '../../../api/role'
import { watchSwitchLanguage } from '../../../utils/i18n'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

// 点击确定
const onConfirm = async () => {
  closed()
}

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}

// 获取权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await getUserPermissionApi()
}

getPermissionList()

watchSwitchLanguage(getPermissionList)
</script>

<style lang="scss" scoped></style>
