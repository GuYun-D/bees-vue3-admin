<template>
  <el-card class="user-container">
    <template #header>
      <div class="header">
        <span>{{ $t('msg.profile.introduce') }}</span>
      </div>
    </template>

    <div class="user-profile">
      <!-- avatar -->
      <div class="box-container">
        <Thumb
          :image="$store.getters.userInfo.avatar"
          height="100px"
          width="100px"
        >
          <div>Hello</div>
          {{ $store.getters.userInfo.title }}
        </Thumb>
      </div>

      <!-- name && role -->
      <div class="box-center">
        <div class="user-name text-center">
          {{ $store.getters.userInfo.username }}
        </div>

        <div class="user-role text-center text-mult">
          {{ $store.getters.userInfo.title }}
        </div>
      </div>
    </div>

    <!-- introduce -->
    <div class="project-bio">
      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <SvgIcon icon="introduce"></SvgIcon>
          <span>{{ $t('msg.profile.projectIntroduction') }}</span>
        </div>

        <div class="project-bio-section-body">
          <div class="text-mult">
            {{ $t('msg.profile.muted') }}
          </div>
        </div>
      </div>

      <!-- features -->
      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <SvgIcon icon="reward"></SvgIcon>
          <span>{{ $t('msg.profile.projectFunction') }}</span>
        </div>

        <div class="project-bio-section-body">
          <div v-for="item in features" :key="item.key">
            <div>{{ item.title }}</div>
            <el-progress
              status="success"
              :percentage="item.percentage"
            ></el-progress>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue'
import Thumb from '../../../components/Thumb'
import SvgIcon from '../../../components/SVgIcon'

defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.user-container {
  .text-muted {
    font-size: 14px;
    color: #777;
  }

  .user-profile {
    text-align: center;
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
    }
  }

  .project-bio {
    margin-top: 20px;
    color: #606266;
    span {
      padding-left: 4px;
    }

    .project-bio-section {
      margin-bottom: 36px;
      .project-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .project-bio-section-body {
        .progress-item {
          margin-top: 10px;
          div {
            font-size: 14px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }
}
</style>
