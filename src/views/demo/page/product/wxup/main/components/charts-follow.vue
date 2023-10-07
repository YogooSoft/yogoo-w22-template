<template>
  <div class="view-home">
    <el-card :body-style="{ padding: '0px', height: '100%' }">
      <div class="card">
        <span class="echarts_title">公众号关注用户趋势(人) </span
        >
        <!-- <sapn class="echarts_dw">(单位：人)</sapn> -->
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
  watch,
} from "vue";
import * as echarts from "echarts";
import { GetWxupFollowEchartsData } from "@/api/wxupData";
import { useRootSetting } from "@/hooks/setting/useRootSetting";

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
const { getIsCollapse } = useRootSetting();
// let echartData: any;
watch(getIsCollapse, (newQuestion, oldQuestion) => {
  setTimeout(() => {
    chartsBtn();
  }, 300);
});

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

  GetWxupFollowEchartsData("userid").then((res: any) => {
    res = res.data.data;
    echartData["pop"]["xData"] = res.dates;
    echartData["pop"]["series1"] = res.gz_count;
    echartData["pop"]["series2"] = res.qg_count;
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
        left: "60rem",
        right: "40rem",
        bottom: "40rem",
      },
      // title: {
      //   show: true,
      //   text: "单位：人",
      //   x: "10rem",
      //   y: "15rem",
      //   // right: "15vh",
      //   textStyle: {
      //     fontSize: "13px",
      //     // fontWeight: "bold",
      //     color: "#606266",
      //     // color: "rgba(255,255,255,0.5)",
      //   },
      // },
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
          name: "关注人数",
          nameLocation: "end",
          nameTextStyle: {
            align: "right",
            color: "#606266",
            padding: [0, -10, -10, 0],
            lineHeight: "50",
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
        {
          type: "value",
          name: "取关人数",
          nameLocation: "end",
          nameTextStyle: {
            align: "right",
            color: "#606266",
            padding: [0, -30, -10, 0],
            lineHeight: "50",
          },
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
          name: "关注人数",
          data: echartData.pop.series1,
          symbolSize: 4, //拐点大小
          color: "#F56C6C",
          type: "line",
          lineStyle: {
            color: "#F56C6C",
          },
          yAxisIndex: 0,
        },
        {
          name: "取关人数",
          data: echartData.pop.series2,
          symbolSize: 4, //拐点大小
          color: "#E7A442",
          type: "line",
          lineStyle: {
            color: "#E7A442",
          },
          yAxisIndex: 1,
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
      color: #606266;
      font-weight: bold;
      font-size: 15px;

      .right {
        display: inline-block;
        z-index: 1000;
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
.el-card {
  height: 250px;
  border: unset;
}
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: none;
}
.echarts_dw {
  font-size: "13px";
  font-weight: bold;
  color: #606266;
}
.echarts_title {
  margin-right: 10px;
  color: #606266;
  font-weight: bold;
  font-size: 14px;
}
</style>
