<template>
  <page-wrapper title="Tip提示框示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="Tip提示框示例"
      :can-expan="true"
      help-message=""
    >
      <div class="tip primary">
        <span>这是一条提示信息</span>
      </div>
      <div class="tip success">
        <span>这是一条提示信息</span>
      </div>

      <div class="tip info">
        <span>这是一条提示信息</span>
      </div>
      <div class="tip warning">
        <span>这是一条提示信息</span>
      </div>
      <div class="tip danger">
        <span>这是一条提示信息</span>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts" setup>
import { defineComponent, computed, ref, unref } from "vue";
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
.el-alert {
  margin-bottom: 10px;
}

.el-button + .el-button {
  margin-left: 8px;
}
.tip {
  padding: 10px 16px;
  border-radius: 4px;
  margin: 16px 0;
}
.tip span {
  margin-top: 10px;
}
.primary {
  border-left: 3px solid #50bfff;
  background-color: #ecf5ff;
}
.warning {
  border-left: 3px solid #ebb562;
  background-color: #fdf6ec;
}
.success {
  border-left: 3px solid #67c23a;
  background-color: #f0f9eb;
}
.info {
  border-left: 3px solid #909399;
  background-color: #dedfe1;
}
.danger {
  border-left: 3px solid #f78989;
  background-color: #fef0f0;
}
</style>
