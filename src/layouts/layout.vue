<template>
  <el-container class="w22-vue-template-wrapper">
    <el-aside width="auto" class="el-aside">
      <common-aside v-if="tabsFullScreen" />
    </el-aside>
    <el-container>
      <common-header  v-if="tabsFullScreen" />
      <el-header>
          <tags :tabsFullScreen="tabsFullScreen" @tabsFullScreen="setTabsFullScreen"/>
      </el-header>
      <el-main class="container-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";

var { appVersion } = require("@/config");

import CommonAside from "@/layouts/default/aside/index.vue";
import CommonHeader from "@/layouts/default/header/index.vue";
import Tags from "@/layouts/default/tags/index.vue";

export default defineComponent({
  name: "Layout",
  components: {CommonAside,CommonHeader,Tags},

  setup() {
    const version = appVersion;
    const tabsFullScreen = ref(true);
    const setTabsFullScreen = () => {
      tabsFullScreen.value = !tabsFullScreen.value;
    };

    return {
        version,
        tabsFullScreen,
        setTabsFullScreen,
    }
  },
});

</script>

<style lang="less" scoped>
.w22-vue-template-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.el-aside {
  padding: 0px 0px;
  margin-bottom: 0px;
  border-radius: 0px;
}
.el-header {
  --el-header-padding: 0 0;
  --el-header-height: 33px;
  width: 100%;
}
.el-container {
  background-color: #f2f4f6;
  width: 100%;
  height: 100%;
}
.container-main {
  padding: 10px;
}
.el-container {
  width: 100%;
  overflow-x: hidden;
}
</style>

