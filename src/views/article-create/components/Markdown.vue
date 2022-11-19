<template>
  <div class="mardown-container">
    <!-- container -->
    <div id="markdown-box"></div>
    <!-- buttons -->
    <div class="bottom">
      <el-button type="primary" @click="handleSubmit">{{
        $t("msg.article.commit")
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import MarkdownEditor from '@toast-ui/editor'
import { onMounted, defineProps, defineEmits } from 'vue'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import store from '../../../store'
import { watchSwitchLanguage } from '../../../utils/i18n'
import { commitArticle } from './commit'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['success'])

let mkEditor = null
let el = null
const initEditor = () => {
  mkEditor = new MarkdownEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: store.getters.language !== 'en' ? 'zh-CN' : 'en'
  })

  mkEditor.getMarkdown()
}

watchSwitchLanguage(() => {
  if (!el) return
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

const handleSubmit = async () => {
  await commitArticle({
    title: props.title,
    content: mkEditor.getHTML()
  })

  mkEditor.reset()
  emits('success')
}
</script>

<style lang="scss" scoped>
.mardown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
