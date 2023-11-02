<template>
  <div id="bar_zzpxt" width="300" height="350" class="canvas"></div>
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
  var chartDom = document.getElementById("bar_zzpxt") as HTMLDivElement;
  chartDom.removeAttribute("_echarts_instance_");
  let myChart = echarts.init(chartDom) as any;
  var option;
  option = {
    dataset: [
      {
        dimensions: ["name", "age", "profession", "score", "date"],
        source: [
          ["Hannah Krause", 41, "Engineer", 314, "2011-02-12"],
          ["Zhao Qian", 20, "Teacher", 351, "2011-03-01"],
          ["Jasmin Krause ", 52, "Musician", 287, "2011-02-14"],
          ["Li Lei", 37, "Teacher", 219, "2011-02-18"],
          ["Karle Neumann", 25, "Engineer", 253, "2011-04-02"],
          ["Adrian Groß", 19, "Teacher", "-", "2011-01-16"],
          ["Mia Neumann", 71, "Engineer", 165, "2011-03-19"],
          ["Böhm Fuchs", 36, "Musician", 318, "2011-02-24"],
          ["Han Meimei", 67, "Engineer", 366, "2011-03-12"],
        ],
      },
      {
        transform: {
          type: "sort",
          config: { dimension: "score", order: "desc" },
        },
      },
    ],
    xAxis: {
      type: "category",
      axisLabel: { interval: 0, rotate: 30 },
    },
    yAxis: {},
    series: {
      type: "bar",
      encode: { x: "name", y: "score" },
      datasetIndex: 1,
    },
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
