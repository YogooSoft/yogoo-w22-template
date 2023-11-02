<template>
  <div id="gauge-dbt" width="300" height="350" class="canvas"></div>
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

const gaugeData = [
  {
    value: 20,
    name: "Good",
    title: {
      offsetCenter: ["-40%", "80%"],
    },
    detail: {
      offsetCenter: ["-40%", "95%"],
    },
  },
  {
    value: 40,
    name: "Better",
    title: {
      offsetCenter: ["0%", "80%"],
    },
    detail: {
      offsetCenter: ["0%", "95%"],
    },
  },
  {
    value: 60,
    name: "Perfect",
    title: {
      offsetCenter: ["40%", "80%"],
    },
    detail: {
      offsetCenter: ["40%", "95%"],
    },
  },
];

function chartsBtn() {
  var chartDom = document.getElementById("gauge-dbt") as HTMLDivElement;
  chartDom.removeAttribute("_echarts_instance_");
  let myChart = echarts.init(chartDom) as any;
  // myChart = echarts.init(chartDom);
  var option;
  option = {
    series: [
      {
        type: "gauge",
        anchor: {
          show: true,
          showAbove: true,
          size: 18,
          itemStyle: {
            color: "#FAC858",
          },
        },
        pointer: {
          icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
          width: 8,
          length: "80%",
          offsetCenter: [0, "8%"],
        },
        progress: {
          show: true,
          overlap: true,
          roundCap: true,
        },
        axisLine: {
          roundCap: true,
        },
        data: gaugeData,
        title: {
          fontSize: 14,
        },
        detail: {
          width: 40,
          height: 14,
          fontSize: 14,
          color: "#fff",
          backgroundColor: "inherit",
          borderRadius: 3,
          formatter: "{value}%",
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
