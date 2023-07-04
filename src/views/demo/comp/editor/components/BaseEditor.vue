<template>
  <div class="fix">
    <span class="lable">主题</span>
    <el-select
      style="width: 100px"
      v-model="setThemeValue"
      @change="setTheme(setThemeValue)"
    >
      <el-option
        v-for="(item, index) in optionsTheme"
        :key="index"
        :label="item.name"
        :value="item.Theme"
      ></el-option>
    </el-select>
    <span class="lable" style="margin-left: 10px">语言</span>
    <el-select
      v-model="selectValue"
      @change="handleModelLanguage(selectValue)"
      placeholder="语法高亮"
      style="margin-right: 10px; width: 130px"
    >
      <el-option
        v-for="item in list"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button plain @click="custom_theme()">自定义主题</el-button>    
    <el-button plain @click="getValue()">获取内容</el-button>
    <el-button plain @click="getSelection()">获取选中的位置</el-button>
    <el-button plain @click="getSelectionInRange()">获取选中的文本</el-button>
    <el-button plain @click="getCodeLengthMsg()">获取代码长度</el-button>
  </div>
  <div class="fix">
    <el-button plain @click="setFocus()">设置焦点</el-button>
    <el-button plain @click="setReadOnly(true)">设置只读</el-button>
    <el-button plain @click="setReadOnly(false)">关闭只读</el-button>
    <el-button plain @click="setMiniMap(true)">打开缩略图</el-button>
    <el-button plain @click="setMiniMap(false)">关闭缩略图</el-button>
    <el-button plain @click="ListeningKey()">定义F9热键</el-button>
    <el-button plain @click="coustomMenu()">定义右键菜单</el-button>
  </div>
  <div class="fix">
    <el-button plain @click="handleFormat()">代码格式化</el-button>
    <el-button plain @click="CodeCompletion()">注册语言提示器</el-button>
    <el-button plain @click="registerHover()">注册鼠标悬停提示</el-button>
  </div>

  <div class="fix" :style="{ height: heights }">
    <div ref="editorContainer_baseRef" class="coder-editor"></div>
    <div ref="editorContainer_rightRef" class="coder-editor"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, toRaw, unref } from "vue";
import { Notification } from "@/hooks/web/useNotification";
//设置语言包
import { setLocaleData } from "monaco-editor-nls";
import zh_CN from "monaco-editor-nls/locale/zh-hans.json";
setLocaleData(zh_CN);
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
let codeValue_right = ref<any>(null);

let codeValue = 'function x() {console.log("Hello world!");}';

// let editorContainer_baseRef = ref<any>(null);
// let editorContainer_rightRef = ref<any>(null);

let editorContainer_baseRef = ref(null);
let editorContainer_rightRef = ref(null);

// let editor = ref<any>(null);
let heights = "";
let editor_left;
let editor_right;
var myBinding;

heights = `${unref(window.innerHeight - 81 - 353)}px`;

const setThemeValue = ref("vs");
const optionsTheme = [
  { name: "默认白色", Theme: "vs" },
  { name: "黑色", Theme: "vs-dark" },
  { name: "高对比度", Theme: "hc-black" },
];

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
  const { ln: line, col: column } = getCursorPosition(editor_left);
  // editorContainer_right = { ln: `${line}`, col: `${column}` };
  toRaw(editor_right).setValue("ln:" + line + "\n" + "col:" + column);
}

// 获取选中的文本
function getSelectionInRange() {
  const content = toRaw(editor_left)
    .getModel()
    .getValueInRange(toRaw(editor_left).getSelection());
  toRaw(editor_right).setValue(content);
}

// 设置只读模式
function setReadOnly(status) {
  toRaw(editor_left).updateOptions({ readOnly: status });
  if (status === true) {
    Notification.success("", "设置只读模式成功");
  } else {
    Notification.info("", "只读模式关闭");
  }
}

function setMiniMap(status) {
  toRaw(editor_left).updateOptions({ minimap: { enabled: status } });
  if (status === true) {
    Notification.success("", "打开缩略图成功");
  } else {
    Notification.info("", "缩略图关闭");
  }
}

// 设置热键 F9
function ListeningKey() {
  myBinding = toRaw(editor_left).addCommand(monaco.KeyCode.F9, function () {
    Notification.info("", "侦听到按下 F9 键");
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
        // 代码格式化
        let b = beautify_js(a);
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
    Notification.success("", "设置鼠标右键菜单 “强制格式化” 成功.");
  } else {
    Notification.info("", "鼠标右键菜单 “强制格式化” 已设置过了.");
  }
}

// 注册语言提示器
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

  Notification.success(
    "",
    "在编辑器中输入 / 后, 会出现 “完整for循环” , “插入行列” 代码补全示例"
  );
}

let registerHoverCount = 0;
// 注册鼠标悬停提示
function registerHover() {
  if (registerHoverCount === 0) {
    registerHoverCount += 1;
    monaco.languages.registerHoverProvider("javascript", {
      // 光标移入提示功能
      provideHover: function (model, position, token) {
        const lineword = model.getLineContent(position.lineNumber); // 获取光标悬停所在行的所有内容
        const word = model.getWordAtPosition(position)?.word; // 获取光标悬停的单词
        if (word === "name") {
          return {
            contents: [
              { value: `${word}` },
              {
                value: ["这是 name 的一些介绍", "光标移入提示功能"].join(
                  "\n\n"
                ),
              },
            ],
          };
        } else if (undefined !== word) {
          return {
            contents: [
              { value: `${word}` },
              {
                value: [lineword].join("\n\n"),
              },
            ],
          };
        }
      },
    });
  }

  Notification.success(
    "",
    "在编辑器中输入 name 后, 用将鼠标放到 name 上，会弹出自定义提示话术"
  );
}

function custom_theme() {
  monaco.editor.defineTheme("Yogoo", {
    base: "vs-drak",
    inherit: true,
    rules: [{ background: "#081641" }],
    colors: {
      // 相关颜色属性配置
      "editor.background": "#081641",
      // "editor.foreground': '#0eeeeg'
      // "editor.lineHighlightBackground': "#0e0FF20.
      // 'editorLineNumber.foreground':#998899
      // 'editor.selectionBackground': "#88000030"
      // "editor.inactiveSelectionBackground": "#88000015
    },
  });

  setTheme("Yogoo");
  Notification.success(
    "",
    "现在正在使用定义主题 “Yogoo” "
  );
}

// 设置主题样式
function setTheme(name = "vs") {
  // 主题，三款：vs、vs-dark、hc-black
  toRaw(editor_left).updateOptions({ theme: name });
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
  Notification.success("", "设置焦点到左侧代码框成功.");
}

// 获取当前行、列
function getCursorPosition(editor) {
  let line = editor.getPosition().lineNumber;
  let column = editor.getPosition().column;
  return { ln: line, col: column };
}

// 获取代码长度
function getCodeLength(editor) {
  return editor.getModel().getValueLength();
}
function getCodeLengthMsg() {
  let msg = editor_left.getModel().getValueLength();
  Notification.success("", "代码长度为:" + msg);
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
  editor_left = new monaco.editor.create(editorContainer_baseRef.value, {
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

  editor_right = monaco.editor.create(editorContainer_rightRef.value, {
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

.lable {
  // height: inherit;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
</style>
