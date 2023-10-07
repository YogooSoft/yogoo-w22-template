<template>
  <page-wrapper title="ace代码编辑器" content="">
    <collapse-container
      class="cl-mb-10"
      title="ace代码编辑器"
      :can-expan="false"
      :triggerWindowResize="true"
      help-message=""
    >
      <div class="content">
        <div class="fix">
          <span class="lable">主题</span>
          <el-select style="width: 100px" v-model="aceConfig.theme">
            <el-option
              v-for="item in aceConfig.theme_arr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <span class="lable" style="margin-left: 10px">语言</span>
          <el-select
            v-model="aceConfig.lang"
            filterable
            placeholder="语言"
            style="margin-right: 10px; width: 130px"
          >
            <el-option
              v-for="item in aceConfig.lang_arr"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-button plain @click="setReadOnly(true)">设置只读</el-button>
          <el-button plain @click="setReadOnly(false)">关闭只读</el-button>
          <el-button plain @click="getValue()">获取内容</el-button>
          <el-button plain @click="jsonFormat">json代码格式化</el-button>
          <el-button plain @click="jsonNoFormat()">json代码压缩</el-button>
        </div>

        <div class="fix"></div>

        <div class="fix" :style="{ height: heights }">
          <div class="coder-editor">
            <v-ace-editor
              v-model:value="dataForm.textareashow"
              @init="jsonFormat"
              :lang="aceConfig.lang"
              :theme="aceConfig.theme"
              :options="aceConfig.options"
              :readonly="aceConfig.readOnly"
              style="height: 600px"
              class="ace-editor"
            />
          </div>
          <div class="coder-editor">
            <v-ace-editor
              v-model:value="editor_value"
              @init="jsonFormat"
              :lang="aceConfig.lang"
              :theme="aceConfig.theme"
              :options="aceConfig.options"
              :readonly="aceConfig.readOnly"
              style="height: 600px"
              class="ace-editor"
            />
          </div>
        </div>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts" setup>
