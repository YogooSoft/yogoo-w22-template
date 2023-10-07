<template>
  <page-wrapper title="表格导出" content="">
    <collapse-container
      class="cl-mb-10"
      title="表格导出"
      :can-expan="true"
      help-message="表格导出"
    >
      <div style="margin-bottom: 10px">
        <el-radio-group v-model="radio" size="medium" @change="change_size">
          <el-radio-button label="大"></el-radio-button>
          <el-radio-button label="中(默认)"></el-radio-button>
          <el-radio-button label="小"></el-radio-button>
          <el-radio-button label="极小"></el-radio-button>
        </el-radio-group>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-radio-group v-model="radio2" size="medium" @change="change_loading">
          <el-radio-button label="加载中"></el-radio-button>
          <el-radio-button label="加载完成"></el-radio-button>
        </el-radio-group>
        <el-button
          style="margin-top: 8px; margin-left: 10px"
          type="primary"
          @click="exportExcel"
          >导出</el-button
        >
      </div>

      <el-table
        id="aaaaa"
        ref="excelTable"
        :data="tableData"
        v-loading="load_staus"
        border
        :class="elTableClass"
        style="width: 100%"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { yuiTableClass } from "@/enums/tableEnum";

import { GetTableData } from "@/api/tableData";

import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { exportExcel } from "@/utils/helper/exportHelper";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "table-base",
  components: { CollapseContainer, PageWrapper },

  data() {
    return {
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

      rowData: [],
      headerData: [],
      controlAtrr: {},
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
    change_size() {
      if (this.radio == "大") {
        this.elTableClass = yuiTableClass.Large;
      } else if (this.radio == "中(默认)") {
        this.elTableClass = yuiTableClass.Medium;
      } else if (this.radio == "小") {
        this.elTableClass = yuiTableClass.Small;
      } else if (this.radio == "极小") {
        this.elTableClass = yuiTableClass.ExtraSmall;
      }
    },
    exportExcel() {
      exportExcel(this.$refs.excelTable, "基础表格", "基础表格.xlsx");
    },
    // exportExcel() {
    //   //转换成excel时，使用原始的格式
    //   var xlsxParam = { raw: true };
    //   let fix = document.querySelector(".el-table__fixed");
    //   //let wb = "";
    //   //判断有无fixed定位，如果有的话去掉，后面再加上，不然数据会重复
    //   if (fix) {
    //     let wb = XLSX.utils.table_to_book(
    //       document.querySelector("#tableId").removeChild(fix),
    //       xlsxParam
    //     );
    //     document.querySelector("#tableId").appendChild(fix);
    //   } else {
    //     let wb = XLSX.utils.table_to_book(
    //       document.querySelector("#tableId"),
    //       xlsxParam
    //     );
    //   }
    //   var wbout = XLSX.write(wb, {
    //     bookType: "xlsx",
    //     bookSST: true,
    //     type: "array",
    //   });
    //   try {
    //     FileSaver.saveAs(
    //       new Blob([wbout], { type: "application/octet-stream" }),
    //       "导出详情单.xlsx"
    //     );
    //   } catch (e) {
    //     if (typeof console !== "undefined") console.log(e, wbout);
    //   }
    //   return wbout;
    // },
    // exportExcel() {
    //   //时候按照表格的原样导出  不对表格数据进行处理
    //   let xlsxParams = { row: true };

    //   //根据表格导出  可以根据json数据导出 json_to_sheet
    //   let wb = XLSX.utils.table_to_book(
    //     document.querySelector("#aaaaa"),
    //     xlsxParams
    //   );

    //   //写入
    //   let wbout = XLSX.write(wb, {
    //     bookType: "xlsx",
    //     bookSST: true,
    //     type: "array",
    //   });

    //   FileSaver.saveAs(
    //     new Blob([wbout], { type: "application/octet-stream" }),
    //     "数据导出.xlsx"
    //   );
    // },
  },
  created() {},
  mounted() {
    this.load_staus = true;
    GetTableData("userid").then((res: any) => {
      if (res.meta.code == "0") {
        this.rowData = res.data.rowData;
        this.headerData = res.data.headerData;
        this.controlAtrr = res.data.controlAtrr;
        this.load_staus = false;

        console.log(this.rowData);
        console.log(this.headerData);
        console.log(this.controlAtrr);
      }
    });
  },

  setup(props) {
    return {};
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
