<template>
  <div id="pie-sjdbt" width="300" height="350" class="canvas"></div>
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
  var chartDom = document.getElementById("pie-sjdbt") as HTMLDivElement;
  chartDom.removeAttribute("_echarts_instance_");
  let myChart = echarts.init(chartDom) as any;
  // myChart = echarts.init(chartDom);
  var option;
  option = {
    dataset: [
      {
        source: [
          ["Product", "Sales", "Price", "Year"],
          ["Cake", 123, 32, 2011],
          ["Cereal", 231, 14, 2011],
          ["Tofu", 235, 5, 2011],
          ["Dumpling", 341, 25, 2011],
          ["Biscuit", 122, 29, 2011],
          ["Cake", 143, 30, 2012],
          ["Cereal", 201, 19, 2012],
          ["Tofu", 255, 7, 2012],
          ["Dumpling", 241, 27, 2012],
          ["Biscuit", 102, 34, 2012],
          ["Cake", 153, 28, 2013],
          ["Cereal", 181, 21, 2013],
          ["Tofu", 395, 4, 2013],
          ["Dumpling", 281, 31, 2013],
          ["Biscuit", 92, 39, 2013],
          ["Cake", 223, 29, 2014],
          ["Cereal", 211, 17, 2014],
          ["Tofu", 345, 3, 2014],
          ["Dumpling", 211, 35, 2014],
          ["Biscuit", 72, 24, 2014],
        ],
      },
      {
        transform: {
          type: "filter",
          config: { dimension: "Year", value: 2011 },
        },
      },
      {
        transform: {
          type: "filter",
          config: { dimension: "Year", value: 2012 },
        },
      },
      {
        transform: {
          type: "filter",
          config: { dimension: "Year", value: 2013 },
        },
      },
    ],
    series: [
      {
        type: "pie",
        radius: 50,
        center: ["50%", "25%"],
        datasetIndex: 1,
      },
      {
        type: "pie",
        radius: 50,
        center: ["50%", "50%"],
        datasetIndex: 2,
      },
      {
        type: "pie",
        radius: 50,
        center: ["50%", "75%"],
        datasetIndex: 3,
      },
    ],
    // Optional. Only for responsive layout:
    media: [
      {
        query: { minAspectRatio: 1 },
        option: {
          series: [
            { center: ["25%", "50%"] },
            { center: ["50%", "50%"] },
            { center: ["75%", "50%"] },
          ],
        },
      },
      {
        option: {
          series: [
            { center: ["50%", "25%"] },
            { center: ["50%", "50%"] },
            { center: ["50%", "75%"] },
          ],
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
