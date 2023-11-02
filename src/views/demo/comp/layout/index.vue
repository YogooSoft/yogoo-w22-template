<template>
  <page-wrapper title="布局" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础布局"
      :can-expan="true"
      help-message="使用单一分栏创建基础的栅格布局。"
    >
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark"></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="12"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="分栏间隔"
      :can-expan="true"
      help-message="Row 组件 提供 gutter 属性来指定每一栏之间的间隔，默认间隔为 0。"
    >
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="混合布局"
      :can-expan="true"
      help-message="通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。"
    >
      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="分栏偏移"
      :can-expan="true"
      help-message="支持偏移指定的栏数。"
    >
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6" :offset="6"
          ><div class="grid-content bg-purple"></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="6"
          ><div class="grid-content bg-purple"></div
        ></el-col>
        <el-col :span="6" :offset="6"
          ><div class="grid-content bg-purple"></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6"
          ><div class="grid-content bg-purple"></div
        ></el-col>
      </el-row>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="对齐方式"
      :can-expan="true"
      help-message="通过 flex 布局来对分栏进行灵活的对齐。"
    >
      <el-row type="flex" class="row-bg">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="响应式布局"
      :can-expan="true"
      help-message="预设了五个响应尺寸：xs、sm、md、lg 和 xl。"
    >
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
          ><div class="grid-content bg-purple"></div
        ></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
          ><div class="grid-content bg-purple"></div
        ></el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="交错式布局"
      :can-expan="true"
      help-message="多行高度不一致的列"
    >
      <el-row :gutter="15">
        <el-col :lg="14" :xs="24">
          <div class="card">
            <div style="height: 100px; background-color: #d3dce6"></div>
          </div>
          <div class="card">
            <div style="height: 150px; background-color: #e5e9f2"></div>
          </div>
          <div class="card">
            <div style="height: 200px; background-color: #d3dce6"></div>
          </div>
        </el-col>
        <el-col :lg="10" :xs="24">
          <div class="card">
            <div style="height: 215px; background-color: #e5e9f2"></div>
          </div>
          <div class="card">
            <div style="height: 250px; background-color: #d3dce6"></div>
          </div>
        </el-col>
      </el-row>
    </collapse-container>
  </page-wrapper>
</template>
<script lang="ts" setup>
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.card {
  margin-bottom: 15px;
  border-radius: 4px;
}
.card div {
  border-radius: 4px;
}
</style>
