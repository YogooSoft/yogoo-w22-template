<template>
  <page-wrapper title="示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="漏斗图"
      :can-expan="true"
      help-message="漏斗图"
    >
      <base-funnel />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="漏斗图(对比)"
      :can-expan="true"
      help-message="漏斗图(对比)"
    >
      <funnel-db />
    </collapse-container>
  </page-wrapper>
</template>

<!-- 使用setup语法糖的写法 -->
<script lang="ts" setup>
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import BaseFunnel from "./components/base-funnel.vue";
import FunnelDb from "./components/funnel-db.vue";
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
