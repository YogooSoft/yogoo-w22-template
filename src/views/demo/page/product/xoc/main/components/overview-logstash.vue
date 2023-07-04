<template>
  <div class="overview-logstash">
    <div class="card">
      <!--  使用卡片插件-->
      <div class="card__header">
        <span class="label">
          <img
            class="model_item_box_card_top_title_imga"
            src="@/assets/index/logo-logstash-64-color.svg"
            alt=""
        /></span>
        <span class="value">Logstash实例</span>
      </div>

      <div class="card__container" style="height: 60px">
        <div class="model_1_left">
          <div class="data_box">
            <span class="label1">实例总数</span>
            <span class="label2">
              <span style="font-size: 12px">{{
                logstash_info_data["pop"]["total"]
              }}</span>
              个</span
            >
          </div>
          <div class="data_box">
            <span class="label1">运行中</span>
            <span class="label2">
              <span style="font-size: 12px; color: #67c23a">{{
                logstash_info_data["pop"]["online"]
              }}</span>
              个
            </span>
          </div>
          <div class="data_box" style="width: 30%; display: inline-block">
            <span class="label1">停止中</span>
            <span class="label2">
              <span style="font-size: 12px; color: #f56c6c">{{
                logstash_info_data["pop"]["offline"]
              }}</span>
              个
            </span>
          </div>
        </div>
        <div class="model_1_right">
          <div class="data_box">
            <span class="label1">告警</span>
            <span class="label2">
              未恢复告警数量
              <span style="font-size: 12px; color: #f56c6c">0</span>
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
import { GetLogstashInfoData } from "@/api/xocData";

// Elasticsearch集群概要信息
const logstash_info_data = reactive({
  pop: {
    total: "",
    online: "",
    offline: "",
  },
});

//获取Logstash实例 概览数据
function GetLogstashInfoData_func(data) {
  GetLogstashInfoData(data).then((res: any) => {
    if (res.meta.code == "0") {
      logstash_info_data["pop"] = res.data.data;
    }
  });
}

// 暴露方法
defineExpose({
  GetLogstashInfoData_func,
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
    width: 50%;
    display: inline-block;
    border-right: solid 1px #dcdfe6;

    .data_box {
      width: 30%;
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

  .model_1_right {
    width: 50%;
    display: inline-block;
    padding-left: 30px;

    .data_box {
      width: 100%;
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
