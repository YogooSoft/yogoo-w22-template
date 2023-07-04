<template>
  <div class="overview-beats">
    <div class="card">
      <div class="card__header">
        <span class="label">
          <img
            class="model_item_box_card_top_title_imga"
            src="@/assets/index/logo-beats-64-color.svg"
            alt=""
        /></span>
        <span class="value">Beats采集器</span>
      </div>

      <div class="card__container" style="height: 60px">
        <div class="model_1_left">
          <div class="data_box">
            <span class="label1">实例总数</span>
            <span class="label2">
              <span style="font-size: 12px">{{
                beat_info_data["pop"]["total"]
              }}</span>
              个</span
            >
          </div>
          <div class="data_box">
            <span class="label1">运行中</span>
            <span class="label2">
              <span style="font-size: 12px; color: #67c23a">{{
                beat_info_data["pop"]["online"]
              }}</span>
              个
            </span>
          </div>
          <div class="data_box">
            <span class="label1">停止中</span>
            <span class="label2">
              <span style="font-size: 12px; color: #f56c6c">{{
                beat_info_data["pop"]["offline"]
              }}</span>
              个
            </span>
          </div>
          <div class="data_box">
            <span class="label1">异常机器数</span>
            <span class="label2">
              <span style="font-size: 12px; color: #e6a23c">{{
                beat_info_data["pop"]["abnormal"]
              }}</span>
              个
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, computed, ref, reactive } from "vue";
// 获取Logstash实例 概览数据
import { GetBeatInfoData } from "@/api/xocData";

// Beats采集器概要信息
const beat_info_data = reactive({
  pop: {
    total: "",
    online: "",
    offline: "",
    abnormal: "",
  },
});

// 获取Beats采集器概览数据
function GetBeatInfoData_func(data) {
  GetBeatInfoData(data).then((res: any) => {
    if (res.meta.code == "0") {
      beat_info_data["pop"] = res.data.data;
    }
  });
}

// 暴露方法
defineExpose({
  GetBeatInfoData_func,
});
</script>

<style scoped lang="less">
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

      .label {
        margin-right: 10px;
      }

      .value {
        font-size: 13px;
      }
    }
  }
}

.card__container {
  .model_1_left {
    width: 60%;
    display: inline-block;

    // border-right: solid 1px #dcdfe6;
    .data_box {
      width: 25%;
      display: inline-block;

      .label1 {
        font-size: 13px;
        display: block;
        // color: #303133;
        padding-bottom: 8px;
        padding-top: 10px;
      }

      .label2 {
        font-size: 10px;
        display: block;
        // color: #303133
      }
    }
  }
}

.model_item_box_card_top_title_imga {
  display: inline-block;
  height: 16px;
  width: 16px;
  line-height: 40px;
  margin-right: 5px;
}
</style>
