<template>
  <div class="article-detail-container">
    <!-- title -->
    <h2 class="title">{{ detail.title }}</h2>
    <!-- header -->
    <div class="header">
      <span class="author"
        >{{ $t("msg.article.author") }}: {{ detail.author }}
      </span>

      <span class="time">
        {{ $t("msg.article.pubilcDate") }}:
        {{ $filters.relativeTime(detail.pubilcDate) }}
      </span>

      <el-button type="text" @click="handleEditArticle">{{
        $t("msg.article.edit")
      }}</el-button>
    </div>
    <!-- content -->
    <div class="content" v-html="detail.contaent"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleDetailApi } from '../../api/article'

const route = useRoute()
const articelId = route.params.id

const detail = ref({})

const getData = async () => {
  detail.value = await getArticleDetailApi(articelId)
}

getData()

const handleEditArticle = () => {}
</script>

<style lang="scss" scoped>
.article-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0;
    .author {
      font-size: 14px;
      color: #555666;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #d4d4d4;
  }
}
</style>
