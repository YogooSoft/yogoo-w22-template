<template>
  <page-wrapper title="结果" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message="用于对用户的操作结果或者异常状态做反馈。"
    >
      <el-row>
        <el-col :sm="12" :lg="6">
          <el-result
            icon="success"
            title="Success Tip"
            sub-title="Please follow the instructions"
          >
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6">
          <el-result
            icon="warning"
            title="Warning Tip"
            sub-title="Please follow the instructions"
          >
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6">
          <el-result
            icon="error"
            title="Error Tip"
            sub-title="Please follow the instructions"
          >
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6">
          <el-result icon="info" title="Info Tip">
            <template #sub-title>
              <p>Using slot as subtitle</p>
            </template>
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
      </el-row>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义内容"
      :can-expan="true"
      help-message=""
    >
      <el-result title="404" sub-title="Sorry, request error">
        <template #icon>
          <el-image
            :src="
              require('@/assets/sample_images/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png')
            "
            alt=""
          />
        </template>
        <template #extra>
          <el-button type="primary">Back</el-button>
        </template>
      </el-result>
    </collapse-container>
  </page-wrapper>
</template>
<script lang="ts" setup>
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}
</style>
