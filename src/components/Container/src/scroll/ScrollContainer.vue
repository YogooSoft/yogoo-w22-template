<template>
  <el-scrollbar class="scroll-container"><slot></slot></el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref, unref, nextTick } from "vue";


export default defineComponent({
  name: "ScrollContainer",
  components: {  },
  setup() {

    return {
      scrollTo,
    };
  },
});
</script>
<style lang="less">
.scroll-container {
  width: 100%;
  height: 100%;

  .scrollbar__wrap {
    margin-bottom: 18px !important;
    overflow-x: hidden;
  }

  .scrollbar__view {
    box-sizing: border-box;
  }
}
</style>
