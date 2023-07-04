<template>
  <el-backtop :right="10" :bottom="10"  />
  <page-wrapper title="关于" content="">
    <collapse-container
      class="cl-mb-10"
      title="项目信息"
      :can-expan="false"
      help-message="项目信息"
    >
      <yui-description
        :column="infoProject.column"
        :data="infoProject.data"
        :border="true"
      ></yui-description>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="生产环境依赖"
      :can-expan="false"
      help-message=""
    >
      <yui-description
        :column="prodSchemaData.column"
        :data="prodSchemaData.data"
      ></yui-description>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="开发环境依赖"
      :can-expan="false"
      help-message=""
    >
      <yui-description
        :column="prodSchemaData.column"
        :data="devSchemaData.data"
      ></yui-description>
    </collapse-container>
  </page-wrapper>
</template>
<script lang="ts">
import { defineComponent, computed, h, unref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { useTodoStore } from "@/store/modules/todo";
import { YuiDescription } from "@/components/Description/index";
import { GITHUB_URL, SITE_URL, DOC_URL } from "@/settings/siteSetting";
import {
  ElDescriptions,
  ElDescriptionsItem,
  ElTag,
  ElBacktop,
} from "element-plus";
import moment from "moment";

const { compileTime } = require("/version.json");

const {
  name,
  version,
  author,
  dependencies,
  devDependencies,
} = require("/package.json");

export default defineComponent({
  name: "About",
  components: {
    YuiDescription,
    PageWrapper,
    CollapseContainer,
    ElTag,
    ElBacktop,
  },
  setup() {
    const todo = useTodoStore();
    const title = computed(() => todo.title);
    // const version = computed(() => todo.version);

    // const enum RenderType {
    //   "success",
    //   "warning",
    //   "info",
    //   "danger",
    //   unknown,
    // }

    const lastBuildTime = moment(compileTime.compileTime).format(
      "YYYY/MM/DD hh:mm:ss"
    );

    const commonTagRender = (content: string) => (curVal) =>
      h(ElTag, { type: "", size: "small" }, () => content);

    const commonLinkRender = (text: string, url: string) => (href) =>
      h("a", { href: url, target: "_blank" }, text);

    const prodSchema: any = [];
    const devSchema: any = [];

    const infoSchema = [
      {
        label: "项目名称",
        field: name,
      },
      {
        label: "版本",
        field: commonTagRender(version),
      },
      {
        label: "最后编译时间",
        field: lastBuildTime,
        span: 2,
      },
      {
        label: "文档地址",
        field: commonLinkRender(DOC_URL, DOC_URL),
        align: "left",
        labelAlign: "left",
        span: 2,
      },
      {
        label: "预览地址",
        field: commonLinkRender("preview", SITE_URL),
        span: 2,
      },
      {
        label: "Github",
        field: commonLinkRender(GITHUB_URL, GITHUB_URL),
        span: 2,
      },
    ];

    Object.keys(dependencies).forEach((key) => {
      prodSchema.push({ field: dependencies[key], label: key });
    });

    Object.keys(devDependencies).forEach((key) => {
      devSchema.push({ field: devDependencies[key], label: key });
    });

    const infoProject = {
      title: "项目信息",
      data: infoSchema,
      column: 2,
    };

    const prodSchemaData = {
      title: "生产环境依赖",
      data: prodSchema,
      column: 3,
    };

    const devSchemaData = {
      title: "开发环境依赖",
      data: devSchema,
      column: 3,
    };

    return {
      title,
      version,
      infoProject,
      prodSchemaData,
      devSchemaData,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}
.cl-mb-10-top {
  margin-top: 10px;
}

:deep(a) {
  color: #2a7dc9;
  text-decoration: none;
  // background-color: cadetblue;
}
</style>
