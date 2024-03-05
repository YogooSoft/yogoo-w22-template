<template>
  <div class="view-home">
    <el-card
      style="height: 250px"
      shadow="hover"
      :body-style="{ padding: '0px', height: '100%' }"
    >
      <div class="card">
        <span class="card__header"
          >巡检项趋势
          <div class="right">
            <el-radio-group v-model="radio1" size="small" @change="chartsBtn">
              <el-radio-button label="近7天"></el-radio-button>
              <el-radio-button label="近30天"></el-radio-button>
            </el-radio-group>
          </div>
        </span>
      </div>

      <div id="dc" width="300" height="178" class="canvas"></div>
    </el-card>
  </div>
</template>

<!-- 使用setup语法糖的写法 -->
<script lang="ts" setup>
import {
  defineComponent,
  computed,
  ref,
  reactive,
  onMounted,
  onUnmounted,
} from "vue";
import * as echarts from "echarts";
import { GETDiagnoseRisksTrends } from "@/api/xocData";

let echart = echarts;
// let radio1: string = "近7天";
// ref() 定义基本数据类型，例如字符串、数字、boolean 等
const radio1 = ref("近7天");
// reactive() 数组、对象等
const echartData = reactive({
  pop: {
    xData: [],
    series1: [],
    series2: [],
    series3: [],
  },
});
// let echartData: any;

onMounted(() => {
  chartsBtn();
});

onUnmounted(() => {
  // 销毁实例
  echart.dispose;
});

function chartsBtn() {
  if (radio1 == ref("近7天")) {
    var time_range = 7;
  }

  if (radio1 == ref("近30天")) {
    var time_range = 30;
  }

  GETDiagnoseRisksTrends("userid").then((res: any) => {
    res = res.data.data;
    echartData["pop"]["xData"] = res.dates;
    echartData["pop"]["series1"] = res.high_risks;
    echartData["pop"]["series2"] = res.low_risks;
    echartData["pop"]["series3"] = res.no_risks;
    var chartDom = document.getElementById("dc") as HTMLDivElement;
    chartDom.removeAttribute("_echarts_instance_");
    let myChart = echarts.init(chartDom) as any;
    // myChart = echarts.init(chartDom);
    var option;
    option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        x: "center",
        y: "15rem",
        itemWidth: 25, //矩形宽度
        itemHeight: 6, //矩形高度
        textStyle: {
          color: "#606266",
        },
      },
      grid: {
        top: "60rem",
        left: "40rem",
        right: "40rem",
        bottom: "40rem",
      },
      title: {
        show: false,
        text: "巡检项趋势",
        x: "10rem",
        y: "15rem",
        // right: "15vh",
        textStyle: {
          fontSize: "13px",
          // fontWeight: "bold",
          color: "#606266",
          // color: "rgba(255,255,255,0.5)",
        },
      },
      button: {},
      xAxis: {
        type: "category",
        boundaryGap: false, //图形紧靠y轴显示
        axisLabel: {
          color: "#909399",
          show: true,
          // interval: 1, //x轴刻度线间隔显示
        },
        axisTick: {
          show: false, //不显示坐标轴刻度线
        },
        axisLine: {
          show: false, //不显示坐标轴线
        },
        data: echartData.pop.xData,
      },
      //y轴设置
      yAxis: [
        {
          type: "value",
          axisLabel: {
            color: "#909399",
            show: true,
          },
          axisLine: {
            show: true, //显示坐标轴线
            lineStyle: {
              color: "rgba(235, 238, 245, 1)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(235, 238, 245, 1)", //x轴刻度线颜色
              width: 1,
            },
          },
        },
      ],
      series: [
        {
          name: "高风险项",
          data: echartData.pop.series1,
          symbolSize: 8, //拐点大小
          color: "#F56C6C",
          type: "line",
          lineStyle: {
            color: "#F56C6C",
          },
        },
        {
          name: "低风险项",
          data: echartData.pop.series2,
          symbolSize: 8, //拐点大小
          color: "#E7A442",
          type: "line",
          lineStyle: {
            color: "#E7A442",
          },
        },
        {
          name: "安全项",
          data: echartData.pop.series3,
          symbolSize: 8, //拐点大小
          color: "#6BC33F",
          type: "line",
          lineStyle: {
            color: "#6BC33F",
          },
        },
      ],
    };
    option && myChart.setOption(option, true);
    //图表自适应屏幕
    setTimeout(function () {
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }, 500);
  });
}

// 暴露方法
defineExpose({
  chartsBtn,
});
</script>

<style scoped lang="less">
.canvas {
  padding: 0px;
  width: 100%;
  height: 208px;
  z-index: 1;
}

.view-home {
  .card {
    font-size: 14px;
    // font-weight: bold;
    display: block;
    color: #606266;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 0px;

    &__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      .right {
        display: inline-block;
        z-index: 7;
        margin-right: 10px;
        position: relative;
      }

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
        // float:left;
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
