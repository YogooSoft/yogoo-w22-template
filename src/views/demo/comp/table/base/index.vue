<template>
  <page-wrapper title="基础表格" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础表格"
      :can-expan="true"
      help-message="基础表格"
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
      </div>

      <el-table
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
    <collapse-container
      class="cl-mb-10"
      title="基础表格yui-table"
      :can-expan="true"
      help-message="基础表格yui-table"
    >
      <yui-table
        :load_staus="load_staus"
        :border="true"
        :table_size="elTableClass"
        :rowData="
          rowData.length > 0
            ? rowData.slice(
                (controlAtrr['pageObj']['pageData']['page'] - 1) *
                  controlAtrr['pageObj']['pageData']['size'],
                controlAtrr['pageObj']['pageData']['page'] *
                  controlAtrr['pageObj']['pageData']['size']
              )
            : ''
        "
        :headerData="headerData"
        :controlAtrr="controlAtrr"
        style="width: 100%"
      >
      </yui-table>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { yuiTableClass } from "@/enums/tableEnum";

import { GetTableData } from "@/api/tableData";
// 引入YuiTable
import { YuiTable } from "@/components/Table/index";

export default defineComponent({
  name: "table-base",
  components: { CollapseContainer, PageWrapper, YuiTable },

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
