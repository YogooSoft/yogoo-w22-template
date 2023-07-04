<template>
  <div class="charts-ls-yc">
    <div id="cc5" class="canvas"></div>

    <div id="cc5_legend"></div>
    <div
      id="ccbt5_legend"
      @click="cbt_legend_click('ccbt5_legend', 'cc5_legend')"
      @mouseover="cbt_legend_over('ccbt5_legend')"
      @mouseleave="cbt_legend_leave('ccbt5_legend')"
    >
      更多
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, computed, ref, watch } from "vue";
import * as echarts from "echarts";
import { useRootSetting } from "@/hooks/setting/useRootSetting";

const { getIsCollapse } = useRootSetting();
const items = ref();
const items_es_id_ls = ref();

watch(getIsCollapse, (newQuestion, oldQuestion) => {
  setTimeout(() => {
    draw_LS_EVYC(items.value, items_es_id_ls.value);
  }, 300);
});

// 渲染logstash Events延迟 EVYC
function draw_LS_EVYC(data, es_id_ls) {
  const series_list: any[] = [];
  items.value = data;
  items_es_id_ls.value = es_id_ls;
  for (let i = 0; i < data.length; i++) {
    if (es_id_ls.includes(data[i].es_cluster)) {
      if (data[i].logstash_nodes.length === 0) {
        continue;
      }
      let d = [];
      d = data[i].event_latency;
      let t = [];
      t = data[i].logstash_nodes[0].time_format;
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
        name: data[i].es_cluster,
        type: "line",
        stack: "z1",
        symbolSize: 3, //拐点大小
        data: arr,
      };

      series_list.push(series_json);
    } else {
    }
  }

  let chartDom = document.getElementById("cc5") as HTMLDivElement;
  let myChart_cc5 = echarts.getInstanceByDom(chartDom) as any;
  if (myChart_cc5) {
    echarts.dispose(myChart_cc5);
    myChart_cc5 = null;
  }
  chartDom.removeAttribute("_echarts_instance_");
  myChart_cc5 = echarts.init(chartDom);
  // console.log(arr);
  // 指定图表的配置项和数据
  var option = {
    tooltip: {
      // backgroundColor:'',//背景颜色透明
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    title: {
      text: "Events延迟（/s）",
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
          "&nbsp;&nbsp;&nbsp;&nbsp;</div>";
        res = res + res2;
      }
      // 获取目标容器
      let htmlObj = document.getElementById("cc5_legend") as HTMLDivElement;
      let htmlObj_bt = document.getElementById(
        "ccbt5_legend"
      ) as HTMLDivElement;

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
  option && myChart_cc5.setOption(option);
  myChart_cc5.group = "group_node_2";
  window.addEventListener("resize", () => myChart_cc5.resize());
  // window.onresize = function () {
  //     myChart_cc5.resize()
  // };
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
function cbt_legend_leave(cbt_legend) {
  let htmlObj = document.getElementById(cbt_legend) as HTMLDivElement;
  htmlObj.style.color = "#909399";
}
// 暴露方法
defineExpose({
  draw_LS_EVYC,
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

#cc5_legend {
  width: 100%;
  display: inline-block;
  font-size: 10px;
  text-align: left;
  float: left;
}

#ccbt5_legend {
  width: 100%;
  display: inline-block;
  font-size: 10px;
  text-align: center;
  float: left;
  cursor: pointer;
  color: #909399;
}
</style>
