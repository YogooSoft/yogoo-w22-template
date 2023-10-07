<template>
  <page-wrapper title="终端控制台" content="终端控制台">
    <collapse-container
      class="cl-mb-10"
      title="终端控制台"
      :can-expan="true"
      help-message="终端控制台"
    >
      <div style="height: 500px">
        <terminal
          :name="name"
          @execCmd="onExecCmd"
          @onClick="btClick"
          :title="title_cmd"
          :show-header="show_header"
          :context="context_cmd"
          :init-log="init_log"
          :auto-help="auto_help"
          :warn-log-count-limit="warn_log_count_limit"
          :enable-example-hint="enable_example_hint"
          :command-store="command_store"
          :drag-conf="drag_conf"
        >
          <!-- <template #header>使用插槽进行自定义样式 </template> -->
        </terminal>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts" setup>
import { Ref, ref, reactive } from "vue";
import { onMounted } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import Terminal from "vue-web-terminal";
// Terminal实例名称，同一页面的name必须唯一，Api中使用也需用到此值
let name = ref("w22-terminal");
// 是否显示header，此开关会影响拖拽功能
let show_header = ref(true);
// 窗口标题
let context_cmd = ref("yogoo\\w22\\terminal");
// 控制显示输入行文本头
let title_cmd = ref("标题");
// erminal初始化时显示的日志，是由消息对象组成的数组，设为null则不显示
let init_log = ref([
  {
    type: "normal",
    content: "这里是自定义log信息",
  },
  {
    type: "normal",
    class: "info",
    tag: "输入update查看自定义提示效果",
  },
  {
    type: "normal",
    class: "system",
    tag: "双击窗口顶部可实现全屏，单击可进行拖动",
  },
  {
    type: "normal",
    class: "success",
    tag: "输入如下命令查看不同显示效果：normal,json,code,table,html",
    // content: "normal,json,code,table,html",
  },
  {
    type: "normal",
    content: "yogoo-w22-template",
  },
]);
// 是否启用命令行自动搜索提示功能。
let auto_help = ref(true);
// 如果启用了自动帮助，是否显示示例提示。
let enable_example_hint = ref(true);
// 当前Terminal显示的日志条数超出此限制会发出警告，设一个<= 0的值将不发出警告
let warn_log_count_limit = 100;
// 自定义命令库，搜索提示功能将扫描此库
let command_store = ref([
  {
    key: "update",
    title: "update",
    group: "local",
    usage: "update [自定义]",
    description: "命令说明",
    example: [
      {
        des: "更新所有",
        cmd: "update *",
      },
      {
        des: "更新指定内容",
        cmd: "update X",
      },
    ],
  },
]);
// 拖拽窗口配置项，如果不配置此项宽高将会100%填充父元素，窗口宽高等同于父元素宽高
let drag_conf = ref({ width: 700, height: 500, init: { x: 550, y: 150 } });

function btClick(key, name) {
  if (key === "close" && name === "w22-terminal") {
    // 官方示例可能不支持
    name = "";
    Terminal.$api.textEditorClose("w22-terminal");
  }
}

function onExecCmd(key, command, success, failed) {
  if (key === "fail") {
    failed("错误信息!!!");
  } else if (key === "normal") {
    success({
      type: "normal",
      class: "success",
      tag: "成功",
      content: "这是普通文本",
    });
  } else if (key === "json") {
    success({
      type: "json",
      class: "success",
      tag: "成功",
      content: {
        key: "value",
        num: 1,
      },
    });
  } else if (key === "code") {
    success({
      type: "code",
      class: "success",
      tag: "成功",
      content: "import Terminal from 'vue-web-terminal'\n\nVue.use(Terminal)",
    });
  } else if (key === "table") {
    success({
      type: "table",
      class: "success",
      tag: "成功",
      content: {
        head: ["title1", "title2", "title3", "title4"],
        rows: [
          ["name1", "hello world", "this is a test1", "xxxxxxxx"],
          ["name2", "hello world", "this is a test2 test2", "xxxxxxxx"],
        ],
      },
    });
  } else if (key === "html") {
    success({
      type: "html",
      class: "success",
      tag: "成功",
      content: `
          <ul class="custom-content">
            <li class="t-dir">dir 1</li>
            <li class="t-dir">dir 2</li>
            <li class="t-dir">dir 3</li>
            <li class="t-file">file 1</li>
            <li class="t-file">file 2</li>
            <li class="t-file">file 3</li>
          </ul>
          `,
    });
  } else {
    let allClass = ["success", "error", "system", "info", "warning"];

    let clazz = allClass[Math.floor(Math.random() * allClass.length)];
    success({
      type: "normal",
      class: clazz,
      tag: "成功",
      content: command,
    });
  }
}

onMounted(() => {});
</script>

<style lang="less" scoped></style>
