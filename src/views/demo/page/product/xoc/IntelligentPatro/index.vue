<template>
  <page-wrapper title="" content="">
    <div class="Intelligent_patro_info_list">
      <!-- 搜索栏 -->
      <div class="fix">
        <span class="lable">ES集群</span>
        <el-select
          style="min-width: 160px; width: 160px"
          v-model="values2"
          placeholder="请选择ES集群"
          filterable
          @change="change_es"
        >
          <el-option
            v-for="item in es_ids"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <span class="lable" style="margin-left: 10px">巡检项目</span>
        <el-select
          style="min-width: 120px"
          v-model="values3"
          placeholder="选择巡检项目"
          multiple
          collapse-tags
          collapse-tags-tooltip
          clearable
          @change="changeSelect"
        >
          <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
          <el-option
            v-for="item in items_ids"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-button
          v-if="XJ_show === true"
          type="primary"
          :icon="Refresh"
          class="button"
          @click="do_GETDiagnoseRun()"
        >
          巡检
        </el-button>
        <el-button
          v-if="XJ_show === false"
          type="danger"
          :icon="CircleClose"
          class="button"
          @click="do_GETDiagnoseCancelTask()"
        >
          取消巡检
        </el-button>

        <el-button class="button" :icon="RefreshRight" @click="removes()">
          重置
        </el-button>
      </div>

      <div class="fix">
        <span class="lable">自动巡检时间</span>
        <el-config-provider :locale="locale">
          <el-time-picker
            style="width: 100px"
            v-model="value_time"
            format="HH:mm"
            :picker-options="{
              selectableRange: '00:00 - 24:00',
            }"
            @change="change_time"
          ></el-time-picker>
        </el-config-provider>

        <span class="lable" style="margin-left: 10px">自动巡检</span>
        <el-switch
          v-model="values1"
          active-color="rgba(64, 158, 255, 1)"
          inactive-color="rgba(235, 238, 245, 1)"
          class="table-center"
          @change="change_diagnose_auto(1)"
        ></el-switch>
      </div>
    </div>
    <!-- 功能展示 -->

    <div class="reportBar">
      <el-row :gutter="10">
        <el-col :span="7">
          <div>
            <check-re ref="CheckRe"></check-re>
          </div>
        </el-col>
        <el-col :span="10">
          <div>
            <check-chart ref="CheckChart"></check-chart>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <check-day ref="CheckDay"></check-day>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="report">
      <el-card shadow="hover" :body-style="{ padding: '0px', height: '101%' }">
        <div class="model_item_box_card_top">
          <div class="model_item_box_card_top_title">
            <svg-icon icon-name="DataLine" element-icons="true" />
            <div class="model_item_box_card_top_title_text">&nbsp;巡检报告</div>
          </div>
        </div>
        <div class="model_item_box_card_bottom">
          <div class="model_item_box_card_bottom_left">
            <div class="model_item_box_card_bottom_left_title">
              集群巡检报告【{{ diagnose_type }}】
            </div>
            <div class="model_item_box_card_bottom_left_info">
              <div class="text_box">
                <span class="text_box_left" style="width: 70px">巡检时间</span>
                <span class="text_box_right" style="width: 150px">
                  {{ report_data["create_time"] }}
                </span>

                <span class="text_box_left" style="width: 55px">集群ID</span>
                <span class="text_box_right" style="padding-right: 10px">
                  {{ report_data["cluster_name"] }}
                </span>

                <span class="text_box_left" style="width: 70px">巡检个数</span>
                <span class="text_box_right" style="width: 50px">
                  {{ diagnose_count }}
                </span>
              </div>
              <div class="text_box">
                <span class="text_box_left" style="width: 70px">报告摘要</span>
                <span class="text_box_right" style="width: 85%; height: auto">
                  集群存在高风险巡检项&nbsp;
                  <span style="color: #f56c6c">
                    {{ report_data["high_risks"] }}
                  </span>
                  &nbsp;个， 低风险巡检项&nbsp;
                  <span style="color: #e7a442">
                    {{ report_data["low_risks"] }}
                  </span>
                  &nbsp;个，
                  {{ report_data["summary"] }}
                </span>
              </div>
            </div>

            <div class="model_item_box_card_bottom_left_content">
              <div
                class="model_item_box_card_bottom_left_content_title"
                @click="GFXXJX_show_change()"
              >
                <span class="model_item_box_card_bottom_left_content_icon">
                  <svg-icon
                    icon-name="CaretRight"
                    v-if="GFXXJX_show === false"
                    style="color: #606266"
                    element-icons="true"
                  />
                  <svg-icon
                    icon-name="CaretBottom"
                    v-if="GFXXJX_show === true"
                    style="color: #606266"
                    element-icons="true"
                  />
                  高风险巡检项目:
                  <span style="color: #f67c7c">
                    {{ report_data["high_risks"] }}
                  </span>
                </span>
              </div>
              <div
                class="model_item_box_card_bottom_left_content_info"
                v-if="GFXXJX_show === true"
              >
                <div
                  v-for="(risk_data, index) in report_data['risk_report'][
                    '高风险巡检项'
                  ]"
                >
                  <div class="text_box">
                    <span>
                      <svg-icon
                        icon-name="Warning"
                        style="color: #f67a7a"
                        element-icons="true"
                      />
                      {{ risk_data.item_name }}
                    </span>
                  </div>
                  <div class="bottom_left_content_info_text_box">
                    <span class="bottom_left_content_info_text_box_left">
                      巡检项说明
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-if="risk_data.result_explain == ''"
                    >
                      --
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-else
                    >
                      {{ risk_data.result_explain }}
                    </span>
                  </div>
                  <div class="bottom_left_content_info_text_box">
                    <span
                      class="bottom_left_content_info_text_box_left"
                      @click="risk_res_high_show(risk_data.table_show, index)"
                    >
                      巡检结果

                      <div
                        v-if="risk_data.has_table"
                        style="display: inline-block"
                      >
                        <i
                          v-if="risk_data.table_show == false"
                          class="el-icon-caret-right"
                          style="color: #606266"
                        ></i>
                        <i
                          v-if="risk_data.table_show == true"
                          class="el-icon-caret-top"
                          style="color: #606266"
                        ></i>
                      </div>
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-if="risk_data.check_result == ''"
                    >
                      --
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-else
                    >
                      {{ risk_data.check_result }}
                    </span>
                  </div>

                  <div
                    class="bottom_left_content_info_text_box"
                    v-if="risk_data.table_show == true"
                  >
                    <el-table
                      :data="risk_data.table_data.slice(0, 3)"
                      ref="table"
                      size="small"
                      :border="false"
                      max-height="250"
                      style="width: 100%; max-height: 250px"
                      :cell-style="{ padding: '0' }"
                      :row-style="{ height: '0' }"
                      :header-cell-style="{ color: '#606266', fontWeight: 400 }"
                    >
                      <template v-for="item in risk_data.headers">
                        <el-table-column
                          :label="item.label"
                          :prop="item.prop"
                          :width="item.width"
                        ></el-table-column>
                      </template>
                    </el-table>
                  </div>

                  <div class="bottom_left_content_info_text_box">
                    <span class="bottom_left_content_info_text_box_left">
                      巡检建议
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-if="risk_data.suggestion == ''"
                    >
                      --
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-else
                    >
                      {{ risk_data.suggestion }}
                    </span>
                  </div>
                </div>
              </div>

              <div
                class="model_item_box_card_bottom_left_content_title"
                @click="DFXXJX_show_change()"
              >
                <span class="model_item_box_card_bottom_left_content_icon">
                  <svg-icon
                    icon-name="CaretRight"
                    v-if="DFXXJX_show === false"
                    style="color: #606266"
                    element-icons="true"
                  />
                  <svg-icon
                    icon-name="CaretBottom"
                    v-if="DFXXJX_show === true"
                    style="color: #606266"
                    element-icons="true"
                  />

                  低风险巡检项目:

                  <span style="color: #e6a440">
                    {{ report_data["low_risks"] }}
                  </span>
                </span>
              </div>
              <div
                class="model_item_box_card_bottom_left_content_info"
                v-if="DFXXJX_show === true"
              >
                <div
                  v-for="(risk_data, index) in report_data['risk_report'][
                    '低风险巡检项'
                  ]"
                >
                  <div class="text_box">
                    <span>
                      <svg-icon
                        icon-name="Warning"
                        style="color: #e6a440"
                        element-icons="true"
                      />

                      {{ risk_data.item_name }}
                    </span>
                  </div>
                  <div class="bottom_left_content_info_text_box">
                    <span class="bottom_left_content_info_text_box_left">
                      巡检项说明
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-if="risk_data.result_explain == ''"
                    >
                      --
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-else
                    >
                      {{ risk_data.result_explain }}
                    </span>
                  </div>
                  <div class="bottom_left_content_info_text_box">
                    <span
                      class="bottom_left_content_info_text_box_left"
                      @click="risk_res_low_show(risk_data.table_show, index)"
                    >
                      巡检结果
                      <div
                        v-if="risk_data.has_table"
                        style="display: inline-block"
                      >
                        <i
                          v-if="risk_data.table_show == false"
                          class="el-icon-caret-right"
                          style="color: #606266"
                        ></i>
                        <i
                          v-if="risk_data.table_show == true"
                          class="el-icon-caret-top"
                          style="color: #606266"
                        ></i>
                      </div>
                    </span>

                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-if="risk_data.check_result == ''"
                    >
                      --
                    </span>

                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-else
                    >
                      {{ risk_data.check_result }}
                    </span>
                  </div>
                  <div
                    class="bottom_left_content_info_text_box"
                    v-if="risk_data.table_show == true"
                  >
                    <el-table
                      :data="risk_data.table_data.slice(0, 3)"
                      ref="table"
                      size="small"
                      :border="false"
                      max-height="250"
                      style="width: 100%; max-height: 250px"
                      :cell-style="{ padding: '0' }"
                      :row-style="{ height: '0' }"
                      :header-cell-style="{ color: '#606266', fontWeight: 400 }"
                    >
                      <template v-for="item in risk_data.headers">
                        <el-table-column
                          :label="item.label"
                          :prop="item.prop"
                          :width="item.width"
                        ></el-table-column>
                      </template>
                    </el-table>
                    <div
                      style="display: flex; margin-top: 10px"
                      v-if="risk_data.table_data.length > 3"
                    >
                      <!--                      <el-button @click="index_detail(risk_data,risk_data.item_name)">-->
                      <!--                        点击查看更多{{risk_data.table_data.length-3}}条记录-->
                      <!--                      </el-button>-->
                    </div>
                  </div>

                  <div class="bottom_left_content_info_text_box">
                    <span class="bottom_left_content_info_text_box_left">
                      巡检建议
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-if="risk_data.suggestion == ''"
                    >
                      --
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-else
                    >
                      {{ risk_data.suggestion }}
                    </span>
                  </div>
                </div>
              </div>

              <div
                class="model_item_box_card_bottom_left_content_title"
                @click="AQXJX_show_change()"
              >
                <span class="model_item_box_card_bottom_left_content_icon">
                  <svg-icon
                    icon-name="CaretRight"
                    v-if="AQXJX_show === false"
                    style="color: #606266"
                    element-icons="true"
                  />
                  <svg-icon
                    icon-name="CaretBottom"
                    v-if="AQXJX_show === true"
                    style="color: #606266"
                    element-icons="true"
                  />
                  安全巡检项目:

                  <span style="color: #68c23b">
                    {{ report_data["no_risks"] }}
                  </span>
                </span>
              </div>
              <div
                class="model_item_box_card_bottom_left_content_info"
                v-if="AQXJX_show === true"
              >
                <div
                  v-for="(risk_data, index) in report_data['risk_report'][
                    '安全巡检项'
                  ]"
                >
                  <div class="text_box">
                    <span>
                      <svg-icon
                        icon-name="Warning"
                        style="color: #68c23b"
                        element-icons="true"
                      />
                      {{ risk_data.item_name }}
                    </span>
                  </div>
                  <div class="bottom_left_content_info_text_box">
                    <span class="bottom_left_content_info_text_box_left">
                      巡检项说明
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-if="risk_data.result_explain == ''"
                    >
                      --
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-else
                    >
                      {{ risk_data.result_explain }}
                    </span>
                  </div>
                  <div class="bottom_left_content_info_text_box">
                    <span
                      class="bottom_left_content_info_text_box_left"
                      @click="risk_res_safe_show(risk_data.table_show, index)"
                    >
                      巡检结果
                      <div
                        v-if="risk_data.has_table"
                        style="display: inline-block"
                      >
                        <i
                          v-if="risk_data.table_show == false"
                          class="el-icon-caret-right"
                          style="color: #606266"
                        ></i>
                        <i
                          v-if="risk_data.table_show == true"
                          class="el-icon-caret-top"
                          style="color: #606266"
                        ></i>
                      </div>
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-if="risk_data.check_result == ''"
                    >
                      --
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-else
                    >
                      {{ risk_data.check_result }}
                    </span>
                  </div>
                  <div
                    class="bottom_left_content_info_text_box"
                    v-if="risk_data.table_show == true"
                  >
                    <el-table
                      :data="risk_data.table_data.slice(0, 3)"
                      ref="table"
                      size="small"
                      :border="false"
                      max-height="250"
                      style="width: 100%; max-height: 250px"
                      :cell-style="{ padding: '0' }"
                      :row-style="{ height: '0' }"
                      :header-cell-style="{ color: '#606266', fontWeight: 400 }"
                    >
                      <template v-for="item in risk_data.headers">
                        <el-table-column
                          :label="item.label"
                          :prop="item.prop"
                          :width="item.width"
                        ></el-table-column>
                      </template>
                    </el-table>
                  </div>

                  <div class="bottom_left_content_info_text_box">
                    <span class="bottom_left_content_info_text_box_left">
                      巡检建议
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-if="risk_data.suggestion == ''"
                    >
                      --
                    </span>
                    <span
                      class="bottom_left_content_info_text_box_right"
                      v-else
                    >
                      {{ risk_data.suggestion }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="model_item_box_card_bottom_right" @click="setHisDivStyle">
            <el-tree
              :data="hist_data"
              :props="defaultProps"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </div>
      </el-card>
    </div>
  </page-wrapper>
</template>
<script lang="ts">
import { defineComponent, computed, ref, unref } from "vue";
import { ElConfigProvider, ElMessage } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { PageWrapper } from "@/components/Page";
import CheckRe from "./components/check-re.vue";
import CheckChart from "./components/check-chart.vue";
import CheckDay from "./components/check-day.vue";

import { GetESIDData } from "@/api/xocData";
import {
  GETDiagnoseItems,
  GETDiagnoseRun,
  GETDiagnoseCancelTask,
  GETDiagnoseGetTask,
  GETDiagnoseSwitchAuto,
  GETDiagnoseAutoSettings,
  GETDiagnoseReport,
  GETDiagnoseHistoryRuntime,
  GETDiagnoseLast7d,
} from "@/api/xocData";
import * as echarts from "echarts";

import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  Eleme,
  Refresh,
  RefreshRight,
  DataLine,
  CircleClose,
} from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    CheckRe,
    CheckChart,
    CheckDay,
    PageWrapper,
  },

  data() {
    return {
      // 巡检项目全选
      checked: true,
      // 巡检状态检查次数记录
      num: 0,
      // 巡检状态轮询控制住
      timer: 0,
      // 中文控制
      locale: zhCn,
      // 自动巡检
      values1: false,
      // 选择的集群
      values2: "",
      // 选择的巡检项目
      values3: [] as any[],
      // 自动巡检时间
      value_time: new Date(2022, 11, 23, 19, 30),
      // 可选择的ES集群列表
      es_ids: [] as any[],
      // 可选择的巡检项目列表
      items_ids: [] as any[],
      // 近七天巡检结果列表
      last_7d_list: [],
      // 控制风险项目展示或隐藏
      GFXXJX_show: false,
      DFXXJX_show: false,
      AQXJX_show: false,
      // 控制巡检按钮显示或隐藏
      XJ_show: true,
      // 巡检任务id
      task_id: "",
      // 巡检报告结果
      report_data: {},
      // 巡检个数
      diagnose_count: "--",
      // 集群巡检报告类型 手动/自动
      diagnose_type: "--",
      // 历史巡检数据
      hist_data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  destroyed() {
    //离开页面是时销毁
    clearInterval(this.timer);
    this.timer = 0;
  },

  created() {
    //实现轮询
    this.timer = window.setInterval(() => {
      this.do_GETDiagnoseGetTask();
    }, 5000);
  },

  watch: {},
  methods: {
    // 控制巡检结果表格展开图表显示
    risk_res_low_show(show_status, index) {
      if (show_status) {
        this.report_data["risk_report"]["低风险巡检项"][index].table_show =
          false;
      } else {
        this.report_data["risk_report"]["低风险巡检项"][index].table_show =
          true;
      }
    },

    // 高风险项巡检结果展开/关闭
    risk_res_high_show(show_status, index) {
      if (show_status) {
        this.report_data["risk_report"]["高风险巡检项"][index].table_show =
          false;
      } else {
        this.report_data["risk_report"]["高风险巡检项"][index].table_show =
          true;
      }
    },

    // 安全项巡检结果展开/关闭
    risk_res_safe_show(show_status, index) {
      if (show_status) {
        this.report_data["risk_report"]["安全巡检项"][index].table_show = false;
      } else {
        this.report_data["risk_report"]["安全巡检项"][index].table_show = true;
      }
    },

    // 选择所有巡检项目
    selectAll() {
      this.values3 = [];
      if (this.checked) {
        this.items_ids.map((item: any) => {
          this.values3.push(item.value);
        });
      } else {
        this.values3 = [];
      }
    },
    // 巡检项目选择发生变动
    changeSelect(val) {
      if (val.length === this.items_ids.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },

    // 查询近7天巡检结果累计
    do_GETDiagnoseLast7d() {
      GETDiagnoseLast7d("userid").then(
        (res: any) => {
          // console.log("==do_GETDiagnoseLast7d===", res);
          if (res.meta.code == 0) {
            this.last_7d_list = res.data.data;
            (this.$refs["CheckDay"] as any).check_day_show(res.data.data);
          } else {
            ElMessage({
              showClose: true,
              message: res.data.meta.message,
              type: "warning",
            });
          }
        },
        (error) => {
          ElMessage({
            showClose: true,
            message: error,
            type: "warning",
          });
          console.log(error);
        }
      );
    },

    // 查询巡检历史时刻表
    do_GETDiagnoseHistoryRuntime() {
      GETDiagnoseHistoryRuntime("userid").then(
        (res: any) => {
          // console.log("==do_GETDiagnoseHistoryRuntime===", res);
          if (res.meta.code == 0) {
            this.hist_data = res.data.data;
          } else {
            ElMessage({
              showClose: true,
              message: res.data.meta.message,
              type: "warning",
            });
          }
        },
        (error) => {
          ElMessage({
            showClose: true,
            message: error,
            type: "warning",
          });
          console.log(error);
        }
      );
    },

    // 动态修改历史日期区域的高度
    setHisDivStyle() {
      var div_obj = document.getElementsByClassName(
        "model_item_box_card_bottom_right"
      )[0] as HTMLElement;
      var div_obj2 = document.getElementsByClassName(
        "model_item_box_card_bottom_left"
      )[0] as HTMLElement;

      // 获取 model_item_box_card_bottom_left 的高度
      div_obj.style.height = div_obj2.offsetHeight.toString() + "px";
    },
    // 获取巡检报告信息
    do_GETDiagnoseReport(report_time) {
      this.GFXXJX_show = false;
      this.DFXXJX_show = false;
      this.AQXJX_show = false;
      this.report_data = {};
      this.diagnose_count = "--";
      this.diagnose_type = "--";

      GETDiagnoseReport("userid").then(
        (res: any) => {
          if (res.meta.code == 0) {
            this.report_data = res.data.data;
            (this.$refs["CheckRe"] as any).check_re_show(this.report_data);
            this.diagnose_count =
              this.report_data["high_risks"] +
              this.report_data["no_risks"] +
              this.report_data["low_risks"];

            if (this.report_data["auto"] == 0) {
              this.diagnose_type = "手动";
            } else if (this.report_data["auto"] == 1) {
              this.diagnose_type = "自动";
            } else {
              this.diagnose_type = "--";
            }
          } else {
            ElMessage({
              showClose: true,
              message: res.data.meta.message,
              type: "warning",
            });
          }
        },
        (error) => {
          ElMessage({
            showClose: true,
            message: error,
            type: "warning",
          });
          console.log(error);
        }
      );
    },

    // 集群变动
    change_es() {
      this.XJ_show = true;
      this.task_id = "";
      this.do_GETDiagnoseAutoSettings();
      this.do_GETDiagnoseReport(false);
      this.setHisDivStyle();
      (this.$refs["CheckChart"] as any).chartsBtn();
      this.do_GETDiagnoseLast7d();
      this.do_GETDiagnoseHistoryRuntime();
    },
    // 查询集群自动巡检状态
    do_GETDiagnoseAutoSettings() {
      GETDiagnoseAutoSettings("userid").then(
        (res: any) => {
          if (res.meta.code == 0) {
            if (res.data.data.auto == 1) {
              this.values1 = true;
            } else {
              this.values1 = false;
            }
            // 自动巡检时间 同步
            const time_str = res.data.data.schedule_time;
            const time_str_h = time_str.split(":")[0];
            const time_str_min = time_str.split(":")[1];
            this.value_time = new Date(2022, 11, 23, time_str_h, time_str_min);
            // console.log("==this.value_time==",this.value_time);
          } else {
            this.values1 = false;
            ElMessage({
              showClose: true,
              message: res.data.meta.message,
              type: "warning",
            });
          }
        },
        (error) => {
          this.values1 = false;
          ElMessage({
            showClose: true,
            message: error,
            type: "warning",
          });
          console.log(error);
        }
      );
    },

    // 自动巡检时间变更
    change_time() {
      if (this.values1) {
        this.change_diagnose_auto(2);
      }
    },

    // 变更自动巡检启动状态 GETDiagnoseSwitchAuto change_type:1:巡检状态变更 2：巡检时间变更
    change_diagnose_auto(change_type) {
      var switch_num = 0;
      var time_str = "";
      time_str =
        this.value_time.getHours() + ":" + this.value_time.getMinutes();
      if (this.values1) {
        switch_num = 1;
      }
      if (!this.values2) {
        ElMessage({
          showClose: true,
          message: "ES集群不能为空",
          type: "warning",
        });
        return;
      }
      if (!this.value_time) {
        ElMessage({
          showClose: true,
          message: "自动巡检时间不能为空",
          type: "warning",
        });
        return;
      }

      const data = {
        cluster_name: this.values2,
        items: this.values3,
        schedule_time: time_str,
        auto: switch_num,
      };

      GETDiagnoseSwitchAuto("userid").then(
        (res: any) => {
          if (res.meta.code == 0) {
            if (change_type == 1) {
              ElMessage({
                showClose: true,
                message: "自动巡检状态变更成功",
                type: "success",
              });
            } else if (change_type == 2) {
              ElMessage({
                showClose: true,
                message: "自动巡检时间变更成功",
                type: "success",
              });
            }
          } else {
            ElMessage({
              showClose: true,
              message: res.data.meta.message,
              type: "warning",
            });
          }
        },
        (error) => {
          this.XJ_show = false;
          ElMessage({
            showClose: true,
            message: error,
            type: "warning",
          });
          console.log(error);
        }
      );
    },

    // 查询正在运行的巡检状态
    do_GETDiagnoseGetTask() {
      console.log("请求" + this.num++ + "次");
      if (this.task_id === "") {
        console.log("无任务");
      } else {
        const data = {
          task_id: this.task_id,
        };
        console.log("有任务");
        GETDiagnoseGetTask("userid").then(
          (res: any) => {
            // console.log("==GETDiagnoseGetTask==", res);
            if (res.meta.code == 0) {
              console.log("任务状态：", res.data.data.status);
              if (res.data.data.status == 0) {
                this.XJ_show = false;
              } else if (res.data.data.status == 1) {
                this.XJ_show = true;
                this.task_id = "";
                this.do_GETDiagnoseReport(false);
                this.do_GETDiagnoseHistoryRuntime();
                (this.$refs["CheckChart"] as any).chartsBtn();
                this.do_GETDiagnoseLast7d();
              } else if (res.data.data.status == 2) {
                this.XJ_show = true;
                this.task_id = "";
                ElMessage({
                  showClose: true,
                  message: "巡检因异常而失败！",
                  type: "warning",
                });
              } else {
                this.XJ_show = false;
              }
            } else {
              this.XJ_show = false;
              ElMessage({
                showClose: true,
                message: res.data.meta.message,
                type: "warning",
              });
            }
          },
          (error) => {
            this.XJ_show = false;
            ElMessage({
              showClose: true,
              message: error,
              type: "warning",
            });
            console.log(error);
          }
        );
      }

      return 0;
    },

    stop() {
      clearInterval(this.timer);
      this.timer = 0;
    },

    // 重置
    removes() {
      this.values2 = "";
      this.values3 = [];
    },

    //调用巡检功能
    do_GETDiagnoseRun() {
      if (!this.values2) {
        ElMessage({
          showClose: true,
          message: "ES集群不能为空",
          type: "warning",
        });
        return;
      }

      GETDiagnoseRun("userid").then(
        (res: any) => {
          if (res.meta.code == 0) {
            this.task_id = res.data.data.task_id;
            this.XJ_show = false;
            ElMessage({
              showClose: true,
              message: "执行巡检成功",
              type: "success",
            });
          } else if (res.meta.code == 402) {
            this.task_id = res.data.data.task_id;
            this.XJ_show = false;
            ElMessage({
              showClose: true,
              message: res.data.meta.message,
              type: "warning",
            });
          } else {
            this.XJ_show = true;
            ElMessage({
              showClose: true,
              message: res.data.meta.message,
              type: "warning",
            });
          }
        },
        (error) => {
          this.XJ_show = true;
          ElMessage({
            showClose: true,
            message: error,
            type: "warning",
          });
          console.log(error);
        }
      );
    },

    // 取消巡检
    do_GETDiagnoseCancelTask() {
      GETDiagnoseCancelTask("userid").then(
        (res: any) => {
          // console.log(res: any)
          if (res.meta.code == 0) {
            this.XJ_show = true;
            this.task_id = "";
            ElMessage({
              showClose: true,
              message: "取消巡检成功",
              type: "success",
            });
          } else {
            this.XJ_show = false;
            ElMessage({
              showClose: true,
              message: res.data.meta.message,
              type: "warning",
            });
          }
        },
        (error) => {
          this.XJ_show = false;
          ElMessage({
            showClose: true,
            message: error,
            type: "warning",
          });
          console.log(error);
        }
      );
    },

    // 日期树点击
    handleNodeClick(data) {
      if (data.report_time) {
        this.do_GETDiagnoseReport(data.report_time);
      }
    },

    // 收起打开折叠区域
    GFXXJX_show_change() {
      if (this.GFXXJX_show === true) {
        this.GFXXJX_show = false;
      } else {
        this.GFXXJX_show = true;
      }
      setTimeout(() => {
        this.setHisDivStyle();
      }, 10);
    },
    // 收起打开折叠区域
    DFXXJX_show_change() {
      if (this.DFXXJX_show === true) {
        this.DFXXJX_show = false;
      } else {
        this.DFXXJX_show = true;
      }
      setTimeout(() => {
        this.setHisDivStyle();
      }, 10);
    },
    // 收起打开折叠区域
    AQXJX_show_change() {
      if (this.AQXJX_show === true) {
        this.AQXJX_show = false;
      } else {
        this.AQXJX_show = true;
      }

      setTimeout(() => {
        this.setHisDivStyle();
      }, 10);
    },

    // 下拉框ES_id列表数据
    GetESIDData() {
      GetESIDData("userid").then((res: any) => {
        let es_ids = res.data.data;
        const arr: any[] = [];
        for (let i = 0; i < es_ids.length; i++) {
          let obj = {
            value: "",
            label: "",
          };
          if (i == 0) {
            this.values2 = es_ids[i]["name"];
            this.do_GETDiagnoseAutoSettings();
            this.do_GETDiagnoseReport(false);
            // (this.$refs["CheckChart"] as any).chartsBtn();
            this.do_GETDiagnoseLast7d();
            this.do_GETDiagnoseHistoryRuntime();
          }
          obj.value = es_ids[i]["name"];
          obj.label = es_ids[i]["name"];
          arr.push(obj);
        }

        this.es_ids = arr;
        console.log("====this.es_ids===", this.es_ids);
      });
    },

    // 获取巡检项目列表
    GETDiagnoseItems() {
      GETDiagnoseItems("userid").then((res: any) => {
        // console.log(res.data.data);
        let items_ids = res.data.data;
        // console.log(items_ids.length);
        const arr: any[] = [];
        this.values3 = [];
        for (let i = 0; i < items_ids.length; i++) {
          let obj = {
            value: "",
            label: "",
          };
          obj.value = items_ids[i]["id"];
          obj.label = items_ids[i]["name"];
          this.values3.push(obj.value);
          arr.push(obj);
        }
        this.items_ids = arr;
      });
    },
  },

  mounted() {
    this.GetESIDData();
    this.GETDiagnoseItems();

    this.setHisDivStyle();
    this.do_GETDiagnoseHistoryRuntime();
  },

  setup() {
    return {
      Check,
      Delete,
      Edit,
      Message,
      Search,
      Star,
      RefreshRight,
      Refresh,
      Eleme,
      CircleClose,
    };
  },
});
</script>
<style lang="less" scoped>
// .report {
//   color: #606266;
// }

.bottom_left_content_info_text_box {
  padding-top: 5px;
  padding-bottom: 5px;
  display: block;
  float: left;
  width: 100%;
}

.bottom_left_content_info_text_box_left {
  font-size: 13px;
  display: block;
  width: 90px;
  float: left;
  color: #606266;
}

.bottom_left_content_info_text_box_right {
  font-size: 13px;
  display: block;
  width: 85%;
  height: auto;
  float: left;
  color: #606266;
}

.model_item_box_card_top {
  line-height: 20px;
  border-bottom: solid 1px #dde0e7;
}

.model_item_box_card_top_title {
  display: inline-block;
  font-size: 16px;
  color: #606266;
  padding-left: 10px;
  // font-weight: bold;
}

.model_item_box_card_top_title_text {
  display: inline-block;
  font-size: 14px;

  // font-weight: 700;
  line-height: 40px;
}

.model_item_box_card_bottom_left {
  width: 69%;
  float: left;
  border-right: solid 1px #dde0e7;
}

.model_item_box_card_bottom_left_title {
  font-size: 14px;
  text-align: center;
  padding-top: 20px;
  color: #606266;
  font-weight: bold;
}

.model_item_box_card_bottom_left_info {
  font-size: 14px;
  padding-top: 15px;
  margin-left: 10px;

  .text_box {
    padding-top: 10px;
    display: block;
    float: left;
    width: 100%;
    margin-bottom: 10px;
    color: #606266;
  }

  .text_box_left {
    font-size: 13px;
    display: block;
    // width: 70px;
    float: left;
    color: #606266;
  }

  .text_box_right {
    font-size: 13px;
    display: block;
    float: left;
    color: #606266;
  }
}

.model_item_box_card_bottom_left_content_title {
  width: 60%;
  display: block;
  margin-bottom: 10px;
}

.model_item_box_card_bottom_left_content_info {
  margin-left: 20px;

  .text_box {
    display: block;
    float: left;
    width: 100%;
  }

  .text_box span {
    font-size: 13px;
    font-weight: bold;
    display: block;
    color: #606266;
  }
}

.reportBar {
  height: 250px;
  // display: flex;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
}

.bottom > div:nth-child(1) {
  width: 25%;
  margin-right: 0.4rem;
}

.bottom > div:nth-child(2) {
  width: 45%;
  margin-right: 0.4rem;
}

.bottom > div:nth-child(3) {
  width: 30%;
}

:deep(.el-table--border >>> td) {
  text-align: center;
  height: 44px;
}

:deep(.el-table--border >>> th) {
  color: #303133;
  font-weight: 400;
  text-align: center;
  height: 44px;
}

.fix {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  // height: 689px;
  justify-content: baseline;
  background-color: #fff;
  padding: 10px 10px 10px 10px;
}

.lable {
  // height: inherit;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.searchBox {
  // background-color: #fff;
  padding: 10px 10px 1px 10px;
}

.button {
  margin-left: 12px;
}

.lightgreen-box {
  background-color: lightgreen;
  height: 24px;
}

.orange-box {
  background-color: orange;
  height: 24px;
}

.model_item_box_card_bottom_left_content {
  margin-top: 3px;
  margin-left: 10px;
  margin-right: 30px;
}

.model_item_box_card_bottom_left_content_icon {
  font-size: 13px;
  font-weight: bold;
  display: block;
  color: #606266;
}

.model_item_box_card_bottom_right {
  width: 30%;
  float: right;
  overflow: scroll;
  margin-top: 10px;
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
