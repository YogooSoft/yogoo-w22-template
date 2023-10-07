<template>
  <el-tabs v-model="activeName" class="demo-tabs" type="border-card">
    <el-tab-pane
      label="分支机构平均利率、日均余额、应计利息统计表"
      name="first"
    >
      <div style="margin-bottom: 10px">
        <span>日期区间：</span>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择开始日期"
          style="margin-left: 10px; width: 150px"
          size="medium"
        />
        &nbsp;&nbsp;&nbsp;至&nbsp;
        <el-date-picker
          v-model="value2"
          type="date"
          placeholder="选择截止日期"
          style="margin-left: 10px; width: 150px"
          size="medium"
        />

        &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- <el-radio-group v-model="radio2" size="medium" @change="change_loading">
          <el-radio-button label="加载中"></el-radio-button>
          <el-radio-button label="加载完成"></el-radio-button>
        </el-radio-group> -->

        <span>营业部：</span>
        <el-select
          v-model="value3"
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="选择营业部"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          style="margin-left: 10px; margin-bottom: 2px"
          :icon="Search"
          type="primary"
          @click="GetBranchBalanceDataFun"
          >查询</el-button
        >

        <el-button
          style="margin-left: 10px; margin-bottom: 2px"
          type="primary"
          @click="exportExcel"
          size="medium"
          >导出</el-button
        >
      </div>

      <el-table
        ref="excelTable"
        :data="tableDataFirst"
        v-loading="load_staus"
        border
        :class="elTableClass"
        style="width: 100%"
        @sort-change="sort_change1"
      >
        <el-table-column
          prop="branch"
          label="机构代码"
          sortable="branch"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="brh_name" label="分支机构" width="180">
        </el-table-column>
        <el-table-column
          prop="balance_avg_day"
          sortable="balance_avg_day"
          label="日均余额(元)"
          align="right"
        >
        </el-table-column>
        <el-table-column
          prop="balance_avg_day_tb"
          sortable
          label="日均余额同期(元)"
          align="right"
        >
        </el-table-column>
        <el-table-column
          prop="accrued_int"
          sortable="accrued_int"
          label="应计利息(元)"
          align="right"
        >
        </el-table-column>
        <el-table-column
          prop="accrued_int_tb"
          sortable
          label="应计利息同期(元)"
          align="right"
        >
        </el-table-column>
        <el-table-column
          prop="int_rate_avg_year"
          sortable="int_rate_avg_year"
          label="年化利率(%)"
          align="right"
        >
        </el-table-column>
        <el-table-column
          prop="int_rate_avg_year_tb"
          sortable
          label="年化利率同期(%)"
          align="right"
        >
        </el-table-column>
      </el-table>

      <!-- <yui-table
        ref="excelTable"
        :load_staus="load_staus"
        :border="true"
        :table_size="elTableClass"
        :rowData="
          tableDataFirst.length > 0
            ? tableDataFirst.slice(
                (controlAtrrFirst['pageObj']['pageData']['page'] - 1) *
                  controlAtrrFirst['pageObj']['pageData']['size'],
                controlAtrrFirst['pageObj']['pageData']['page'] *
                  controlAtrrFirst['pageObj']['pageData']['size']
              )
            : ''
        "
        :headerData="headerDataFirst"
        :controlAtrr="controlAtrrFirst"
        style="width: 100%"
      >
      </yui-table> -->
    </el-tab-pane>
    <el-tab-pane label="分支机构客户日均余额统计表" name="second">
      <div style="margin-bottom: 10px">
        <span>日期区间：</span>
        <el-date-picker
          v-model="value1_2"
          type="date"
          placeholder="选择开始日期"
          style="margin-left: 10px; width: 150px"
          size="medium"
        />
        &nbsp;&nbsp;&nbsp;至&nbsp;
        <el-date-picker
          v-model="value2_2"
          type="date"
          placeholder="选择截止日期"
          style="margin-left: 10px; width: 150px"
          size="medium"
        />

        &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- <el-radio-group v-model="radio2" size="medium" @change="change_loading">
          <el-radio-button label="加载中"></el-radio-button>
          <el-radio-button label="加载完成"></el-radio-button>
        </el-radio-group> -->

        <span>营业部：</span>
        <el-select
          v-model="value3_2"
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="选择营业部"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>资金账号：</span>

        <el-input
          v-model="value4_2"
          placeholder="输入资金账号"
          style="width: 200px"
        />

        <el-button
          style="margin-left: 10px; margin-bottom: 2px"
          :icon="Search"
          type="primary"
          @click="GetAccountBalanceDataFun"
          >查询</el-button
        >

        <el-button
          style="margin-left: 10px; margin-bottom: 2px"
          type="primary"
          @click="exportExcel2"
          size="medium"
          >导出</el-button
        >
      </div>

      <el-table
        ref="excelTable2"
        @sort-change="sort_change2"
        :data="tableDataSecond"
        v-loading="load_staus"
        border
        :class="elTableClass"
        style="width: 100%"
      >
        <el-table-column
          prop="branch"
          label="机构代码"
          sortable="branch"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="brh_name" label="分支机构" width="180">
        </el-table-column>
        <el-table-column
          prop="account"
          label="资金账号"
          sortable="account"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="cust_code"
          label="客户号"
          sortable="cust_code"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="cust_name" label="客户姓名" width="180">
        </el-table-column>
        <el-table-column
          prop="balance_avg_day"
          sortable="balance_avg_day"
          label="日均余额(元)"
          align="right"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="balance_avg_day_tq"
          sortable="balance_avg_day_tq"
          label="日均余额同期(元)"
          align="right"
          width="180"
        >
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>

  <!-- <page-wrapper title="分支机构平均利率、日均余额、应计利息统计表" content="">
    <collapse-container
      class="cl-mb-10"
      title="分支机构平均利率、日均余额、应计利息统计表"
      :can-expan="true"
      help-message="分支机构平均利率、日均余额、应计利息数据(含同期)"
    >
      
    </collapse-container>
  </page-wrapper> -->
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { yuiTableClass } from "@/enums/tableEnum";
// 引入YuiTable
import { YuiTable } from "@/components/Table/index";

