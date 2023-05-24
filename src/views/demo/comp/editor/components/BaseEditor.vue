<template>
  <div class="fix">
    <el-select
      v-model="selectValue"
      @change="handleModelLanguage(selectValue)"
      placeholder="语法高亮"
      style="margin-right: 10px; width: 150px"
    >
      <el-option
        v-for="item in list"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button plain @click="getValue()">获取内容</el-button>
    <el-button plain @click="getSelection()">获取选中的位置</el-button>
    <el-button plain @click="getSelectionInRange()">获取选中的文本</el-button>
    <el-button plain @click="handleFormat()">格式化</el-button>
  </div>
  <div class="fix">
    <el-button plain @click="setReadOnly()">只读模式</el-button>
    <el-button plain @click="setMiniMap()">打开缩略图</el-button>
    <el-button plain @click="ListeningKey()">定义F9热键</el-button>
    <el-button plain @click="coustomMenu()">定义右键菜单</el-button>
    <el-button plain @click="CodeCompletion()">代码补全</el-button>
    <el-button plain @click="setTheme()">主题</el-button>
    <el-button plain @click="setFocus()">设置焦点</el-button>
  </div>

  <div class="fix" :style="{ height: heights }">
    <div ref="editorContainer_base" class="coder-editor"></div>
    <div ref="editorContainer_right" class="coder-editor"></div>
  </div>
</template>
<script lang="ts" setup>
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  ref,
  toRaw,
  unref,
  reactive,
  computed,
} from "vue";
import { Notification } from "@/hooks/web/useNotification";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
//设置语言包
import { setLocaleData } from "monaco-editor-nls";
// import zh_CN from "vscode-loc/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json";
import zh_CN from "monaco-editor-nls/locale/zh-hans.json";
setLocaleData(zh_CN);
// const monaco = require("monaco-editor/esm/vs/editor/editor.api");
//import * as monaco from 'monaco-editor';
const monaco = require("monaco-editor");

const beautify = require("js-beautify");
const beautify_js = beautify.js;
const beautify_css = beautify.css;
const beautify_html = beautify.html;

interface ListItem {
  value: string;
  label: string;
}
const selectValue = ref("typescript");
const list = ref<ListItem[]>([]);
// let codeValue = `\nfunction x() {
//     console.log("Hello world!");
// }`;
let codeValue_right = ref<any>(null);
let codeValue = 'function x() { console.log("Hello world!");}';
let editorContainer_base = ref<any>(null);
let editorContainer_right = ref<any>(null);

// let editor = ref<any>(null);
let heights = "";
let editor_left;
let editor_right;
var myBinding;

heights = `${unref(window.innerHeight - 81 - 353)}px`;

//得到支持的语言
let modesIds = monaco.languages
  .getLanguages()
  .map((lang) => lang.id)
  .sort();

list.value = modesIds.map((item) => {
  return { value: `${item}`, label: `${item}` };
});

onMounted(() => {
  load();
});

// 选择 Language
function handleModelLanguage(item: any) {
  console.log("--------选择 Language----------", item);
  monaco.editor.setModelLanguage(editor_left.getModel(), item);
}

// 获取信息
function getValue() {
  let textValue = editor_left.getModel();
  const content = textValue.getValue();
  toRaw(editor_right).setValue(content);
}

// 获取选中的行的信息
function getSelection() {
  // console.log("=========获取选中的行信息===========", toRaw(editor).getSelection()); //获取选中的行信息
  const { ln: line, col: column } = getCursorPosition(editor_left);
  // editorContainer_right = { ln: `${line}`, col: `${column}` };
  toRaw(editor_right).setValue("ln:" + line + "\n" + "col:" + column);
}

// 获取选中的文本
function getSelectionInRange() {
  // console.log(
  //   "=========获取选中的文本===========",
  //   toRaw(editor).getModel().getValueInRange(toRaw(editor).getSelection())
  // );
  const content = toRaw(editor_left)
    .getModel()
    .getValueInRange(toRaw(editor_left).getSelection());
  toRaw(editor_right).setValue(content);
}

// 设置只读模式
function setReadOnly() {
  toRaw(editor_left).updateOptions({ readOnly: true });
}

// 设置打开缩略图
function setMiniMap() {
  toRaw(editor_left).updateOptions({ minimap: true });
}

// 设置热键 F9
function ListeningKey() {
  myBinding = toRaw(editor_left).addCommand(monaco.KeyCode.F9, function () {
    alert("F9 pressed!");
  });
}

// 设置右键菜单 “强制格式化”
function coustomMenu() {
  if (!editor_left.addAction["formateCodeForce"]) {
    editor_left.addAction["formateCodeForce"] = true;
    editor_left.addAction({
      id: "formateCodeForce",
      label: "强制格式化",
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
      ],
      contextMenuGroupId: "2_customCommand",
      run(ed, opt) {
        let a = editor_left.getValue();
        let b = beautify_js(a);
        // editorBox.setValue(b)
        editor_left.executeEdits("", [
          {
            range: new monaco.Range(
              1,
              1,
              editor_left.getModel().getLineCount() + 1,
              1
            ),
            text: b,
          },
        ]);
      },
    });
  }
}

