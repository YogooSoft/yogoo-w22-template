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
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  legend: {
    right: 70,
    left: 160,
    data: [
      "TA指令",
      "场内及银行间转账指令",
      "费用支付指令(托管户)",
      "其他指令",
      "投资指令",
    ],
  },
  color: ["#005C8F", "#147CB7", "#34A4E4", "#7BD6F5", "#DADEE4"],
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["20%", "35%"],
      center: ["20%", "18%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "right",
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
        { value: 100, name: "TA指令" },
        { value: 100, name: "场内及银行间转账指令" },
        { value: 100, name: "费用支付指令(托管户)" },
        { value: 100, name: "其他指令" },
        { value: 100, name: "投资指令" },
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
