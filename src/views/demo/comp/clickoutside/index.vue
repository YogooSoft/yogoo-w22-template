<template>
  <page-wrapper title="点内外部触发事件示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="点内外部触发事件示例"
      :can-expan="true"
      help-message=""
    >
      <ClickOutSide
        @clickOutside="handleClickOutside"
        class="flex justify-center"
      >
        <div @click="innerClick" class="demo-box">
          {{ text }}
        </div>
      </ClickOutSide>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { ClickOutSide } from "@/components/ClickOutSide";

export default defineComponent({
  name: "copy",
  components: { CollapseContainer, PageWrapper, ClickOutSide },

  setup(props) {
    const text = ref("Click");
    function handleClickOutside() {
      text.value = "Click Out Side";
    }

    function innerClick() {
      text.value = "Click Inner";
    }
    return { innerClick, handleClickOutside, text };
  },
});
</script>

<style lang="less" scoped>

.cl-mb-10 {
  margin-bottom: 10px;
}

.demo-box {
    display: flex;
    width: 100%;
    height: 300px;
    font-size: 24px;
    color: #fff;
    background-color: #408ede;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  }
</style>
