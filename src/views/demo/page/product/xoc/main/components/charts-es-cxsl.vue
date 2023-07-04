<template>
  <div class="charts-es-cxsl">
    <div id="c1" class="canvas"></div>
    <div id="c1_legend"></div>
    <div
      id="cbt1_legend"
      @click="cbt_legend_click('cbt1_legend', 'c1_legend')"
      @mouseover="cbt_legend_over('cbt1_legend')"
      @mouseleave="cbt_legend_leave('cbt1_legend')"
    >
      更多
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, computed, ref, watchEffect, watch } from "vue";
import * as echarts from "echarts";
import { useRootSetting } from "@/hooks/setting/useRootSetting";

const { getIsCollapse } = useRootSetting();
const items = ref();

watch(getIsCollapse, (newQuestion, oldQuestion) => {
  setTimeout(() => {
    draw_CXSL(items.value);
  }, 300);
});

// window.addEventListener("resize", () => myChart1.resize());

// 渲染查询速率图

function draw_CXSL(data) {
  const series_list: any[] = [];
  items.value = data;
  for (let i = 0; i < data.length; i++) {
    if (JSON.stringify(data[i].data) === "{}") {
      continue;
    }
    let d = [];
    d = data[i].data.search_rates;
    let t = [];
    t = data[i].data.time_format;
    const arr: any[] = [];
    t.map((v, index) => {
      let atte = [];
      atte.push(v, d[index]);
      arr.push({
        name: v,
        value: atte,
      });
    });

    var series_json = {
      name: data[i].name,
      type: "line",
      stack: "z1",
      symbolSize: 3, //拐点大小
      data: arr,
    };

    series_list.push(series_json);
  }
  let chartDom = document.getElementById("c1") as HTMLDivElement;
  let myChart1 = echarts.getInstanceByDom(chartDom) as any;
  if (myChart1) {
    echarts.dispose(myChart1);
    myChart1 = null;
  }

  chartDom.removeAttribute("_echarts_instance_");

  myChart1 = echarts.init(chartDom);
  // 指定图表的配置项和数据
  var option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    title: {
      text: "查询速率 （/s）",
      padding: [15, 0, 0, 10],
      textStyle: {
        fontSize: "12px",
        fontWeight: "bold",
        color: "#606266",
      },
    },
    formatter: function (params) {
      let res = "",
        sum = 0;
      for (let i = 0; i < params.length; i++) {
        let series = params[i];
        sum += Number(series.value[1]);
        var res2 = "";
        res2 =
          "<div style='display: inline-block'>" +
          series.marker +
          series.seriesName +
          ":" +
          sum +
          "/s" +
          "</div>&nbsp;&nbsp;&nbsp;&nbsp;";
        res = res + res2;
      }
      // 获取目标容器
      let htmlObj = document.getElementById("c1_legend") as HTMLDivElement;
      let htmlObj_bt = document.getElementById("cbt1_legend") as HTMLDivElement;

      if (htmlObj_bt.innerText === "更多") {
        htmlObj.style.maxHeight = "66px";
        htmlObj.style.overflow = "hidden";
      }

      if (res) {
        htmlObj.innerHTML = res;
      } else {
        htmlObj.innerHTML = "<div>&nbsp;&nbsp;</div>&nbsp;&nbsp;&nbsp;&nbsp;";
      }

      return null;
    },
    grid: {
      x: 45,
      y: 55,
      x2: 25,
      y2: 45,
      borderWidth: 1,
      bottom: "20px",
    },
    toolbox: {
      feature: {},
    },

    xAxis: {
      axisLabel: {
        formatter: function (value, index) {
          const date: any = new Date(value);
          var hour = date.getHours();
          var minutes = date.getMinutes();
          var date_num = date.getDate();
          if (hour < 10) {
            hour = "0" + hour;
          }
          if (minutes < 10) {
            minutes = "0" + minutes;
          }

          return hour + ":" + minutes;
        },
        color: "#303133",
      },
      axisTick: {
        show: false, //不显示坐标轴刻度线
      },
      axisLine: {
        show: false, //不显示坐标轴线
      },
      maxInterval: 3600 * 24 * 1000,
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(235, 238, 245, 1)", //x轴刻度线颜色
          width: 1,
        },
      },
      type: "category",
      boundaryGap: false,
    },
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "rgba(144, 147, 153, 1)",
          show: true,
        },
        axisLine: {
          show: true, //显示坐标轴线
          lineStyle: {
            color: "rgba(235, 238, 245, 1)",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(235, 238, 245, 1)", //x轴刻度线颜色
            width: 1,
          },
        },
      },
    ],
    series: series_list,
  };
  // 使用刚指定的配置项和数据显示图表。
  option && myChart1.setOption(option);
  myChart1.group = "group_node_1";
  window.addEventListener("resize", () => myChart1.resize());
  // window.onresize = function () {
  //     myChart1.resize()
  // };

  // myChart1.on('click', function () {
  //     this.$router.push("/stack_manage/ES/ilm/0");
  // });
}

// 点击更多
function cbt_legend_click(cbt_legend, c_legend) {
  let htmlObj = document.getElementById(cbt_legend) as HTMLDivElement;
  let htmlObj2 = document.getElementById(c_legend) as HTMLDivElement;
  if (htmlObj.innerText === "更多") {
    htmlObj.innerText = "收起";
    // htmlObj.innerHTML = "<a href=\"javascript:void(0)\">收起</a>";
    // 修改样式
    htmlObj2.style.height = "auto";
    htmlObj2.style.maxHeight = "unset";
    htmlObj2.style.overflow = "unsit";

    return 0;
  }
  if (htmlObj.innerText === "收起") {
    htmlObj.innerText = "更多";
    // htmlObj.innerHTML = "<a href=\"javascript:void(0)\">更多</a>";
    htmlObj2.style.maxHeight = "66px";
    htmlObj2.style.overflow = "hidden";
    return 0;
  }
}

// 鼠标移动到“更多”的颜色变化
function cbt_legend_over(cbt_legend) {
  let htmlObj = document.getElementById(cbt_legend) as HTMLDivElement;
  htmlObj.style.color = "#303133";
}
// 鼠标离开“更多”的颜色变化
function cbt_legend_leave(cbt_legend) {
  let htmlObj = document.getElementById(cbt_legend) as HTMLDivElement;
  htmlObj.style.color = "#909399";
}

// 暴露方法
defineExpose({
  draw_CXSL,
});
</script>

<style scoped lang="less">
.canvas {
  flex: 0 1 100%;
  height: 200px;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  width: 100%;
  display: inline-block;
}

#c1_legend {
  width: 100%;
  display: inline-block;
  font-size: 10px;
  text-align: left;
  float: left;
}

#cbt1_legend {
  width: 100%;
  display: inline-block;
  font-size: 10px;
  text-align: center;
  float: left;
  cursor: pointer;
  color: #606266;
}
</style>