import {
  GetBranchListData,
  GetBranchBalanceData,
  GetAccountBalanceData,
} from "@/api/fislData";

import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { exportExcel } from "@/utils/helper/exportHelper";
import { ElMessage } from "element-plus";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  Share,
  ArrowLeft,
  Eleme,
} from "@element-plus/icons-vue";

export default defineComponent({
  name: "table-base",
  components: { CollapseContainer, PageWrapper, YuiTable },

  data() {
    return {
      options: [] as any,
      activeName: "first",
      value1: "",
      value2: "",
      value3: "",
      value1_2: "",
      value2_2: "",
      value3_2: "",
      value4_2: "",
      elTableClass: "tableLineMedium",
      load_staus: false,
      radio2: "加载完成",
      radio: "中(默认)",
      tableData: [
        {
          date: "2016-05-02",
          name: "一一工口国",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],

      tableDataFirst: [] as any,
      tableDataSecond: [] as any,

      rowData: [],
      headerDataFirst: [],
      controlAtrrFirst: {},
    };
  },
  methods: {
    change_loading() {
      if (this.radio2 == "加载中") {
        this.load_staus = true;
      } else if (this.radio2 == "加载完成") {
        this.load_staus = false;
      }
    },
    exportExcel() {
      exportExcel(
        this.$refs.excelTable,
        "分支机构平均利率、日均余额、应计利息统计表",
        "分支机构平均利率、日均余额、应计利息统计表.xlsx"
      );
    },
    exportExcel2() {
      exportExcel(
        this.$refs.excelTable2,
        "分支机构客户日均余额统计表",
        "分支机构客户日均余额统计表.xlsx"
      );
    },
    GetBranchListDataFun() {
      GetBranchListData("userid").then((res: any) => {
        if (res.meta.code == "0") {
          this.options = res.data.data;
          // this.headerData = res.data.headerData;
          // this.controlAtrr = res.data.controlAtrr;
          this.load_staus = false;

          console.log(this.options);
          // console.log(this.headerData);
          // console.log(this.controlAtrr);
        }
      });
    },

    GetBranchBalanceDataFun() {
      GetBranchBalanceData("userid").then((res: any) => {
        if (res.meta.code == "0") {
          this.tableDataFirst = res.data.tableData;
          this.headerDataFirst = res.data.headerData;
          this.controlAtrrFirst = res.data.controlAtrr;
          this.load_staus = false;
          console.log("=======================");
          console.log(this.tableDataFirst);
          console.log(this.headerDataFirst);
          console.log(this.controlAtrrFirst);
          console.log("=======================");
        }
      });
    },

    GetAccountBalanceDataFun() {
      GetAccountBalanceData("userid").then((res: any) => {
        if (res.meta.code == "0") {
          this.tableDataSecond = res.data.tableData;
          // this.headerData = res.data.headerData;
          // this.controlAtrr = res.data.controlAtrr;
          this.load_staus = false;

          console.log("==this.tableDataSecond==", this.tableDataSecond);
          // console.log(this.headerData);
          // console.log(this.controlAtrr);
        }
      });
    },

    sort_change1(column) {
      this.tableDataFirst = this.tableDataFirst.sort(
        this.sortFun1(column.prop, column.order === "ascending")
      );
      console.log(this.tableDataFirst);
    },

    // 排序函数
    sortFun1(attr, rev) {
      console.log(attr);
      //第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }

      // 判断排序的字段，对齐纯数字字段进行排序
      return function (a, b) {
        try {
          a = parseInt(a[attr].replaceAll(",", ""));
        } catch (e) {
          a = a[attr];
        }

        try {
          b = parseInt(b[attr].replaceAll(",", ""));
        } catch (e) {
          b = b[attr];
        }

        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }

        return 0;
      };
    },

    sort_change2(column) {
      this.tableDataSecond = this.tableDataSecond.sort(
        this.sortFun1(column.prop, column.order === "ascending")
      );
      console.log(this.tableDataSecond);
    },

    // 排序函数
    sortFun2(attr, rev) {
      console.log(attr);
      //第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }

      // 判断排序的字段，对齐纯数字字段进行排序
      return function (a, b) {
        try {
          a = parseInt(a[attr].replaceAll(",", ""));
        } catch (e) {
          a = a[attr];
        }

        try {
          b = parseInt(b[attr].replaceAll(",", ""));
        } catch (e) {
          b = b[attr];
        }

        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }

        return 0;
      };
    },
  },
  created() {},
  mounted() {
    this.load_staus = true;
    this.GetBranchListDataFun();
    this.GetBranchBalanceDataFun();
    this.GetAccountBalanceDataFun();
  },

  setup(props) {
    return {
      Check,
      Delete,
      Edit,
      Message,
      Search,
      Star,
      Share,
      ArrowLeft,

      Eleme,
    };
  },
});
</script>

<style lang="less" scoped>
.flex-1 {
  flex: 1;
}

.flex-2 {
  margin-bottom: 10px;
}

.cl-mb-10 {
  margin-bottom: 10px;
}

.cl-mb-10-top {
  margin-top: 10px;
}

.el-alert {
  margin-bottom: 10px;
}
</style>
