<template>
  <page-wrapper title="" content="">
    <div class="view-home">
      <!-- Elasticsearch集群 -->
      <el-row :gutter="15">
        <el-col :span="17">
          <div class="card">
            <overview-elasticsearch
              ref="OverviewElasticsearch"
            ></overview-elasticsearch>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="card">
            <div class="card__header">
              <span class="value">巡检概览</span>
            </div>
            <div class="card__container" style="height: initial">
              <el-table
                :data="alert_list"
                ref="table"
                :border="false"
                :show-header="false"
                style="width: 100%; height: 70px"
                :cell-style="{ padding: '0' }"
                :row-style="{ height: '0' }"
                :header-cell-style="{ color: '#303133' }"
              >
                <el-table-column prop="key" label=""></el-table-column>
                <el-table-column prop="doc_count" label=""></el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- Logstash实例 -->
      <el-row :gutter="15">
        <el-col :span="17">
          <div class="card">
            <overview-logstash ref="OverviewLogstash"></overview-logstash>
          </div>
        </el-col>
      </el-row>
      <!-- Beats采集器 -->
      <el-row :gutter="15">
        <el-col :span="17">
          <div class="card">
            <overview-beats ref="OverviewBeats"></overview-beats>
          </div>
        </el-col>
      </el-row>
      <!-- 关键指标 -->
      <el-row :gutter="15">
        <el-col :span="17">
          <div class="card">
            <!--  使用卡片插件-->
            <div class="card__header">
              <svg-icon
                icon-name="DataLine"
                style="font-size: 16px; margin-right: 5px"
                element-icons="true"
              />
              <span class="value">关键指标</span>
            </div>

            <div class="card__container" style="height: auto">
              <div class="model_item_box_card_content">
                <div class="model_2_left_top" @click="ES_zb_show_change()">
                  <span class="lable1">
                    Elasticsearch集群
                    <svg-icon
                      icon-name="CaretRight"
                      v-if="Elasticsearch_zb_show === false"
                      element-icons="true"
                    />
                    <svg-icon
                      icon-name="CaretBottom"
                      v-if="Elasticsearch_zb_show === true"
                      element-icons="true"
                    />
                  </span>
                </div>
                <div class="search" v-if="Elasticsearch_zb_show === true">
                  <div class="searchTitle">指标:</div>
                  <el-select
                    v-model="io_charts_name"
                    @change="charts_search(1)"
                    multiple
                    size="small"
                    collapse-tags
                    collapse-tags-tooltip
                    clearable
                    style="width: 180px"
                    placeholder="请选择指标"
                  >
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>

                  <div class="searchTitle">集群:</div>
                  <el-select
                    v-model="es_id"
                    @change="charts_search(1)"
                    placeholder="选择ES集群"
                    clearable
                    multiple
                    size="small"
                    collapse-tags
                    collapse-tags-tooltip
                    style="width: 180px"
                  >
                    <el-option
                      v-for="item in es_ids"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>

                  <div class="searchTitle">时间区间:</div>
                  <el-select
                    v-model="datetime_value"
                    @change="charts_search(2)"
                    placeholder="请选择时间"
                    clearable
                    size="small"
                    style="width: 160px"
                  >
                    <el-option
                      v-for="item in datetime_list"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="charts_box" v-if="Elasticsearch_zb_show === true">
                  <div class="echart_box_s" v-if="draw_CXSL_show === true">
                    <charts-es-cxsl ref="ChartsEsCxsl"></charts-es-cxsl>
                  </div>

                  <div class="echart_box_s" v-if="draw_XRSL_show === true">
                    <charts-es-xrsl ref="ChartsEsXrsl"></charts-es-xrsl>
                  </div>
                </div>
              </div>
              <br />
              <div class="model_item_box_card_content">
                <div class="model_2_left_top" @click="LS_zb_show_change()">
                  <span class="lable1">
                    logstash实时监控
                    <svg-icon
                      icon-name="CaretRight"
                      v-if="Elasticsearch_zb_ls_show === false"
                      element-icons="true"
                    />
                    <svg-icon
                      icon-name="CaretBottom"
                      v-if="Elasticsearch_zb_ls_show === true"
                      element-icons="true"
                    />
                  </span>
                </div>
                <div class="search" v-if="Elasticsearch_zb_ls_show === true">
                  <div class="searchTitle">指标:</div>
                  <el-select
                    v-model="LS_charts_name"
                    @change="LS_charts_search(1)"
                    multiple
                    collapse-tags
                    clearable
                    size="small"
                    collapse-tags-tooltip
                    style="width: 250px"
                    placeholder="请选择图表"
                  >
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>

                  <div class="searchTitle">集群:</div>
                  <el-select
                    v-model="es_id_ls"
                    @change="LS_charts_search(1)"
                    placeholder="选择ES集群"
                    clearable
                    multiple
                    size="small"
                    collapse-tags
                    collapse-tags-tooltip
                    style="width: 180px"
                  >
                    <el-option
                      v-for="item in es_ids"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>

                  <div class="searchTitle">时间区间:</div>
                  <el-select
                    v-model="datetime_value2"
                    @change="LS_charts_search(2)"
                    placeholder="请选择时间"
                    clearable
                    size="small"
                    style="width: 160px"
                  >
                    <el-option
                      v-for="item in datetime_list"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div
                  class="charts_box"
                  style="width: 100%"
                  v-if="Elasticsearch_zb_ls_show === true"
                >
                  <div class="echart_box_s" v-if="draw_LS_EVJSSL_show === true">
                    <charts-ls-jssl ref="ChartsLsJssl"></charts-ls-jssl>
                  </div>

                  <div class="echart_box_s" v-if="draw_LS_EVFSSL_show === true">
                    <charts-ls-fssl ref="ChartsLsFssl"></charts-ls-fssl>
                  </div>

                  <div class="echart_box_s" v-if="draw_LS_EVYC_show === true">
                    <charts-ls-yc ref="ChartsLsYc"></charts-ls-yc>
                  </div>

                  <div class="echart_box_s" v-if="draw_LS_CPUSYL_show === true">
                    <charts-ls-cpu ref="ChartsLsCpu"></charts-ls-cpu>
                  </div>

                  <div
                    class="echart_box_s"
                    v-if="draw_LS_JVMNCSYL_show === true"
                  >
                    <charts-ls-jvm ref="ChartsLsJvm"></charts-ls-jvm>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="model_item_box_card_top_title"></div>
        </el-col>
      </el-row>
    </div>
  </page-wrapper>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";

