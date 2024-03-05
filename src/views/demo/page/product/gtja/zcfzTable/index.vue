<template>
  <page-wrapper title="" content="">
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

      <el-button
        class="top_line_button"
        :icon="Search"
        type="primary"
        @click="GetGtjaZcfzDataFun"
        >查询</el-button
      >
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>会计年度：</span>
      <el-date-picker v-model="value2" type="month" style="width: 130px" />
    </div>

    <div class="file_box">
      <el-button class="file_box_button" @click="doexportExcel"
        >导出资产负债表数据</el-button
      >
      <el-button class="file_box_button" @click="doexportExcel"
        >批量导出</el-button
      >
      <el-button class="file_box_button" @click="doexportExcel"
        >下载离线文件</el-button
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
        <el-table-column prop="zc_type" label="资产" width="180" align="left">
        </el-table-column>
        <el-table-column
          prop="balance_qm"
          label="期末余额"
          width="180"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop="balance_lastyear_qm"
          label="上年年末余额"
          align="right"
        >
        </el-table-column>
        <el-table-column prop="fzjzc_type" label="负债和净资产" align="left">
        </el-table-column>
        <el-table-column prop="balance_qm2" label="期末余额" align="right">
        </el-table-column>
        <el-table-column
          prop="balance_lastyear_qm2"
          label="上年年末余额"
          align="right"
        >
        </el-table-column>
      </el-table>
    </div>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { yuiTableClass } from "@/enums/tableEnum";
// 引入YuiTable
import { YuiTable } from "@/components/Table/index";
// 引入表格导出组件
import { exportExcel } from "@/utils/helper/exportHelper";
// 表格数据接口
import { GetGtjaZcfzData } from "@/api/gtjaData";

import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  name: "demoDialog",
  components: {
    CollapseContainer,
    PageWrapper,

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

      value1: "",
      value2: "",
      value3: "",
      show_type: true,
      value1_2: "",
      value_2: "",
      value3_2: "",
      value4_2: "",
      elTableClass: "tableLineMedium",
      load_staus: false,
      radio2: "加载完成",
      radio: "中(默认)",
      tableData: [],
      headerData: [],
      controlAtrr: {},
      wechatAddForm: {},
      wechatAddFormVisible: false,

      // 无限滚动 样式
      count: 100,
      loading: false,
    };
  },
  methods: {
    // 基础表格
    doexportExcel() {
      exportExcel(
        this.headerData,
        this.tableData,
        "资产负债表",
        "资产负债表.xlsx"
      );
    },

    // exportExcel() {
    //   // console.log("===excelTable==", "excelTable");
    //   exportExcel(this.$refs.excelTable, "资产负债表", "资产负债表.xlsx");
    // },

    GetGtjaZcfzDataFun() {
      GetGtjaZcfzData("userid").then((res: any) => {
        if (res.meta.code == "0") {
          this.tableData = res.data.tableData;
          this.headerData = res.data.headerData;
          this.controlAtrr = res.data.controlAtrr;
          this.load_staus = false;

          console.log(this.tableData);
          console.log(this.headerData);
          console.log(this.controlAtrr);
        }
      });
    },
  },
  created() {},
  mounted() {
    this.load_staus = true;
    this.GetGtjaZcfzDataFun();
  },
});
</script>

<style lang="less" scoped>
.table_box {
  background-color: white;
  padding: 10px;
}
.file_box_button {
  margin: 5px;
  float: right;
}
.file_box {
  background-color: white;
  height: 30px;
  width: 100%;
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
