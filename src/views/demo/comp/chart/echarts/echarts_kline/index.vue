<template>
  <page-wrapper title="示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="K线图"
      :can-expan="true"
      help-message="K线图"
    >
      <base-kline />
    </collapse-container>
  </page-wrapper>
</template>

<!-- 使用setup语法糖的写法 -->
<script lang="ts" setup>
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import BaseKline from "./components/base-kline.vue";
</script>

<style scoped lang="less">
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
</style>
