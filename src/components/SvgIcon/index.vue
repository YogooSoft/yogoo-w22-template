<!--
调用方法：
          <svg-icon
            class="refresh-svg"
            icon-name="search"
            :element-icons=true
          />
-->
<template>
  <!-- <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon"  /> -->
  <el-icon v-if="elementIcons" :class="svgClass"
    ><component :is="iconName"></component
  ></el-icon>
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconNameF" />
  </svg>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    // svg 图标文名
    iconName: {
      type: String,
      required: true,
    },
    //
    // className: {
    //   type: String,
    //   default: "",
    // },
    // 是否 elementUI 原生图标
    elementIcons: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isExternal() {
      return this.iconName;
    },
    iconNameF() {
      return `#icon-${this.iconName}`;
    },
    svgClass() {
      return "svg-icon " + this.iconName;
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconName}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.iconName}) no-repeat 50% 50%`,
      };
    },
  },
});
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
