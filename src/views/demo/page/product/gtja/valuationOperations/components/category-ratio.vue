<template>
  <div class="category-ratio">
    <div class="category-ratio__container">
      <v-chart :option="chartOption" autoresize />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const chartOption = reactive({
  title: {
    text: "今日开放日",
    left: "left",
    top: 20,
    textStyle: {
      color: "#909399",
      fontSize: "13px",
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  legend: {
    bottom: 160,
    left: "center",
    data: ["申购", "赎回"],
  },
  color: ["#409eff", "#909399"],
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["35%", "50%"],
      center: ["50%", "30%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "30",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 100, name: "申购" },
        { value: 100, name: "赎回" },
      ],
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 4,
      },
      roundCap: 1,
    },
  ],
});
</script>

<style lang="less" scoped>
.category-ratio {
  &__header {
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 15px;
    font-weight: bold;
    padding: 0 20px;
  }

  &__container {
    height: 395px;
    padding: 0 20px;
    box-sizing: border-box;

    .echarts {
      width: 100%;
    }
  }
}
</style>
