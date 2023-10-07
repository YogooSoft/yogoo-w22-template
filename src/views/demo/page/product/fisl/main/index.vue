<template>
  <div class="view-home">
    <el-row :gutter="15">
      <el-col :lg="7" :xs="24">
        <div class="card">
          <cust-info />
        </div>
      </el-col>
      <el-col :lg="17" :md="12" :xs="24">
        <div class="card">
          <balance-info />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :lg="14" :xs="24">
        <div class="card">
          <tab-chart />
        </div>
      </el-col>
      <el-col :lg="10" :xs="24">
        <div class="card">
          <balance-rank />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :lg="14" :sm="24">
        <div class="card card--last">
          <!-- <hot-search /> -->
          <charts-balance-com />
        </div>
      </el-col>
      <el-col :lg="10" :sm="24">
        <div class="card card--last">
          <!-- <category-ratio /> -->
          <int-rank />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :lg="14" :sm="24">
        <div class="card card--last">
          <charts-cust-count />
        </div>
      </el-col>
      <el-col :lg="10" :sm="24">
        <div class="card card--last">
          <!-- <category-ratio /> -->
          <rate-rank />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :lg="14" :sm="24">
        <div class="card card--last">
          <charts-int />
        </div>
      </el-col>
      <el-col :lg="10" :sm="24">
        <div class="card card--last">
          <!-- <category-ratio /> -->
          <zzc-rank />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import TabChart from "./components/tab-chart.vue";
import CustInfo from "./components/cust-info.vue";
import BalanceInfo from "./components/balance-info.vue";
import BalanceRank from "./components/balance-rank.vue";
import IntRank from "./components/int-rank.vue";
import RateRank from "./components/rate-rank.vue";
import ZzcRank from "./components/zzc-rank.vue";
import ChartsBalanceCom from "./components/charts-balance-com.vue";
import ChartsCustCount from "./components/charts-cust-count.vue";
import ChartsInt from "./components/charts-int.vue";
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
