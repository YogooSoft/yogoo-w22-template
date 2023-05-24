<template>
  <div class="fix">
    <div ref="editorDiffContainer" class="coder-editor"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";

//设置语言包
import { setLocaleData } from "monaco-editor-nls";
import zh_CN from "monaco-editor-nls/locale/zh-hans.json";
setLocaleData(zh_CN);
// import * as monaco from 'monaco-editor';
const monaco = require("monaco-editor");

const beautify = require("js-beautify");
const beautify_js = beautify.js;

let editorDiff = ref<any>(null);
let editorDiffContainer = ref<any>(null);
let original = beautify_js('function x() { console.log("Hello world!");}');
let modified = beautify_js(
  'function x() { console.log("Hello world!"); \n // 输出调试信息 \n }'
);

onMounted(() => {
  load();
});

let originalModel = monaco.editor.createModel(original, "typescript");
let modifiedlModel = monaco.editor.createModel(modified, "typescript");

onUnmounted(() => {
  if (originalModel) originalModel.dispose();
  if (modifiedlModel) modifiedlModel.dispose();
  if (editorDiff) editorDiff.dispose();
});

function load() {
  editorDiff = monaco.editor.createDiffEditor(editorDiffContainer.value, {
    // theme: "vs",
    language: "typescript",
    // enableSplitViewResizing: false,
    // originalEditable: true,
    automaticLayout: true,
    readOnly: true,
  });

  editorDiff.setModel({
    original: originalModel,
    modified: modifiedlModel,
  });
}
</script>
<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}
.coder-editor {
  display: fix;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.fix {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  height: 200px;
  justify-content: baseline;
}
</style>
