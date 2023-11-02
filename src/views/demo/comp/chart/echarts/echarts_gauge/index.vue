<template>
  <page-wrapper title="示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础仪表盘"
      :can-expan="true"
      help-message="基础仪表盘"
    >
      <base-gauge />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="多标题仪表盘"
      :can-expan="true"
      help-message="多标题仪表盘"
    >
      <gauge-dbt />
    </collapse-container>
  </page-wrapper>
</template>

<!-- 使用setup语法糖的写法 -->
<script lang="ts" setup>
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import BaseGauge from "./components/base-gauge.vue";
import GaugeDbt from "./components/gauge-dbt.vue";
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
