<template>
  <div id="bar_ddzzt" width="300" height="350" class="canvas"></div>
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
  var chartDom = document.getElementById("bar_ddzzt") as HTMLDivElement;
  chartDom.removeAttribute("_echarts_instance_");
  let myChart = echarts.init(chartDom) as any;
  var option;
  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        emphasis: {
          focus: "series",
        },
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Email",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Search Engine",
        type: "bar",
        data: [862, 1018, 964, 1026, 1679, 1600, 1570],
        emphasis: {
          focus: "series",
        },
        markLine: {
          lineStyle: {
            type: "dashed",
          },
          data: [[{ type: "min" }, { type: "max" }]],
        },
      },
      {
        name: "Baidu",
        type: "bar",
        barWidth: 5,
        stack: "Search Engine",
        emphasis: {
          focus: "series",
        },
        data: [620, 732, 701, 734, 1090, 1130, 1120],
      },
      {
        name: "Google",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 290, 230, 220],
      },
      {
        name: "Bing",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series",
        },
        data: [60, 72, 71, 74, 190, 130, 110],
      },
      {
        name: "Others",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series",
        },
        data: [62, 82, 91, 84, 109, 110, 120],
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
