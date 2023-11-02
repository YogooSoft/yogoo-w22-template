<template>
  <div id="bar_sjj" width="300" height="350" class="canvas"></div>
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

const labelRight = {
  position: "right",
};

function chartsBtn() {
  var chartDom = document.getElementById("bar_sjj") as HTMLDivElement;
  chartDom.removeAttribute("_echarts_instance_");
  let myChart = echarts.init(chartDom) as any;
  var option;
  option = {
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ["product", "2015", "2016", "2017"],
        ["Matcha Latte", 43.3, 85.8, 93.7],
        ["Milk Tea", 83.1, 73.4, 55.1],
        ["Cheese Cocoa", 86.4, 65.2, 82.5],
        ["Walnut Brownie", 72.4, 53.9, 39.1],
      ],
    },
    xAxis: { type: "category" },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
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
