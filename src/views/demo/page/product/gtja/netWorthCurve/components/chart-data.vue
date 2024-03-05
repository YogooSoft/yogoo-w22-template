<template>
  <div class="view-home">
    <el-card :body-style="{ padding: '0px', height: '100%' }">
      <div class="card">
        <div
          style="
            display: inline-block;
            float: left;
            width: 12px;
            height: 5px;
            margin-top: 5px;
            margin-right: 5px;
            background-color: #f57373;
          "
        ></div>
        <span class="card__header"> 悦宏吉庆有余2号私募证券投资基金</span>
      </div>

      <div id="dc3" width="300" height="500" class="canvas"></div>
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
import { GetDWJZEchartsData } from "@/api/gtjaData";
import { useRootSetting } from "@/hooks/setting/useRootSetting";

let echart = echarts;
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
  GetDWJZEchartsData("userid").then((res: any) => {
    res = res.data.data;
    echartData["pop"]["xData"] = res.dates;
    echartData["pop"]["series1"] = res.int_list;
    var chartDom = document.getElementById("dc3") as HTMLDivElement;
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
      grid: {
        top: "60rem",
        left: "60rem",
        right: "40rem",
        bottom: "40rem",
      },
      title: {
        show: true,
        text: "单位净值",
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
          max: 1.002,
          min: 1.001,
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
          name: "单位净值",
          data: echartData.pop.series1,
          symbolSize: 4, //拐点大小
          color: "#F56C6C",
          type: "line",
          lineStyle: {
            color: "#F56C6C",
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
  height: 320px;
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
      // font-weight: bold;
      font-size: 14px;
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
</style>
