<template>
  <div class="search_box">
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>产品信息：</span>
    <el-select
      v-model="value1"
      collapse-tags
      collapse-tags-tooltip
      placeholder="选择产品"
      style="width: 400px"
    >
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>比较指标：</span>
    <el-select
      v-model="value2"
      collapse-tags
      collapse-tags-tooltip
      placeholder="选择指标"
      style="width: 120px"
    >
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>展示频率：</span>
    <el-select
      v-model="value3"
      collapse-tags
      collapse-tags-tooltip
      placeholder="选择频率"
      style="width: 120px"
    >
      <el-option
        v-for="item in options3"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>估值日期：</span>
    <el-date-picker
      v-model="value4"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="截止日期"
      :default-value="[new Date(2023, 9, 1), new Date(2023, 10, 1)]"
    />

    <el-button
      class="top_line_button"
      :icon="Search"
      type="primary"
      @click="GetDwjzDataFun"
      >查询</el-button
    >
  </div>

  <div class="file_box">
    <div class="file_box_radio">
      <span>基础指标：</span>
      <el-radio-group v-model="radio1">
        <el-radio :label="3">单位净值</el-radio>
        <el-radio :label="6">累计单位净值</el-radio>
      </el-radio-group>
    </div>
    <div class="file_box_radio">
      <span>对比模式：</span>
      <el-radio-group v-model="radio2">
        <el-radio :label="3">净值对比</el-radio>
        <el-radio :label="6">增长率对比</el-radio>
      </el-radio-group>
    </div>

    <div class="file_box_checkbox">
      <span>数据标识：</span>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="净值最高点" />
        <el-checkbox label="增长最低点" />
      </el-checkbox-group>
    </div>

    <el-button class="file_box_button_right" @click="exportExcel"
      >导出图表</el-button
    >
  </div>
  <div class="chart_box">
    <chart-data />
  </div>

  <div class="file_box">
    <el-button class="file_box_button_left">SZD813</el-button>

    <el-button class="file_box_button_right" @click="exportExcel"
      >导出Excel</el-button
    >
  </div>
  <div class="table_box">
    <el-table
      ref="excelTable"
      :stripe="true"
      :data="tableData"
      v-loading="load_staus"
      :class="elTableClass"
      style="width: 100%"
      :header-cell-style="{
        'background-color': '#F6F7F9',
      }"
    >
      <el-table-column prop="cpdm" label="产品代码" width="180" align="left">
      </el-table-column>
      <el-table-column
        prop="cpmc"
        label="产品名称"
        min-width="250"
        align="left"
      >
      </el-table-column>
      <el-table-column
        prop="jzrq"
        label="净值日期"
        max-width="120"
        align="left"
      >
      </el-table-column>
      <el-table-column prop="dwjz" label="单位净值" align="right">
      </el-table-column>
      <el-table-column prop="dwjzzzl" label="单位净值增长率(%)" align="right">
      </el-table-column>
      <el-table-column prop="ljjz" label="累计净值" align="right">
      </el-table-column>
      <el-table-column prop="ljjzzzl" label="累计净值增长率(%)" align="right">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import ChartData from "./components/chart-data.vue";

// 引入YuiTable
import { YuiTable } from "@/components/Table/index";
// 引入表格导出组件
import { exportExcel } from "@/utils/helper/exportHelper";
// 获取数据接口
import { GetDwjzData } from "@/api/gtjaData";

import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  name: "demoDialog",
  components: {
    CollapseContainer,
    PageWrapper,
    ChartData,
    YuiTable,
  },
  data() {
    return {
      options1: [
        {
          value: 0,
          label: "YGD001_悦宏吉庆有余1号私募证券投资基金",
        },
        {
          value: 1,
          label: "SZD813_悦宏吉庆有余2号私募证券投资基金",
        },
        {
          value: 2,
          label: "YGD001_悦宏吉庆有余3号私募证券投资基金",
        },
      ],
      options2: [
        {
          value: 0,
          label: "净值",
        },
      ],
      options3: [
        {
          value: 1,
          label: "1分钟",
        },
        {
          value: 2,
          label: "2分钟",
        },
        {
          value: 3,
          label: "3分钟",
        },
      ],

      value1: "",
      value2: "",
      value3: "",
      value4: "",
      radio1: 3,
      radio2: 3,

      checkList: [],

      elTableClass: "tableLineMedium",
      load_staus: false,

      tableData: [],
    };
  },
  methods: {
    // 基础表格
    exportExcel() {
      // console.log("===excelTable==", "excelTable");
      exportExcel(this.$refs.excelTable, "单位净值表格", "单位净值表格.xlsx");
    },

    GetDwjzDataFun() {
      GetDwjzData("userid").then((res: any) => {
        if (res.meta.code == "0") {
          this.tableData = res.data.tableData;

          this.load_staus = false;

          console.log(this.tableData);
        }
      });
    },
  },
  created() {},
  mounted() {
    this.load_staus = true;
    this.GetDwjzDataFun();
  },
});
</script>

<style lang="less" scoped>
.file_box_checkbox {
  display: inline-flex;
  line-height: 32px;
  margin-right: 50px;
}
.file_box_radio {
  display: inline-flex;
  line-height: 40px;
  margin-right: 50px;
}
.table_box {
  background-color: white;
  padding: 0 20px 20px 20px;
  margin-top: -2px;
  padding-top: 10px;
}
.chart_box {
  background-color: white;
  padding: 0 10px 10px 10px;
}
.file_box_button_left {
  margin: 5px;
  float: left;
  padding-bottom: 10px;
}
.file_box_button_right {
  margin: 5px;
  float: right;
}
.file_box {
  display: inline-block;
  background-color: white;
  height: 44px;
  width: 100%;
  padding-top: 4px;
  padding-left: 20px;
  padding-right: 10px;
}
.search_box {
  margin-bottom: 10px;
  background-color: white;
  padding: 10px;
}
.top_line_button {
  margin-left: 10px;
  margin-bottom: 2px;
  float: right;
}
</style>
