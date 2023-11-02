<template>
  <div id="base_radar" width="300" height="350" class="canvas"></div>
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
  var chartDom = document.getElementById("base_radar") as HTMLDivElement;
  chartDom.removeAttribute("_echarts_instance_");
  let myChart = echarts.init(chartDom) as any;
  // myChart = echarts.init(chartDom);
  var option;
  option = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    series: [
      {
        name: "Pressure",
        type: "gauge",
        progress: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
        },
        data: [
          {
            value: 50,
            name: "SCORE",
          },
        ],
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
