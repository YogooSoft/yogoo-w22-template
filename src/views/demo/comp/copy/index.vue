<template>
  <page-wrapper title="剪切板示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="剪切板示例"
      :can-expan="true"
      help-message="复制输入内容至剪切板"
    >
      <div >
        <span class="flex-1">
          <el-input  placeholder="请输入" v-model="value" style="margin: 0 10px;"/>
          <el-button :plain="true" @click="handleCopy()">复制</el-button>
        </span>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { useCopyToClipboard } from "@/hooks/web/useCopyToClipboard";
import { message } from "@/hooks/web/useMessage";

export default defineComponent({
  name: "copy",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const valueRef = ref("");
    //   const { createMessage } = message();
    const { clipboardRef, copiedRef } = useCopyToClipboard();

    function handleCopy() {
      const value = unref(valueRef);
      if (!value) {
        message.warning("请输入要拷贝的内容！");
        return;
      }
      clipboardRef.value = value;
      if (unref(copiedRef)) {
        message.warning("已经复制到剪切板！");
      }
    }

    return { handleCopy, value: valueRef };
  },
});
</script>

<style lang="less" scoped>
.flex-1 {
 // flex: 1;
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cl-mb-10 {
  margin-bottom: 10px;
}
</style>
