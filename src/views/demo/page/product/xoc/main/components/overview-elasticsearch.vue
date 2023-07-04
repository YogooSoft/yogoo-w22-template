<template>
  <div class="overview-elasticsearch">
    <div class="card">
      <div class="card__header">
        <span class="label">
          <img
            class="model_item_box_card_top_title_imga"
            src="@/assets/index/logo-elasticsearch-32-color@2x.png"
            alt=""
        /></span>
        <span class="value">Elasticsearch集群</span>
      </div>
      <div class="card__container" style="height: 75px">
        <div class="model_1_left">
          <div class="data_box" style="width: 50%; display: inline-block">
            <span class="label1">集群总数</span>
            <span class="label2">
              <span style="font-size: 12px">{{
                es_info_data["pop"]["total"]
              }}</span>
              个<br />
              &nbsp;<span style="font-size: 12px; color: #e6a23c">&nbsp;</span>
            </span>
          </div>
          <div class="data_box" style="width: 50%; display: inline-block">
            <span class="label1">运行中</span>
            <span class="label2">
              <span style="font-size: 12px; color: #67c23a">{{
                es_info_data["pop"]["online"]
              }}</span>
              个 <br />
              &nbsp;
              <span style="font-size: 12px; color: #e6a23c">&nbsp;</span>
            </span>
          </div>
        </div>
        <div class="model_1_center">
          <div class="data_box" style="">
            <span class="label1">集群监控状态</span>
            <span class="label2">
              绿色
              <span style="font-size: 12px; color: #67c23a">{{
                es_info_data["pop"]["green"]
              }}</span>
              个 &nbsp;&nbsp; 黄色
              <span style="font-size: 12px; color: #e6a23c">{{
                es_info_data["pop"]["yellow"]
              }}</span>
              个 &nbsp;&nbsp; 红色
              <span style="font-size: 12px; color: #f56c6c">{{
                es_info_data["pop"]["red"]
              }}</span>
              个 &nbsp;&nbsp; 未知
              <span style="font-size: 12px; color: #e6a23c">{{
                es_info_data["pop"]["unknown"]
              }}</span>
              个
              <br />
              &nbsp;<span style="font-size: 12px; color: #e6a23c">&nbsp;</span>
            </span>
          </div>
        </div>
        <div class="model_1_right">
          <div class="data_box">
            <span class="label1">告警</span>
            <span class="label2">
              未恢复告警
              <span
                style="
                  font-size: 12px;
                  color: #f56c6c;
                  display: inline-block;
                  margin-left: 3px;
                  margin-right: 3px;
                "
                >0</span
              >
              个
              <br />
              未配置接收人的告警策略
              <span
                style="
                  font-size: 12px;
                  color: #f56c6c;
                  margin-left: 3px;
                  margin-right: 3px;
                  margin-top: -5px;
                "
                >10</span
              >
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
// 获取Elasticsearch集群 概览数据
import { GetESInfoData } from "@/api/xocData";

// Elasticsearch集群概要信息
const es_info_data = reactive({
  pop: {
    total: "",
    online: "",
    green: "",
    yellow: "",
    red: "",
    unknown: "",
  },
});

//获取 Elasticsearch集群概览数据
function GetESInfoData_func(data) {
  GetESInfoData(data).then((res: any) => {
    if (res.meta.code == "0") {
      es_info_data["pop"] = res.data.data;
    }
  });
}

// 暴露方法
defineExpose({
  GetESInfoData_func,
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
    width: 20%;
    display: inline-block;
    border-right: solid 1px #dcdfe6;

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

  .model_1_center {
    width: 45%;
    display: inline-block;
    border-right: solid 1px #dcdfe6;
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

  .model_1_right {
    width: 35%;
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
