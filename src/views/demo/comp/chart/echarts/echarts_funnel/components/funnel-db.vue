<template>
  <div id="funnel-db" width="300" height="350" class="canvas"></div>
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
  var chartDom = document.getElementById("funnel-db") as HTMLDivElement;
  chartDom.removeAttribute("_echarts_instance_");
  let myChart = echarts.init(chartDom) as any;
  // myChart = echarts.init(chartDom);
  var option;
  option = {
    title: {
      text: "Funnel Compare",
      subtext: "Fake Data",
      left: "left",
      top: "bottom",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c}%",
    },
    toolbox: {
      show: true,
      orient: "vertical",
      top: "center",
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["Prod A", "Prod B", "Prod C", "Prod D", "Prod E"],
    },
    series: [
      {
        name: "Funnel",
        type: "funnel",
        width: "40%",
        height: "45%",
        left: "5%",
        top: "50%",
        funnelAlign: "right",
        data: [
          { value: 60, name: "Prod C" },
          { value: 30, name: "Prod D" },
          { value: 10, name: "Prod E" },
          { value: 80, name: "Prod B" },
          { value: 100, name: "Prod A" },
        ],
      },
      {
        name: "Pyramid",
        type: "funnel",
        width: "40%",
        height: "45%",
        left: "5%",
        top: "5%",
        sort: "ascending",
        funnelAlign: "right",
        data: [
          { value: 60, name: "Prod C" },
          { value: 30, name: "Prod D" },
          { value: 10, name: "Prod E" },
          { value: 80, name: "Prod B" },
          { value: 100, name: "Prod A" },
        ],
      },
      {
        name: "Funnel",
        type: "funnel",
        width: "40%",
        height: "45%",
        left: "55%",
        top: "5%",
        funnelAlign: "left",
        data: [
          { value: 60, name: "Prod C" },
          { value: 30, name: "Prod D" },
          { value: 10, name: "Prod E" },
          { value: 80, name: "Prod B" },
          { value: 100, name: "Prod A" },
        ],
      },
      {
        name: "Pyramid",
        type: "funnel",
        width: "40%",
        height: "45%",
        left: "55%",
        top: "50%",
        sort: "ascending",
        funnelAlign: "left",
        data: [
          { value: 60, name: "Prod C" },
          { value: 30, name: "Prod D" },
          { value: 10, name: "Prod E" },
          { value: 80, name: "Prod B" },
          { value: 100, name: "Prod A" },
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
