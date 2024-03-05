<template>
  <page-wrapper title="" content="">
    <div class="view-home">
      <!-- 运营日历 -->
      <el-row :gutter="15">
        <el-col :span="6">
          <div class="card">
            <left-content />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card">
            <yy-calendar />
          </div>
          <div class="card">
            <yyjsc />
          </div>
          <div class="card">
            <table-data />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="card">
            <right-content />
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog v-model="dialogVisible" width="33%" style="font-size: 10px">
      <div class="dialog_title" slot="title">
        港股通投资标的默认估值方案的通知
      </div>

      <span
        style="
          text-align: center;
          display: inline-block;
          width: 100%;
          font-weight: bold;
          line-height: 50px;
        "
        >港股通投资标的默认估值方案的通知</span
      >
      <br />
      &nbsp;&nbsp; &nbsp;&nbsp;
      <span>尊敬的管理人:</span>
      <br /><br />
      &nbsp;&nbsp; &nbsp;&nbsp;
      <span style="line-height: 23px"
        >根据沪深交易所和港交所公布的2023年“中秋、国庆”假期休市安排，9月29日、10月3日至6日
        期间，沪深交易所休市、港股正常交易。考虑到此次节假日安排涉及信息披露基准日《9月30日)，
        为确保产品估值公允性与净值准确性，我部对于上述期间内产品持有港股通投资标的的<span
          style="font-weight: bold"
          >默认估值方案</span
        >如下:</span
      >
      <br /><br />&nbsp;&nbsp; &nbsp;&nbsp;
      <span style="line-height: 23px"
        ><span style="font-weight: bold">1、产品范围：</span
        >我部托管或外包且提供估值核算服务的产品;</span
      >
      <br /><br />&nbsp;&nbsp; &nbsp;&nbsp;
      <span style="line-height: 23px"
        ><span style="font-weight: bold">2、涉及标的：</span
        >通过港股通投资香港联交所公开发行/交易的股票、ETF基金等投资标的;</span
      >
      <br /><br />&nbsp;&nbsp; &nbsp;&nbsp;
      <span style="line-height: 23px"
        ><span style="font-weight: bold">3、默认估值方案：</span
        >产品持有的港股通投资标的，9月29日按其在港交所的当日收盘价估值，并
        相应处理其派发现金红利、股票红利等公司行为《若有》;10月3日至6日期间默认不更新行情。</span
      >
      <br /><br />&nbsp;&nbsp; &nbsp;&nbsp;
      <span style="line-height: 23px"
        >如贵司对上述默认方案存在异议，烦请拨打我司客服热线021-38917599-5，与我司沟通相关估值处理事宜。</span
      ><br /><br /><br /><br /><br /><br />
      <el-divider />
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogVisible = false">我已知晓</el-button>
      </div>
    </el-dialog>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { ElMessage } from "element-plus";
import { PageWrapper } from "@/components/Page";
// 运营驾驶舱
import Yyjsc from "./components/yyjsc.vue";
import TableData from "./components/table-data.vue";
import YyCalendar from "./components/yy-calendar.vue";
import LeftContent from "./components/left-content.vue";
import RightContent from "./components/right-content.vue";

import { useRootSetting } from "@/hooks/setting/useRootSetting";
const { getIsCollapse } = useRootSetting();

export default defineComponent({
  components: {
    // Elasticsearch集群概要信息组件
    Yyjsc,
    TableData,
    YyCalendar,
    LeftContent,
    RightContent,
    PageWrapper,
  },
  data() {
    return {
      dialogVisible: true,
    };
  },
  created() {},

  watch: {},

  methods: {},
  mounted() {},
});
</script>

<style lang="less" scoped>
.view-home {
  .card {
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 12px;
    letter-spacing: 0.5px;
    // color: #000;

    &__header {
      display: flex;
      align-items: center;
      height: 34px;
      padding: 0 10px;

      .label {
        font-size: 12px;
      }

      .value {
        font-size: 14px;
        // font-weight: bold;
        /*margin-left: 10px;*/
      }
    }

    &__container {
      padding: 0 10px;
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
    }
  }
}
.dialog_title {
  font-size: 16px;
  color: #303133;
  line-height: 24px;
}
</style>
