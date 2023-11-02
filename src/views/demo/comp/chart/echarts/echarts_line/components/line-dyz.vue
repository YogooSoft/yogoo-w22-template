<template>
  <div id="line-dyz" width="300" height="350" class="canvas"></div>
</template>

<!-- 使用setup语法糖的写法 -->
<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from "vue";
import * as echarts from "echarts";

import { useRootSetting } from "@/hooks/setting/useRootSetting";

let echart = echarts;
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
  var chartDom = document.getElementById("line-dyz") as HTMLDivElement;
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

    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: [
      {
        type: "value",
      },
      {
        type: "value",
      },
    ],
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
        yAxisIndex: 0,
      },
      {
        data: [520, 432, 101, 234, 490, 330, 390],
        type: "line",
        smooth: true,
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
}

// 暴露方法
defineExpose({
  chartsBtn,
});
</script>

<style scoped lang="less">
.canvas {
  padding: 0px;
  width: 50%;
  height: 350px;
  z-index: 1;
}
</style>
