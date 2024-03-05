<template>
  <div class="affix-container2" style="height: 100px; background-color: red">
    <el-affix :offset="120" :z-index="1000" target=".affix-container2">
      <el-button type="primary">Offset top 120px</el-button>
    </el-affix>
  </div>

  <div class="affix-container">
    <el-affix target=".affix-container" position="bottom" :offset="80">
      <el-button type="primary">Target container</el-button>
    </el-affix>
  </div>
  <el-affix position="bottom" :offset="20">
    <el-button type="primary">Offset bottom 20px</el-button>
  </el-affix>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
// import { PageWrapper } from "@/components/Page";
// import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "affix",
  components: {},

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

.affix-container {
  text-align: center;
  height: 300px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
}
</style>
