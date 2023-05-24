<template>
  <page-wrapper title="导出示例" content="根据JSON格式的数据进行导出">
    <div ref="domRef" class="icons-container">
      <el-tabs type="border-card">
        <el-tab-pane label="Icons">
          <div class="grid">
            <div v-for="item of svgIcons" :key="item">
              <el-tooltip placement="top" :content="generateIconCode(item)">
                <div class="icon-item">
                  <svg-icon :icon-name="item" />
                  <span>{{ item }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Element-UI Icons">
          <div class="grid">
            <div v-for="item of elementIcons" :key="item">
              <el-tooltip
                placement="top"
                :content="generateElementIconCode(item)"
              >
                <div class="icon-item">
                  <!-- <i :class="'el-icon-' + item" /> -->
                  <!-- <el-icon><component :is="item"></component></el-icon> -->
                  <svg-icon :icon-name="item" class="svg-icon-color"  :element-icons=true />
                  <span>{{ item }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </page-wrapper>
</template>
<script lang="ts">
var { appVersion } = require("@/config");

import { defineComponent, computed, ref } from "vue";
import svgIcons from "./svg-icons";
import elementIcons from "./element-icons";
import SvgIcon from "@/components/SvgIcon/index.vue";

import { PageWrapper } from "@/components/Page";
import { useRouter } from "vue-router";

function generateIconCode(symbol: string) {
  return `<svg-icon icon-name="${symbol}" />`;
}

function generateElementIconCode(symbol: string) {
  return `<svg-icon icon-name="${symbol}" element-icons=true  />`;
}

export default defineComponent({
  name: "LockModal",
  components: {PageWrapper,SvgIcon},

  setup(props) {
    const version = appVersion;

    const router = useRouter();

    console.log("------currentRoute------",router.currentRoute.value.path);

    return {
      generateIconCode,
      generateElementIconCode,
      svgIcons,
      elementIcons,
    };
  },
});
</script>

<style lang="less" scoped>
.icons-container {
  // margin: 10px 10px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 55px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 14px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }

  .svg-icon-color {
    color: red;

  }
}
</style>
