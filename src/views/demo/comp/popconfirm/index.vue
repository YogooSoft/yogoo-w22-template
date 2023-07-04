<template>
  <page-wrapper
    title="气泡确认框示例"
    content="点击某个元素弹出一个简单的气泡确认框"
  >
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message="Popconfirm 的属性与 Popover 很类似， 因此对于重复属性，请参考 Popover 的文档，在此文档中不做详尽解释。"
    >
      <el-popconfirm title="Are you sure to delete this?">
        <template #reference>
          <el-button>Delete</el-button>
        </template>
      </el-popconfirm>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义弹出框的内容"
      :can-expan="true"
      help-message="可以在 Popconfirm 中自定义内容。"
    >
      <el-popconfirm
        width="220"
        confirm-button-text="OK"
        cancel-button-text="No, Thanks"
        :icon="InfoFilled"
        icon-color="#626AEF"
        title="Are you sure to delete this?"
      >
        <template #reference>
          <el-button>Delete</el-button>
        </template>
      </el-popconfirm>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="多种让 Popconfirm 出现的方法"
      :can-expan="true"
      help-message="点击按钮触发事件"
    >
      <el-popconfirm
        confirm-button-text="Yes"
        cancel-button-text="No"
        :icon="InfoFilled"
        icon-color="#626AEF"
        title="Are you sure to delete this?"
        @confirm="confirmEvent"
        @cancel="cancelEvent"
      >
        <template #reference>
          <el-button>Delete</el-button>
        </template>
      </el-popconfirm>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { InfoFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "popconfirm",
  components: { CollapseContainer, PageWrapper, InfoFilled },

  setup(props) {
    const confirmEvent = () => {
      ElMessage({
        type: "info",
        message: "confirm",
      });
      //   console.log("confirm!");
    };
    const cancelEvent = () => {
      ElMessage({
        type: "info",
        message: "cancel",
      });
      //   console.log("cancel!");
    };
    return { InfoFilled, confirmEvent, cancelEvent };
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
</style>
