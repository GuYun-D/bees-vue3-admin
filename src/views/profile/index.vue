<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <ProjectCard :features="featureData" class="project-card"></ProjectCard>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane name="feature" :label="$t('msg.profile.feature')">
              <Feature></Feature>
            </el-tab-pane>

            <el-tab-pane name="chapter" :label="$t('msg.profile.chapter')">
              <Chapter></Chapter>
            </el-tab-pane>

            <el-tab-pane name="author" :label="$t('msg.profile.author')">
              <Author></Author>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import Feature from './components/Feature.vue'
import Chapter from './components/Chapter.vue'
import Author from './components/Author.vue'
import { getFeatureApi } from '../../api/user'
import { watchSwitchLanguage } from '../../utils/i18n'

const activeName = ref('feature')

const featureData = ref([])
const getFeature = async () => {
  featureData.value = await getFeatureApi()
}

onMounted(() => {
  getFeature()
})

watchSwitchLanguage(() => {
  getFeature()
})
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
