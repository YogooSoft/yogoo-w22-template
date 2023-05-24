<template #title="{ close, titleId, titleClass }" class="my-drawer">
  <div class="my-header">
    <div class="windows-title">{{ title }}</div>
    <div class="tools">
      <el-button
        v-show="showClose"
        plain
        icon="Close"
        size="small"
        class="icon-size-menu"
        @click="closeWindowsClick"
      ></el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, reactive, toRefs } from "vue";

export default defineComponent({
  name: "yuiDrawerHeader",
  components: {},
  // inheritAttrs: false,
  emits: ["close"],
  props: {
    // 抽屉标题
    title: { type: String, default: "" },
    // 是否显示关闭按钮
    showClose: { type: Boolean, default: false },
  },

  setup(props, content) {
    /**
     * 关闭窗口
     */
    function closeWindowsClick() {
      content.emit("close", {});
    }

    return {
      closeWindowsClick,
    };
  },
});
</script>

<style lang="less" scoped>
.my-header {
  width: 100%;
  height: 28px;
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  border-top: 0px;
  // border-bottom: 1px solid #606266;
  .el-button {
    border: none;
    // margin-right: -15px;
  }
}


.icon-size-menu {
  font-size: 16px;
  padding: 0px 10px;
}

.windows-title {
  font-size: 13px;
  color: #606266;
  padding: 0px 2px;
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.tools {
  float: right;
  display: flex;
  border: none;
}


</style>
