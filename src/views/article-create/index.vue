<template>
  <div class="article-craete">
    <el-card>
      <el-input
        v-model="title"
        class="title-input"
        maxlength="20"
        clearable
        :placeholder="$t('msg.article.titlePlaceholder')"
      ></el-input>

      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <Markdown :title="title" @success="handleCreateSuccess"></Markdown>
        </el-tab-pane>

        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <Edit></Edit>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Edit from './components/Edit.vue'
import Markdown from './components/Markdown.vue'

const activeName = ref('markdown')
const title = ref('')

const handleCreateSuccess = () => {}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 30px;
}
</style>
