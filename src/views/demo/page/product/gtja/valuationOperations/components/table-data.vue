<template>
  <div class="table-data-info">
    <div class="table_title_box">
      <span class="title_check" style="" @click="table_chage" v-if="title_check"
        >投资者信息总览</span
      >
      <!-- <div class="t_top" v-if="title_check"></div> -->
      <span
        class="title_not_check"
        style=""
        @click="table_chage"
        v-if="title_check == false"
        >投资者信息总览</span
      >
      <span
        class="title_check"
        style=""
        @click="table_chage"
        v-if="title_check == false"
        >销售机构总览</span
      >
      <!-- <div class="t_top2" v-if="title_check == false"></div> -->
      <span
        class="title_not_check"
        @click="table_chage"
        style=""
        v-if="title_check"
        >销售机构总览</span
      >
      <el-icon :size="20" style="float: right">
        <Operation />
      </el-icon>
    </div>
    <div
      class="content_box"
      style="width: 100%; padding: 15px; text-align: center"
    >
      <el-table
        v-if="title_check"
        ref="excelTable"
        :stripe="true"
        :data="tableData1"
        class="tableLineMedium"
        style="width: 100%"
        :header-cell-style="{
          'background-color': '#F6F7F9',
        }"
      >
        <el-table-column prop="tzz_type" label="投资者类型" width="180">
        </el-table-column>
        <el-table-column prop="count" label="数量" width="80" align="left">
        </el-table-column>
        <el-table-column prop="fezs" label="份额总数" width="180" align="right">
        </el-table-column>
        <el-table-column
          prop="zfezb"
          label="总份额占比"
          width="100"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop="zzc"
          label="总资产(元)"
          width="180"
          align="right"
        >
        </el-table-column>
        <el-table-column prop="zczb" label="资产占比" align="right">
        </el-table-column>
      </el-table>
      <el-table
        v-if="title_check == false"
        ref="excelTable"
        :stripe="true"
        :data="tableData2"
        class="tableLineMedium"
        style="width: 100%"
        :header-cell-style="{
          'background-color': '#F6F7F9',
        }"
      >
        <el-table-column prop="xsjg" label="销售机构" width="180">
        </el-table-column>
        <el-table-column
          prop="tzzsl"
          label="投资者数量"
          width="120"
          align="left"
        >
        </el-table-column>
        <el-table-column prop="fezs" label="份额总数" width="180" align="right">
        </el-table-column>
        <el-table-column
          prop="zfezb"
          label="总份额占比"
          width="120"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop="zzc"
          label="总资产(元)"
          width="180"
          align="right"
        >
        </el-table-column>
        <el-table-column prop="zczb" label="资产占比" align="right">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  computed,
  ref,
  unref,
  onUnmounted,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { GetTzzxxzlData, GetXsjgzlData } from "@/api/gtjaData";
const tableData1 = ref([]);
const tableData2 = ref([]);
let title_check = ref(true);

function table_chage() {
  if (title_check.value) {
    title_check.value = false;
  } else {
    title_check.value = true;
    GetTzzxxzlDataFun();
  }
}
function GetTzzxxzlDataFun() {
  GetTzzxxzlData("userid").then((res: any) => {
    if (res.meta.code == "0") {
      tableData1.value = res.data.tableData;
      console.log("==tableData1.value", tableData1.value);
    }
  });
}
function GetXsjgzlDataFun() {
  GetXsjgzlData("userid").then((res: any) => {
    if (res.meta.code == "0") {
      tableData2.value = res.data.tableData;
      console.log("==tableData2.value", tableData1.value);
    }
  });
}

onMounted(() => {
  GetTzzxxzlDataFun();
  GetXsjgzlDataFun();
});
</script>

<style lang="less" scoped>
.canvas {
  padding: 0px;
  width: 100%;
  height: 320px;
  z-index: 1;
}
.title_not_check {
  color: #8e8e8e;
  font-size: 16px;

  display: inline-block;
  margin-top: 4px;
  margin-right: 20px;
}
.title_check {
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  margin-top: 4px;
  margin-right: 20px;
}

.table_title_box {
  background-color: white;
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
}

.table-data-info {
  &__cop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;

    li {
      display: flex;
      list-style: none;
      flex: 1;
      color: #606266;

      .fall,
      .rise {
        display: flex;
        align-items: center;
        margin-left: 10px;
      }

      .fall {
        color: #13ae7c;
      }

      .rise {
        color: #f21e37;
      }
    }
  }
}
</style>