import { reactive, ref, unref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { Notification } from "@/hooks/web/useNotification";
import { VAceEditor } from "vue3-ace-editor";
// 加了这个【import "ace-builds/webpack-resolver";】可能会报错
//（若报错 则需要安装node.js的一个包 就是主题）
// 命令：npm install --save-dev file-loader
import "ace-builds/webpack-resolver";
// 加载json语言
// import "ace-builds/src-noconflict/mode-json";
// // import "ace-builds/src-noconflict/mode-sql";
// import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";

//ace编辑器配置
const aceConfig = reactive({
  lang: "json", //解析json
  theme: "chrome", //主题
  theme_arr: [
    /*所有主题*/
    "ambiance",
    "chaos",
    "chrome",
    "clouds",
    "clouds_midnight",
    "cobalt",
    "crimson_editor",
    "dawn",
    "dracula",
    "dreamweaver",
    "eclipse",
    "github",
    "gob",
    "gruvbox",
    "idle_fingers",
    "iplastic",
    "katzenmilch",
    "kr_theme",
    "kuroir",
    "merbivore",
    "merbivore_soft",
    "monokai",
    "mono_industrial",
    "pastel_on_dark",
    "solarized_dark",
    "solarized_light",
    "sqlserver",
    "terminal",
    "textmate",
    "tomorrow",
    "tomorrow_night",
    "tomorrow_night_blue",
    "tomorrow_night_bright",
    "tomorrow_night_eighties",
    "twilight",
    "vibrant_ink",
    "xcode",
  ],
  lang_arr: [
    "abap",
    "abc",
    "actionscript",
    "ada",
    "alda",
    "apache_conf",
    "apex",
    "applescript",
    "aql",
    "asciidoc",
    "asl",
    "assembly_x86",
    "autohotkey",
    "batchfile",
    "bibtex",
    "c9search",
    "cirru",
    "clojure",
    "cobol",
    "coffee",
    "coldfusion",
    "crystal",
    "csharp",
    "csound_document",
    "csound_orchestra",
    "csound_score",
    "csp",
    "css",
    "curly",
    "cuttlefish",
    "c_cpp",
    "d",
    "dart",
    "diff",
    "django",
    "dockerfile",
    "dot",
    "drools",
    "edifact",
    "eiffel",
    "ejs",
    "elixir",
    "elm",
    "erlang",
    "forth",
    "fortran",
    "fsharp",
    "fsl",
    "ftl",
    "gcode",
    "gherkin",
    "gitignore",
    "glsl",
    "gobstones",
    "golang",
    "graphqlschema",
    "groovy",
    "haml",
    "handlebars",
    "haskell",
    "haskell_cabal",
    "haxe",
    "hjson",
    "html",
    "html_elixir",
    "html_ruby",
    "ini",
    "io",
    "ion",
    "jack",
    "jade",
    "java",
    "javascript",
    "jexl",
    "json",
    "json5",
    "jsoniq",
    "jsp",
    "jssm",
    "jsx",
    "julia",
    "kotlin",
    "latex",
    "latte",
    "less",
    "liquid",
    "lisp",
    "livescript",
    "logiql",
    "logtalk",
    "lsl",
    "lua",
    "luapage",
    "lucene",
    "makefile",
    "markdown",
    "mask",
    "matlab",
    "maze",
    "mediawiki",
    "mel",
    "mips",
    "mixal",
    "mushcode",
    "mysql",
    "nginx",
    "nim",
    "nix",
    "nsis",
    "nunjucks",
    "objectivec",
    "ocaml",
    "odin",
    "partiql",
    "pascal",
    "perl",
    "pgsql",
    "php",
    "php_laravel_blade",
    "pig",
    "plain_text",
    "plsql",
    "powershell",
    "praat",
    "prisma",
    "prolog",
    "properties",
    "protobuf",
    "puppet",
    "python",
    "qml",
    "r",
    "raku",
    "razor",
    "rdoc",
    "red",
    "redshift",
    "rhtml",
    "robot",
    "rst",
    "ruby",
    "rust",
    "sac",
    "sass",
    "scad",
    "scala",
    "scheme",
    "scrypt",
    "scss",
    "sh",
    "sjs",
    "slim",
    "smarty",
    "smithy",
    "snippets",
    "soy_template",
    "space",
    "sparql",
    "sql",
    "sqlserver",
    "stylus",
    "svg",
    "swift",
    "tcl",
    "terraform",
    "tex",
    "text",
    "textile",
    "toml",
    "tsx",
    "turtle",
    "twig",
    "typescript",
    "vala",
    "vbscript",
    "velocity",
    "verilog",
    "vhdl",
    "visualforce",
    "wollok",
    "xml",
    "xquery",
    "yaml",
    "zeek",
  ],
  //是否只读
  readOnly: false,
  // 设置代码编辑器的样式
  options: {
    // 启用基本自动完成
    enableBasicAutocompletion: true,
    // 启用代码段
    enableSnippets: true,
    // 启用实时自动完成
    enableLiveAutocompletion: true,
    // 标签大小
    tabSize: 2,
    // 设置字号
    fontSize: 14,
    // 去除编辑器里的竖线(代码长度标记线)
    showPrintMargin: false,
    // 高亮当前行
    highlightActiveLine: true,
    // 使用辅助对象 语法错误标注
    useWorker: true,
    // 显示参考线
    displayIndentGuides: true,
    //显示行号区域
    showGutter: true,
    //显示行号
    showLineNumbers: true,
  },
});

let editor_value = ref("");

let heights = "";
heights = `${unref(window.innerHeight - 81 - 353)}px`;

//form
const dataForm = reactive({
  textareashow:
    '{"took" : 5,"timed_out" : false,"_shards" : {"total" : 1,"successful" : 1,"skipped" : 0, "failed" : 0 }}',
});

const jsonError = (e) => {
  console.log(`JSON字符串错误：${e.message}`);
};

// JSON格式化
const jsonFormat = () => {
  try {
    dataForm.textareashow = JSON.stringify(
      JSON.parse(dataForm.textareashow),
      null,
      2
    );
  } catch (e) {
    jsonError(e);
  }
};

// JSON压缩
const jsonNoFormat = () => {
  try {
    dataForm.textareashow = JSON.stringify(JSON.parse(dataForm.textareashow));
  } catch (e) {
    jsonError(e);
  }
};

// 获取编辑器值
const getValue = () => {
  try {
    editor_value.value = dataForm.textareashow;
  } catch (e) {
    jsonError(e);
  }
};

// 设置只读
function setReadOnly(status) {
  if (status === true) {
    aceConfig.readOnly = status;
    Notification.success("", "设置只读模式成功");
  } else {
    aceConfig.readOnly = status;
    Notification.info("", "只读模式关闭");
  }
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
