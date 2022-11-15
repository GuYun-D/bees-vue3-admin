<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button v-print="printObj" :loading="printLoading" type="primary">{{
        $t('msg.userInfo.print')
      }}</el-button>
    </el-card>

    <el-card>
      <div class="user-info-box" id="user-info-box">
        <!-- title -->
        <h2>{{ $t('msg.userInfo.title') }}</h2>
        <!-- header -->
        <div class="header">
          <!-- table -->
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('msg.userInfo.name')">{{
              detailData.username
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">{{
              detailData.gender
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.nation')">{{
              detailData.nationality
            }}</el-descriptions-item>

            <el-descriptions-item :label="$t('msg.userInfo.mobile')">{{
              detailData.mobile
            }}</el-descriptions-item>

            <el-descriptions-item :label="$t('msg.userInfo.province')">{{
              detailData.province
            }}</el-descriptions-item>

            <el-descriptions-item :label="$t('msg.userInfo.date')">{{
              $filters.dateFilter(detailData.openTime)
            }}</el-descriptions-item>

            <el-descriptions-item :span="2" :label="$t('msg.userInfo.remark')">
              <el-tag
                class="remark"
                size="small"
                v-for="(tag, index) in detailData.remark"
                :key="index"
                >{{ tag }}</el-tag
              >
            </el-descriptions-item>

            <el-descriptions-item :span="2" :label="$t('msg.userInfo.address')">
              {{ detailData.address }}
            </el-descriptions-item>
          </el-descriptions>
          <!-- avatar -->
          <el-image class="avatar" :src="detailData.avatar"></el-image>
        </div>
        <!-- content -->
        <div class="body">
          <el-descriptions direction="vertical" border :column="1">
            <el-descriptions-item
              :span="2"
              :label="$t('msg.userInfo.experience')"
            >
              <ul>
                <li :key="index" v-for="(item, index) in detailData.experience">
                  <span>
                    {{ $filters.dateFilter(detailData.startTime, 'YYYY/MM') }}

                    ----
                    {{ $filters.dateFilter(detailData.endTime, 'YYYY/MM') }}
                  </span>

                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>

            <el-descriptions-item :span="2" :label="$t('msg.userInfo.major')">{{
              detailData.major
            }}</el-descriptions-item>

            <el-descriptions-item :span="2" :label="$t('msg.userInfo.glory')">{{
              detailData.glory
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- footer -->
        <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { getUserDetailApi } from '../../api/user-manage'
import { watchSwitchLanguage } from '../../utils/i18n'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const detailData = ref({})
const getUserDetail = async () => {
  detailData.value = await getUserDetailApi(props.id)
}

getUserDetail()

watchSwitchLanguage(getUserDetail)

// print
const printLoading = ref(false)
const printObj = {
  // print area
  id: 'user-info-box',
  // print title
  popTitle: 'bees-vue3-admin',
  // before print
  beforeOpenCallback () {
    printLoading.value = true
  },
  // print
  openCallback () {
    printLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    ::v-deep .el-descriptions {
      flex-grow: 1;
    }
    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
