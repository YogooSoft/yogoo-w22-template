<template>
  <page-wrapper title="示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础折线图"
      :can-expan="true"
      help-message="基础折线图"
    >
      <base-line />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="平滑折线图"
      :can-expan="true"
      help-message="平滑折线图"
    >
      <line-phzxt />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="面积图"
      :can-expan="true"
      help-message="面积图"
    >
      <line-mjt />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="折线图堆叠"
      :can-expan="true"
      help-message="折线图堆叠"
    >
      <line-zxtdd />
    </collapse-container>

    <collapse-container
      class="cl-mb-10"
      title="堆叠面积图"
      :can-expan="true"
      help-message="堆叠面积图"
    >
      <line-ddmjt />
    </collapse-container>

    <collapse-container
      class="cl-mb-10"
      title="多 X 轴"
      :can-expan="true"
      help-message="多 X 轴"
    >
      <line-dxz />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="多 Y 轴"
      :can-expan="true"
      help-message="多 X 轴"
    >
      <line-dyz />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="时间轴折线图"
      :can-expan="true"
      help-message="时间轴折线图"
    >
      <line-sjzzxt />
    </collapse-container>
  </page-wrapper>
</template>

<!-- 使用setup语法糖的写法 -->
<script lang="ts" setup>
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import BaseLine from "./components/base-line.vue";
import LinePhzxt from "./components/line-phzxt.vue";
import LineMjt from "./components/line-mjt.vue";
import LineZxtdd from "./components/line-zxtdd.vue";
import LineDxz from "./components/line-dxz.vue";
import LineDyz from "./components/line-dyz.vue";
import LineSjzzxt from "./components/line-sjzzxt.vue";
import LineDdmjt from "./components/line-ddmjt.vue";
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
