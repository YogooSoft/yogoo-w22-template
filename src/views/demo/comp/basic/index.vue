<template>
  <page-wrapper title="基础示例" content="" :dense="true">
    <collapse-container
      class="cl-mb-10"
      title="字号"
      :can-expan="false"
      help-message="统一字体规范，力求在各个操作系统上都有最佳的展示效果"
    >
      <div class="flex-1">
        <span>
          <table class="demo-typo-size">
            <tbody>
              <tr>
                <td width="150px">Level</td>
                <td width="200px"></td>
                <td width="250px">Font Size</td>
                <td width="150px">Demo</td>
              </tr>
              <tr
                v-for="(fontSize, i) in fontSizes"
                :key="i"
                :style="`font-size: var(--el-font-size-${fontSize.type})`"
              >
                <td>{{ fontSize.text }}</td>
                <td>{{ fontSize.level }}</td>
                <td>
                  {{
                    useCssVar(`--el-font-size-${fontSize.type}`).value +
                    " " +
                    formatType(fontSize.type)
                  }}
                </td>
                <td>悦高软件</td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="数字(商用字体,可能需要向字体公司支付授权费)"
      :can-expan="false"
      help-message="商用数字专用字体,可能需要向字体公司支付授权费"
    >
      <div class="number-content">
        <table class="demo-typo-size">
          <tbody>
            <tr>
              <td width="250px">Font Size</td>
              <td width="150px">Demo</td>
            </tr>
            <tr
              v-for="(fontSize, i) in fontSizes"
              :key="i"
              :style="`font-size: var(--el-font-size-${fontSize.type})`"
            >
              <td>
                {{
                  useCssVar(`--el-font-size-${fontSize.type}`).value +
                  " " +
                  formatType(fontSize.type)
                }}
              </td>
              <td>1234567890</td>
            </tr>
          </tbody>
        </table>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="主题预设颜色"
      :can-expan="false"
      help-message=""
    >
      <div class="flex-1">
        <span>
          <!-- 颜色模板显示 -->
          <table class="demo-typo-size">
            <tbody>
              <tr>
                <td width="150px">Level</td>
                <td width="250px">Color</td>
                <td width="150px">Demo</td>
                <td width="100px"></td>
              </tr>
              <tr
                v-for="(color, i) in colors"
                :key="i"
                :style="`color: ${color.value}`"
              >
                <td>{{ color.level }}</td>
                <td>{{ color.value }}</td>
                <td>悦高软件</td>
                <td :style="`background: ${color.value}`"></td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="标题预设颜色"
      :can-expan="false"
      help-message=""
    >
      <div class="flex-1">
        <span>
          <!-- 颜色模板显示 -->
          <table class="demo-typo-size">
            <tbody>
              <tr>
                <td width="150px">Level</td>
                <td width="250px">Color</td>
                <td width="150px">Demo</td>
                <td width="100px"></td>
              </tr>
              <tr
                v-for="(color, i) in colors1"
                :key="i"
                :style="`color: ${color.value}`"
              >
                <td>{{ color.level }}</td>
                <td>{{ color.value }}</td>
                <td>悦高软件</td>
                <td :style="`background: ${color.value}`"></td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="前景颜色页面预设颜色"
      :can-expan="false"
      help-message=""
    >
      <div class="flex-1">
        <span>
          <!-- 颜色模板显示 -->
          <table class="demo-typo-size">
            <tbody>
              <tr>
                <td width="150px">Level</td>
                <td width="250px">Color</td>
                <td width="150px">Demo</td>
                <td width="100px"></td>
              </tr>
              <tr
                v-for="(color, i) in colors2"
                :key="i"
                :style="`color: ${color.value}`"
              >
                <td>{{ color.level }}</td>
                <td>{{ color.value }}</td>
                <td>悦高软件</td>
                <td :style="`background: ${color.value}`"></td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref, toRefs, reactive } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { useCssVar } from "@vueuse/core";

export default defineComponent({
  name: "demoBasic",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const colors = [
      { level: "1", value: "#0960bd" },
      { level: "2", value: "#0084f4" },
      { level: "3", value: "#009688" },
      { level: "4", value: "#536dfe" },
      { level: "5", value: "#ff5c93" },
      { level: "6", value: "#ee4f12" },
      { level: "7", value: "#0096c7" },
      { level: "8", value: "#9c27b0" },
      { level: "9", value: "#ff9800" },
    ];

    const colors1 = [
      { level: "1", value: "#ffffff" },
      { level: "2", value: "#151515" },
      { level: "3", value: "#009688" },
      { level: "4", value: "#5172DC" },
      { level: "5", value: "#018ffb" },
      { level: "6", value: "#409eff" },
      { level: "7", value: "#e74c3c" },
      { level: "8", value: "#24292e" },
      { level: "9", value: "#394664" },
      { level: "10", value: "#001529" },
      { level: "11", value: "#383f45" },
    ];

    const colors2 = [
      { level: "1", value: "#001529" },
      { level: "2", value: "#212121" },
      { level: "3", value: "#273352" },
      { level: "4", value: "#ffffff" },
      { level: "5", value: "#191b24" },
      { level: "6", value: "#191a23" },
      { level: "7", value: "#304156" },
      { level: "8", value: "#001628" },
      { level: "9", value: "#28333E" },
      { level: "10", value: "#344058" },
      { level: "11", value: "#383f45" },
    ];

    const fontSizes = [
      {
        level: "Supplementary text",
        type: "extra-small",
        text: "辅助文字",
      },
      {
        level: "Body (small)",
        type: "small",
        text: "正文 (小)",
      },
      {
        level: "Body",
        type: "base",
        text: "正文",
      },
      {
        level: "Small Title",
        type: "medium",
        text: "小标题",
      },
      {
        level: "Title",
        type: "large",
        text: "标题",
      },
      {
        level: "Main Title",
        type: "extra-large",
        text: "主标题",
      },
    ];

    function formatType(type: string) {
      return type
        .split("-")
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .join(" ");
    }

    return {
      useCssVar,
      fontSizes,
      formatType,
      colors,
      colors1,
      colors2,
    };
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

.number-content {
  font-family: "din";
}

.grid-content {
  border-radius: 4px;
  min-height: 26px;
  background-color: red;
}

.demo-typo-size td {
  padding: 5px 0;
}
</style>
