<template>
  <el-dialog
    :title="$t('msg.universal.title')"
    :model-value="modleValue"
    width="22%"
    @close="handleDialogClose"
  >
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="myColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <el-button @click="handleDialogClose">{{
        $t('msg.universal.cancel')
      }}</el-button>
      <el-button type="primary" @click="handleDialogConfirm">
        {{ $t('msg.universal.confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '../../../utils/theme'

const store = useStore()

const myColor = ref(store.getters.mainColor)

defineProps({
  modleValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

const handleDialogClose = () => {
  emits('update:modelValue', false)
}

const handleDialogConfirm = async () => {
  const newStyle = await generateNewStyle(myColor.value)
  writeNewStyle(newStyle)
  store.commit('theme/setMainColor', myColor.value)
  handleDialogClose()
}
</script>

<style lang="scss" scoped>
.content {
  text-align: center;

  .title {
    margin-bottom: 12px;
  }
}
</style>
