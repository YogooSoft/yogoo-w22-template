<template>
  <page-wrapper title="代码编辑器" content="">
    <collapse-container
      class="cl-mb-10"
      title="代码编辑器控制"
      :can-expan="false"
      :triggerWindowResize="true"
      help-message=""
    >
      <base-editor />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="版本对比"
      :can-expan="false"
      :triggerWindowResize="true"
      help-message=""
    >
      <diff-editor />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义显示"
      :can-expan="false"
      :triggerWindowResize="true"
      help-message=""
    >
      <coustom-language />
    </collapse-container>
  </page-wrapper>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

import BaseEditor from "./components/BaseEditor.vue";
import CoustomLanguage from "./components/CoustomLanguage.vue";
import DiffEditor from "./components/DiffEditor.vue";

export default defineComponent({
  name: "Editor",
  components: {
    PageWrapper,
    CollapseContainer,
    BaseEditor,
    CoustomLanguage,
    DiffEditor,
  },
  props: {
    // editorOptions: {
    //   type: Object,
    //   default: function () {
    //     return {
    //       selectOnLineNumbers: true,
    //       roundedSelection: false,
    //       readOnly: true, // 只读
    //       cursorStyle: "line", //光标样式
    //       automaticLayout: false, //自动布局
    //       glyphMargin: true, //字形边缘
    //       useTabStops: false,
    //       fontSize: 28, //字体大小
    //       autoIndent: true, //自动布局
    //       quickSuggestionsDelay: 500, //代码提示延时
    //       language: "json", //语言
    //     };
    //   },
    // },
  },
  setup(props) {
    return {};
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}
</style>