// 注册代码自动补全
function CodeCompletion() {
  if (!monaco.languages.registerCompletionItemProvider["javascript"]) {
    monaco.languages.registerCompletionItemProvider["javascript"] = true;
    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems(model, pos) {
        return {
          suggestions: [
            {
              label: "row-col",
              insertText: beautify_js(`[{"cols":[{"span":6},{"span":6}]}]`),
              kind: monaco.languages.CompletionItemKind["Snippet"],
              detail: "插入行列",
            },
            {
              label: "for-full",
              insertText: beautify_js(`for (let i = 0; i < len; i++) {}`),
              kind: monaco.languages.CompletionItemKind["Snippet"],
              detail: "完整for循环",
            },
          ],
          dispose() {
            const line = pos.lineNumber;
            const column = pos.column;
            if (
              model.getValueInRange(
                new monaco.Range(line, column - 1, line, column)
              ) !== "/"
            ) {
              return;
            }
            editor_left.executeEdits("", [
              {
                range: new monaco.Range(line, column - 1, line, column),
                text: null,
              },
            ]);
          },
        };
      },
      triggerCharacters: ["/"],
    });
  }

  Notification.info(
    "",
    "在编辑器中输入 / 后, 会出现“完整for循环”,“插入行列”代码补全示例"
  );
}

// 设置主题样式
function setTheme() {
  toRaw(editor_left).updateOptions({ theme: "vs-dark" });
}

function setMinimapOnOff(editor, option) {
  // option === 'on' / 'off'
  if (option === "on") {
    editor.updateOptions({ minimap: { enabled: true } });
  } else if (option === "off") {
    editor.updateOptions({ minimap: { enabled: false } });
  }
}

// 获取代码
function getCode(editor) {
  return editor.getModel().getValue();
}

// 获取模型
function getModel(editor) {
  return editor.getModel();
}

// 设置焦点
function setFocus() {
  toRaw(editor_left).focus();
  // editor.focus();
}

// 获取当前行、列
function getCursorPosition(editor) {
  let line = editor.getPosition().lineNumber;
  let column = editor.getPosition().column;
  return { ln: line, col: column };
}

// 获取代码长度
function getCodeLength(editor) {
  // chars, including \n, \t !!!
  return editor.getModel().getValueLength();
}

// const modelUri = monaco.Uri.parse("files://code/test.js");
// var model = monaco.editor.getModel(modelUri);
// // if (!model) {
// const jsonModel = monaco.editor.createModel(beautify_js(codeValue), "javascript", modelUri);
// // }

var jsonModel = monaco.editor.createModel(
  beautify_js(codeValue),
  "javascript,typescript",
  monaco.Uri.parse("files://code/test.js")
);

function load() {
  editor_left = monaco.editor.create(editorContainer_base.value, {
    //主题，三款：vs、vs-dark、hc-black
    theme: "vs",
    model: jsonModel,
    // value: beautify_js(codeValue),
    language: "javascript,typescript",
    // folding: true, // 是否折叠
    // foldingHighlight: true, // 折叠等高线
    // foldingStrategy: "indentation", // 折叠方式  auto | indentation
    // showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
    // disableLayerHinting: true, // 等宽优化
    // emptySelectionClipboard: false, // 空选择剪切板
    // selectionClipboard: false, // 选择剪切板
    automaticLayout: true, // 自动布局
    // codeLens: false, // 代码镜头
    // scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
    // colorDecorators: true, // 颜色装饰器
    // accessibilitySupport: "auto", // 辅助功能支持  "auto" | "off" | "on"
    // lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
    // lineNumbersMinChars: 5, // 行号最小字符   number
    // readOnly: false, //是否只读  取值 true | false
    // quickSuggestionsDelay: 500, //代码提示延时
    // fontSize: 14, //字体大小
    // autoIndent: true, //自动布局
    //代码略缩图
    minimap: {
      enabled: false,
    },
    // // 自动换行、缩进
    // wordWrap: "wordWrapColumn",
    // wordWrapColumn: 100,
    // // try "same", "indent" or "none"
    // wrappingIndent: "indent",
  });

  editor_right = monaco.editor.create(editorContainer_right.value, {
    theme: "vs",
    //model: jsonModel,
    value: "",
    language: "javascript,typescript",
    automaticLayout: true,
  });
}

onUnmounted(() => {
  console.log("=============onUnmounted===============");
  if (jsonModel) jsonModel.dispose();
  if (editor_left) editor_left.dispose();
});

const handleFormat = () => {
  let lan = toRaw(editor_left).getModel().getLanguageId();
  console.log(lan);
  let content = toRaw(editor_left).getValue();
  // if (lan == 'sql'){ // 格式化sql
  //   toRaw(editor.value).setValue(format(content))
  // }
  // else
  if (lan == "javascript") {
    // 格式化json
    toRaw(editor_left).trigger("anyString", "editor.action.formatDocument");
    toRaw(editor_left).setValue(content);
  }
};
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
  // height: 689px;
  justify-content: baseline;
}
</style>