import OverviewElasticsearch from "./components/overview-elasticsearch.vue";
import OverviewLogstash from "./components/overview-logstash.vue";
import OverviewBeats from "./components/overview-beats.vue";

import ChartsEsCxsl from "./components/charts-es-cxsl.vue";
import ChartsEsXrsl from "./components/charts-es-xrsl.vue";
import ChartsLsCpu from "./components/charts-ls-Cpu.vue";
import ChartsLsFssl from "./components/charts-ls-fssl.vue";
import ChartsLsJssl from "./components/charts-ls-jssl.vue";
import ChartsLsJvm from "./components/charts-ls-Jvm.vue";
import ChartsLsYc from "./components/charts-ls-yc.vue";

import { useRootSetting } from "@/hooks/setting/useRootSetting";
const { getIsCollapse } = useRootSetting();

const isCollapse = getIsCollapse.value;

import {
  GetESIDData,
  GetESIOChartsData,
  GETIOLogstashData,
} from "@/api/xocData";

export default defineComponent({
  components: {
    // Elasticsearch集群概要信息组件
    OverviewElasticsearch,
    // Logstash实例概要信息组件
    OverviewLogstash,
    // Beats采集器概要信息组件
    OverviewBeats,
    // Elasticsearch集群 查询速率图表展示组件
    ChartsEsCxsl,
    // Elasticsearch集群 写入速率图表展示组件
    ChartsEsXrsl,
    //logstash实例 CPU图表展示组件
    ChartsLsCpu,
    //logstash实例 发送速率图表展示组件
    ChartsLsFssl,
    //logstash实例 JVM图表展示组件
    ChartsLsJvm,
    //logstash实例 延迟图表展示组件
    ChartsLsYc,
    //logstash实例 接收速率展示组件
    ChartsLsJssl,
    PageWrapper,
  },
  data() {
    return {
      // 控制Elasticsearch集群 图表区域的显示与隐藏 标志
      Elasticsearch_zb_show: true,
      // 控制logstash实时监控 图表区域的显示与隐藏 标志
      Elasticsearch_zb_ls_show: true,
      // 控制Elasticsearch集群 图表默认选项
      io_charts_name: ["查询速率", "写入速率"],
      // 选择的ES集群
      es_id: [] as any[],
      // 可选择的ES集群列表
      es_id_ls: [] as any[],
      // 可选择的ES集群列表
      es_ids: [] as any[],
      // 关键指标 默认选择的时间
      datetime_value: "now-1d",
      datetime_value2: "now-1d",
      // 关键指标 可选择的时间列表
      datetime_list: [
        {
          value: "now-1d",
          label: "近1天",
        },
        {
          value: "now-3d",
          label: "近3天",
        },
        {
          value: "now-7d",
          label: "近1周",
        },
      ],
      // 关键指标 Elasticsearch集群图表选项
      options1: [
        {
          value: "查询速率",
          label: "查询速率",
        },
        {
          value: "写入速率",
          label: "写入速率",
        },
        {
          value: "CPU使用率",
          label: "CPU使用率",
        },
        {
          value: "JVM使用率",
          label: "JVM使用率",
        },
        {
          value: "硬盘存储使用率",
          label: "硬盘存储使用率",
        },
        {
          value: "1分钟负载",
          label: "1分钟负载",
        },
      ],
      // ES图表数据
      es_iocharts_data: "",
      logstash_iocharts_data: "",
      logstash_overview_data: "",
      es_hardware_charts: "",

      // 关键指标 logstash实时监控图表选项
      options2: [
        {
          value: "CPU使用率",
          label: "CPU使用率",
        },
        {
          value: "JVM内存使用率",
          label: "JVM内存使用率",
        },
        {
          value: "Events接收速率",
          label: "Events接收速率",
        },
        {
          value: "Events发送速率",
          label: "Events发送速率",
        },
      ],
      //  logstash实时监控图表默认选项
      LS_charts_name: ["Events接收速率", "Events发送速率"],

      // 控制图表显示或隐藏
      draw_CXSL_show: false,
      draw_XRSL_show: false,
      draw_CPUSYL_show: false,
      draw_NCSYL_show: false,
      draw_JVMSYL_show: false,
      draw_YPCCSYL_show: false,
      draw_YFZFZ_show: false,

      draw_LS_CPUSYL_show: false,
      draw_LS_JVMNCSYL_show: false,
      draw_LS_CPSYL_show: false,
      draw_LS_EVJSSL_show: false,
      draw_LS_EVFSSL_show: false,
      draw_LS_EVYC_show: false,
      // 巡检概览数据
      alert_list: "", //报警次数
    };
  },
  created() {},

  watch: {
    // 侦听变量是否发生变化
    isCollapse: {
      handler(newValue, oldValue) {
        // 调用上级路由中的 router-view  配置的 getTeamInfo 对应的函数，传递新值
        alert(1);
      },
      // true：设置侦听json深层k:v值变化
      deep: true,
      // immediate: true,
    },
  },

  // watch() {},

  // watch(width, (nVal, oVal) => {
  // // 侧边栏展开/折叠动画间隔0.3s，使用动画解决侧边栏展开/折叠resize不生效
  //   useAnimation(300, nVal, oVal, () => {

  //   });
  // });

  methods: {
    // 控制关键指标-Elasticsearch集群内容收起/展开
    ES_zb_show_change() {
      if (this.Elasticsearch_zb_show === true) {
        this.Elasticsearch_zb_show = false;
      } else {
        this.Elasticsearch_zb_show = true;
        this.charts_search(1);
      }
    },
    // Elasticsearch集群图表数据查询、控制是否展示
    charts_search(option_name) {
      // option_name 1:重新调用接口 2：不重新调用接口
      // 加载echarts图表div
      if (this.io_charts_name.includes("查询速率")) {
        this.draw_CXSL_show = true;
      } else {
        this.draw_CXSL_show = false;
      }
      if (this.io_charts_name.includes("写入速率")) {
        this.draw_XRSL_show = true;
      } else {
        this.draw_XRSL_show = false;
      }

      // 加载数据
      if (option_name === 2) {
        // 获取charts基础数据 并加载
        this.get_charts_data();
      } else {
        // 重新加载不调用接口
        const sleep = (time) => {
          return new Promise((resolve) => setTimeout(resolve, time));
        };
        sleep(500).then(() => {
          this.draw_line_es();
        });
      }
    },

    //Elasticsearch集群 图表渲染
    draw_line_es() {
      // 画图
      if (this.io_charts_name.includes("查询速率")) {
        this.draw_CXSL_show = true;
        (this.$refs["ChartsEsCxsl"] as any).draw_CXSL(this.es_iocharts_data);
      } else {
        this.draw_CXSL_show = false;
      }
      if (this.io_charts_name.includes("写入速率")) {
        this.draw_XRSL_show = true;
        (this.$refs["ChartsEsXrsl"] as any).draw_XRSL(this.es_iocharts_data);
      } else {
        this.draw_XRSL_show = false;
      }
    },
    // logstash实时监控图表数据查询、控制是否展示
    LS_charts_search(option_name) {
      // 画图
      if (this.LS_charts_name.includes("CPU使用率")) {
        this.draw_LS_CPUSYL_show = true;
      } else {
        this.draw_LS_CPUSYL_show = false;
      }
      if (this.LS_charts_name.includes("JVM内存使用率")) {
        this.draw_LS_JVMNCSYL_show = true;
      } else {
        this.draw_LS_JVMNCSYL_show = false;
      }
      if (this.LS_charts_name.includes("Events接收速率")) {
        this.draw_LS_EVJSSL_show = true;
      } else {
        this.draw_LS_EVJSSL_show = false;
      }
      if (this.LS_charts_name.includes("Events发送速率")) {
        this.draw_LS_EVFSSL_show = true;
      } else {
        this.draw_LS_EVFSSL_show = false;
      }
      if (this.LS_charts_name.includes("Events延迟")) {
        this.draw_LS_EVYC_show = true;
      } else {
        this.draw_LS_EVYC_show = false;
      }

      // 加载数据
      if (option_name === 2) {
        // 获取charts基础数据 并加载
        this.get_ls_charts_data();
        // this.get_ls_charts_data_2();
      } else {
        // 重新加载不调用接口
        const sleep = (time) => {
          return new Promise((resolve) => setTimeout(resolve, time));
        };
        sleep(500).then(() => {
          this.draw_line_ls();
        });
      }
    },

    //Elasticsearch集群 图表渲染
    draw_line_ls() {
      // 画图
      if (this.LS_charts_name.includes("CPU使用率")) {
        this.draw_LS_CPUSYL_show = true;
        (this.$refs["ChartsLsCpu"] as any).draw_LS_CPUSYL(
          this.logstash_iocharts_data,
          this.es_id_ls
        );
      } else {
        this.draw_LS_CPUSYL_show = false;
      }
      if (this.LS_charts_name.includes("JVM内存使用率")) {
        this.draw_LS_JVMNCSYL_show = true;
        (this.$refs["ChartsLsJvm"] as any).draw_LS_JVMNCSYL(
          this.logstash_iocharts_data,
          this.es_id_ls
        );
      } else {
        this.draw_LS_JVMNCSYL_show = false;
      }
      if (this.LS_charts_name.includes("Events接收速率")) {
        this.draw_LS_EVJSSL_show = true;
        // this.draw_LS_EVJSSL(this.logstash_iocharts_data)
        //
        if (
          this.draw_LS_CPUSYL_show === true ||
          this.draw_LS_JVMNCSYL_show === true
        ) {
        } else {
          (this.$refs["ChartsLsJssl"] as any).draw_LS_EVJSSL(
            this.logstash_iocharts_data,
            this.es_id_ls
          );
        }
      } else {
        this.draw_LS_EVJSSL_show = false;
      }
      if (this.LS_charts_name.includes("Events发送速率")) {
        this.draw_LS_EVFSSL_show = true;
        // this.draw_LS_EVFSSL(this.logstash_iocharts_data)
        if (
          this.draw_LS_CPUSYL_show === true ||
          this.draw_LS_JVMNCSYL_show === true
        ) {
        } else {
          (this.$refs["ChartsLsFssl"] as any).draw_LS_EVFSSL(
            this.logstash_iocharts_data,
            this.es_id_ls
          );
        }
      } else {
        this.draw_LS_EVFSSL_show = false;
      }
      if (this.LS_charts_name.includes("Events延迟")) {
        this.draw_LS_EVYC_show = true;
        // this.draw_LS_EVYC(this.logstash_iocharts_data)
        if (
          this.draw_LS_CPUSYL_show === true ||
          this.draw_LS_JVMNCSYL_show === true
        ) {
        } else {
          (this.$refs["ChartsLsYc"] as any).draw_LS_EVYC(
            this.logstash_iocharts_data,
            this.es_id_ls
          );
        }
      } else {
        this.draw_LS_EVYC_show = false;
      }
    },

    // 获取Elasticsearch集群charts图表数据
    get_charts_data() {
      GetESIOChartsData("userid").then((res: any) => {
        console.log(res.data.data);
        this.es_iocharts_data = res.data.data;
        // 画图
        if (this.io_charts_name.includes("查询速率")) {
          this.draw_CXSL_show = true;
          (this.$refs["ChartsEsCxsl"] as any).draw_CXSL(this.es_iocharts_data);
        } else {
          this.draw_CXSL_show = false;
        }
        if (this.io_charts_name.includes("写入速率")) {
          this.draw_XRSL_show = true;

          (this.$refs["ChartsEsXrsl"] as any).draw_XRSL(this.es_iocharts_data);
        } else {
          this.draw_XRSL_show = false;
        }
      });
    },

    // 下拉框ES_id数据
    GetESIDData() {
      GetESIDData("userid").then((res: any) => {
        console.log(res.data.data);
        let function_ids = res.data.data;
        const arr: any[] = [];
        for (let i = 0; i < function_ids.length; i++) {
          let obj = {
            value: "",
            label: "",
          };
          obj.value = function_ids[i]["name"];
          obj.label = function_ids[i]["name"];
          arr.push(obj);
        }
        this.es_ids = arr;
        this.es_id = [this.es_ids[0].value];
        this.es_id_ls = [this.es_ids[0].value];

        (this.$refs["OverviewElasticsearch"] as any).GetESInfoData_func(
          "userid"
        );
        (this.$refs["OverviewLogstash"] as any).GetLogstashInfoData_func(
          "userid"
        );
        (this.$refs["OverviewBeats"] as any).GetBeatInfoData_func("userid");
        this.charts_search(2);
        this.LS_charts_search(2);
      });
    },

    // 控制关键指标-logstash实时监控内容收起/展开
    LS_zb_show_change() {
      if (this.Elasticsearch_zb_ls_show === true) {
        this.Elasticsearch_zb_ls_show = false;
      } else {
        this.Elasticsearch_zb_ls_show = true;
        this.LS_charts_search(1);
      }
    },

    // 获取logstash实时监控charts基础数据
    get_ls_charts_data() {
      GETIOLogstashData("userid").then((res: any) => {
        console.log(res.data.data);
        this.logstash_iocharts_data = res.data.data;
        // 画图
        if (this.LS_charts_name.includes("CPU使用率")) {
          this.draw_LS_CPUSYL_show = true;
          (this.$refs["ChartsLsCpu"] as any).draw_LS_CPUSYL(
            this.logstash_iocharts_data,
            this.es_id_ls
          );
        } else {
          this.draw_LS_CPUSYL_show = false;
        }
        if (this.LS_charts_name.includes("JVM内存使用率")) {
          this.draw_LS_JVMNCSYL_show = true;
          (this.$refs["ChartsLsJvm"] as any).draw_LS_JVMNCSYL(
            this.logstash_iocharts_data,
            this.es_id_ls
          );
        } else {
          this.draw_LS_JVMNCSYL_show = false;
        }
        if (this.LS_charts_name.includes("Events接收速率")) {
          this.draw_LS_EVJSSL_show = true;
          if (
            this.draw_LS_CPUSYL_show === true ||
            this.draw_LS_JVMNCSYL_show === true
          ) {
          } else {
            (this.$refs["ChartsLsJssl"] as any).draw_LS_EVJSSL(
              this.logstash_iocharts_data,
              this.es_id_ls
            );
          }
        } else {
          this.draw_LS_EVJSSL_show = false;
        }
        if (this.LS_charts_name.includes("Events发送速率")) {
          this.draw_LS_EVFSSL_show = true;
          // this.draw_LS_EVFSSL(this.logstash_iocharts_data)
          if (
            this.draw_LS_CPUSYL_show === true ||
            this.draw_LS_JVMNCSYL_show === true
          ) {
          } else {
            (this.$refs["ChartsLsFssl"] as any).draw_LS_EVFSSL(
              this.logstash_iocharts_data,
              this.es_id_ls
            );
          }
        } else {
          this.draw_LS_EVFSSL_show = false;
        }
        if (this.LS_charts_name.includes("Events延迟")) {
          this.draw_LS_EVYC_show = true;
          // this.draw_LS_EVYC(this.logstash_iocharts_data)
          if (
            this.draw_LS_CPUSYL_show === true ||
            this.draw_LS_JVMNCSYL_show === true
          ) {
          } else {
            (this.$refs["ChartsLsYc"] as any).draw_LS_EVYC(
              this.logstash_iocharts_data,
              this.es_id_ls
            );
          }
        } else {
          this.draw_LS_EVYC_show = false;
        }

        console.log("===", this.logstash_iocharts_data);
      });
    },
  },
  mounted() {
    //获取 Elasticsearch集群概览数据
    (this.$refs["OverviewElasticsearch"] as any).GetESInfoData_func("userid");
    //获取Logstash实例 概览数据
    (this.$refs["OverviewLogstash"] as any).GetLogstashInfoData_func("userid");
    // 获取Beats采集器概览数据
    (this.$refs["OverviewBeats"] as any).GetBeatInfoData_func("userid");

    // 实现图表组控制
    echarts.connect("group_node_1");
    echarts.connect("group_node_2");

    // 获取ES集群列表
    this.GetESIDData();
    // 获取概述图表数据
    // this.get_charts_data();
  },
});
</script>

