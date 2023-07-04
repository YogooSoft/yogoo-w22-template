<template>
  <div class="view-home">
    <el-card
      style="height: 250px"
      shadow="hover"
      :body-style="{ padding: '0px', height: '100%' }"
    >
      <div class="card">
        <span class="card__header">最新集群巡检结果</span>
        <div class="data_box">
          <span class="highRisk">高风险项</span>
          <span style="font-size: 12px; display: block; color: #303133">
            <span style="font-size: 13px; font-weight: bold; color: #f56c6c">{{
              report_data["pop"]["high_risks"]
            }}</span>
            个<br />
          </span>
        </div>
        <div class="data_box">
          <span class="lowRisk">低风险项</span>
          <span style="font-size: 12px; display: block">
            <span style="font-size: 13px; font-weight: bold; color: #e7a442">{{
              report_data["pop"]["low_risks"]
            }}</span>
            个 <br />
          </span>
        </div>
        <div class="data_box">
          <span class="noRisk">安全项</span>
          <span style="font-size: 12px; display: block">
            <span style="font-size: 13px; font-weight: bold; color: #6bc33f">{{
              report_data["pop"]["no_risks"]
            }}</span>
            个 <br />
          </span>
        </div>
        <div
          class="data_box"
          style="width: 100%; display: block; padding-left: 15px"
        >
          <div class="text_box">
            <span class="text_box_left">自动巡检</span>
            <span class="text_box_right">{{
              report_data["pop"]["create_time"]
            }}</span>
          </div>
          <div class="text_box" style="display: block; padding-top: 25px">
            <span class="text_box_left">摘要</span>
            <span
              class="text_box_right"
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
              "
            >
              集群存在高风险巡检项{{
                report_data["pop"]["high_risks"]
              }}个，低风险巡检项{{ report_data["pop"]["low_risks"] }}个，{{
                report_data["pop"]["summary"]
              }}
            </span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, computed, ref, reactive } from "vue";

const report_data = reactive({
  pop: {
    high_risks: "",
    low_risks: "",
    no_risks: "",
    create_time: "",
  },
});

function check_re_show(data) {
  report_data["pop"] = data;
}

// 暴露方法
defineExpose({
  check_re_show,
});
</script>

<style scoped lang="less">
.view-home {
  .card {
    font-size: 14px;
    // font-weight: bold;
    display: block;
    color: #606266;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;

    &__header {
      display: flex;
      align-items: center;
      // height: 34px;
      // padding: 0 10px;

      .label {
        font-size: 12px;
      }

      .value {
        font-size: 14px;
        font-weight: bold;
        /*margin-left: 10px;*/
      }
    }

    &__container {
      padding: 0 10px;
      height: 50px;
    }

    .data_box {
      width: 30%;
      display: inline-block;
      padding-left: 10%;

      .highRisk {
        font-size: 13px;
        display: block;
        // color: #303133;
        padding-bottom: 8px;
        padding-top: 10px;
      }

      .lowRisk {
        font-size: 13px;
        display: block;
        // color: #303133;
        padding-bottom: 8px;
        padding-top: 10px;
      }

      .noRisk {
        font-size: 13px;
        display: block;
        // color: #303133;
        padding-bottom: 8px;
        padding-top: 10px;
      }
    }

    .text_box {
      display: block;
      padding-top: 10px;

      .text_box_left {
        font-size: 13px;
        display: inline-block;
        width: 20%;
        float: left;
        color: #909399;
      }

      .text_box_right {
        font-size: 13px;
        display: block;
        width: 70%;
        float: left;
        color: #909399;
      }
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
