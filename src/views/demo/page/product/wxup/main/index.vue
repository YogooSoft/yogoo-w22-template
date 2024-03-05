<template>
  <page-wrapper title="" content="">
    <div class="view-home">
      <div style="margin-bottom: 10px">
        <span>公众号选择：</span>
        <el-select
          v-model="value1"
          collapse-tags
          collapse-tags-tooltip
          placeholder="选择公众号"
          style="width: 150px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-row :gutter="15" v-if="value1 === '0'">
        <el-col :lg="24" :xs="24">
          <div class="card">
            <wechat-base />
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :lg="7" :xs="24">
          <div class="card">
            <cust-info />
          </div>
        </el-col>
        <el-col :lg="17" :xs="24">
          <div class="card">
            <article-info />
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :lg="12" :xs="24">
          <div class="card">
            <tab-chart />
          </div>
        </el-col>
        <el-col :lg="12" :xs="24">
          <div class="card">
            <tsmb-chart />
            <!-- <follow-rank /> -->
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :lg="14" :xs="24">
          <div class="card">
            <charts-account />
          </div>
          <div class="card card--last">
            <charts-follow />
          </div>
          <div class="card card--last">
            <charts-read />
          </div>
        </el-col>
        <el-col :lg="10" :xs="24">
          <div class="card">
            <wechat-data-rank />
          </div>
          <div class="card">
            <article-data-rank />
          </div>
        </el-col>
      </el-row>
    </div>
  </page-wrapper>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { PageWrapper } from "@/components/Page";
import TabChart from "./components/tab-chart.vue";
import CustInfo from "./components/cust-info.vue";
import ArticleInfo from "./components/article-info.vue";
import FollowRank from "./components/follow-rank.vue";
import PushRank from "./components/push-rank.vue";
import ReadRank from "./components/read-rank.vue";
import ChartsAccount from "./components/charts-account.vue";
import ChartsFollow from "./components/charts-follow.vue";
import ChartsRead from "./components/charts-read.vue";
import WechatDataRank from "./components/wechat-data-rank.vue";
import ArticleDataRank from "./components/article-data-rank.vue";

import ArticleRank from "./components/article-rank.vue";

import TsmbChart from "./components/tsmb-chart.vue";

// 公众号看板
import WechatBase from "./components/wechat-base.vue";

const value1 = ref("0");
const options = [
  {
    value: "0",
    label: "全部",
  },
  {
    value: "Datafirst114",
    label: "数据头等舱",
  },
  {
    value: "DatafirstA1",
    label: "数据头等舱A1",
  },
  {
    value: "DatafirstB1",
    label: "数据头等舱B1",
  },
  {
    value: "DatafirstC1",
    label: "数据头等舱C1",
  },
];
</script>

<style lang="less" scoped>
.view-home {
  .card {
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #000;

    &__header {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 20px;

      .label {
        font-size: 12px;
      }

      .value {
        font-size: 18px;
        font-weight: bold;
        margin-left: 10px;
      }
    }

    &__container {
      padding: 0 20px;
      height: 50px;
    }

    &__footer {
      display: flex;
      align-items: center;
      height: 50px;
      border-top: 1px solid #f7f7f7;
      font-size: 12px;
      margin: 0 5px;
      padding: 0 15px;
      box-sizing: border-box;

      .label {
        margin-right: 10px;
      }

      .value {
        font-size: 13px;
      }
    }
  }
}
</style>