<style lang="less" scoped>
.echart_box_s {
  width: 49%;
  display: inline-block;
  float: left;
}

.model_item_box_card_top_title {
  display: inline-block;
  font-size: 16px;
  color: #606266;
}

.search {
  background-color: #f0f2f5;
  // color: rgba(48, 49, 51, 1);
  // margin-bottom: 10px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  height: 40px;

  /*padding-left: 5px;*/
  .searchTitle {
    padding: 5px 5px 5px 5px;
    // min-width: 5.5vh;
    font-size: 12px;
  }
}

.charts_box {
  margin-top: 0px;
}

.model_item_box_card_content {
  overflow: hidden;
  margin-top: 3px;
}

.view-home {
  .card {
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 12px;
    letter-spacing: 0.5px;
    // color: #000;

    &__header {
      display: flex;
      align-items: center;
      height: 34px;
      padding: 0 10px;

      .label {
        font-size: 12px;
      }

      .value {
        font-size: 14px;
        // font-weight: bold;
        /*margin-left: 10px;*/
      }
    }

    &__container {
      padding: 0 10px;
      height: 50px;
    }

    &__footer {
      display: flex;
      align-items: center;
      height: 50px;
      border-top: 1px solid #f7f7f7;
      font-size: 12px;
      margin: 0 5px;
      padding: 0 15px;
      box-sizing: border-box;

      .label {
        margin-right: 10px;
      }

      .value {
        font-size: 13px;
      }
    }
  }
}

.card__container {
  .model_item_box_card_content {
    overflow: hidden;
  }

  .model_2_left_top {
    width: 20%;
    display: block;
    margin-bottom: 10px;

    .lable1 {
      font-size: 13px;
      // font-weight: bold;
      display: block;
      // color: #303133;
    }
  }
}

//用于消除el-table最底部边线
:deep(.el-table__inner-wrapper::before) {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  z-index: 3;
}
</style>
