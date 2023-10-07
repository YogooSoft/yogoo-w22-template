<template>
  <page-wrapper title="富文本编辑器" content="富文本编辑器">
    <collapse-container
      class="cl-mb-10"
      title="富文本编辑器"
      :can-expan="true"
      help-message="富文本编辑器"
    >
      <TEditor
        ref="editor"
        v-model="formState.contents"
        :menubar="menubar"
        :min_height="min_height"
        :max_height="max_height"
        @getContent="getContent"
      />
    </collapse-container>
  </page-wrapper>
  <!-- <el-button @click="getEditValue">点击打印编辑器内容</el-button> -->
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import TEditor from "@/components/TEditor/TEditor.vue";

export default defineComponent({
  name: "tabs",
  components: { CollapseContainer, PageWrapper, TEditor },

  setup(props) {
    // 显示顶部菜单
    const menubar = ref(false);
    // 富文本内容
    const formState = reactive({ contents: "" });
    const getContent = (v: string) => {
      // 获取富文本内容
      formState.contents = v;
    };
    // 自动高度最小值
    const min_height = ref(400);
    // 自动高度最大值
    const max_height = ref(600);

    // 富文本中的内容实时存放在 变量 formState 中
    function getEditValue() {
      console.log("editvalue==", formState);
    }

    return {
      formState,
      getContent,
      min_height,
      max_height,
      getEditValue,
      menubar,
    };
  },
});
</script>

<style lang="less" scoped></style>
