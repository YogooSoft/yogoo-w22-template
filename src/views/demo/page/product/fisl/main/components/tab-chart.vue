<template>
  <div class="tab-chart">
    <div class="tab-chart__header">
      <ul class="tab-chart__tab">
        <li class="active">公司余额</li>
        <li>单位：亿元</li>
      </ul>

      <span class="tab-chart__year">2023</span>
    </div>

    <div class="tab-chart__container">
      <v-chart :option="chartOption" autoresize />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const barWidth = 15;

const chartOption = reactive<any>({
  grid: {
    top: "20px",
    bottom: "30px",
    right: "10px",
    left: "30px",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: [],
    offset: 5,
    axisLine: {
      show: true,
    },
    axisTick: {
      show: true,
    },
    axisLabel: {
      color: "#909399",
    },
  },
  yAxis: {
    type: "value",
    offset: 20,
    splitLine: {
      show: false,
    },
    axisTick: {
      show: true,
    },
    axisLine: {
      show: true,
    },
    axisLabel: {
      color: "#909399",
    },
  },
  tooltip: {
    trigger: "axis",
    formatter: (comp: any) => {
      const [serie] = comp;

      return `${serie.seriesName}：${serie.value}`;
    },
    axisPointer: {
      show: true,
      status: "shadow",
      z: -1,
      shadowStyle: {
        color: "#E6F7FF",
      },
      type: "shadow",
    },
    extraCssText: "width:120px; white-space:pre-wrap",
  },
  series: [
    {
      barWidth,
      name: "公司余额",
      type: "bar",
      data: [],
      itemStyle: {
        color: "#4165d7",
      },
    },
    {
      type: "bar",
      barWidth,
      xAxisIndex: 0,
      barGap: "-100%",
      data: [],
      itemStyle: {
        color: "#f1f1f9",
      },
      zlevel: -1,
    },
  ],
});

chartOption.xAxis.data = new Array(12).fill(1).map((e, i) => i + 1 + "月");
chartOption.series[0].data = new Array(6)
  .fill(1)
  .map(() => parseInt(String((Math.random() / 10 + 1) * 158)));
chartOption.series[1].data = new Array(6).fill(200);
</script>

<style lang="less" scoped>
.tab-chart {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    padding: 6px 8px 6px 8px;

    ul {
      li {
        list-style: none;
        float: left;
        margin-right: 20px;
        font-size: 15px;
        color: #dbdbdb;
        cursor: pointer;

        &.active {
          color: #606266;
          font-weight: bold;
        }
      }
    }
  }

  &__year {
    font-size: 14px;
    position: relative;
    color: #606266;

    &::before {
      display: block;
      content: "";
      height: 8px;
      width: 8px;
      border-radius: 8px;
      background-color: #606266;
      position: absolute;
      left: -15px;
      top: 4px;
    }
  }

  &__container {
    height: 218px;
    padding: 0 8px;

    .echarts {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
