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
          <Markdown
            :detail="articleDetail"
            :title="title"
            @success="handleCreateSuccess"
          ></Markdown>
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
import { getArticleDetailApi } from '../../api/article'
import { useRoute } from 'vue-router'

const activeName = ref('markdown')
const title = ref('')

const handleCreateSuccess = () => {}

const articleDetail = ref()
const route = useRoute()
const articelId = route.params.id
const getArticleDetail = async () => {
  articleDetail.value = await getArticleDetailApi(articelId)
  title.value = articleDetail.value.title
}

if (articelId) {
  getArticleDetail()
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 30px;
}
</style>
