<template>
  <div class="Exception">
    <el-icon><Warning /></el-icon>
抱歉，您访问的页面不存在。
  </div>
</template>
<script lang="ts">
var { appVersion } = require("@/config");

import { defineComponent, computed, ref } from "vue";
import { router } from "@/router";

export default defineComponent({
  name: "Exception",
  components: {},

  setup(props) {
    const version = appVersion;
    console.log("------currentRoute------",router.currentRoute.value.path);
    return {};
  },
});

</script>
<style lang="less" scoped>
.Exception {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  //color: #fff;
  font-size: 20px;
  font-weight: bold;
  // background-color: #f5222d;
}
</style>
