<template>
  <page-wrapper title="空状态" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message="用空状态时的占位提示。"
    >
      <el-empty description="description" />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义图片"
      :can-expan="true"
      help-message=""
    >
      <el-empty
        :image="
          require('@/assets/sample_images/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png')
        "
      />
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
