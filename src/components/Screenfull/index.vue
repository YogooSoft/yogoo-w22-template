<template>
  <div style="width: 34px;">
    <svg-icon
      class="screenfull-svg"
      :icon-name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggle"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useFullscreen } from "@vueuse/core";

import { useLocalStorage,useSessionStorage, useMouse, usePreferredDark } from '@vueuse/core'

export default defineComponent({
  name: "screenFull",
  setup() {
    const { toggle, isFullscreen } = useFullscreen();

    return {
      isFullscreen,
      toggle,
    };
  },
});
</script>

<style lang="less" scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 15px;
  height: 15px;
  vertical-align: 10px;
  //margin-top: 15px;
  height: inherit;
}
</style>
