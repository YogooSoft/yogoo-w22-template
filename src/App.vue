<template>
  <!-- size: large / default /small -->
  <!-- <div id="app"> -->
  <el-config-provider size="default">
    <app-provider>
      <router-view v-if="isRouterAlive" />
    </app-provider>
  </el-config-provider>
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, computed, ref, provide, nextTick } from "vue";
import { AppProvider } from "@/components/Application";

export default defineComponent({
  name: "App",
  components: { AppProvider },
  setup() {
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    provide("reload", reload);
    return { isRouterAlive };
  },
});
</script>

<style lang="less">
// #app {
//   height: 100vh;
// }
// body {
//   font-family: "Microsoft YaHei", "微软雅黑", Arial, Helvetica, sans-serif,
//     "宋体";
//   /* font-size:14px; */
// }
// textarea {
//   font-family: "Microsoft YaHei", "微软雅黑", Arial, Helvetica, sans-serif,
//     "宋体";
// }
/* "Microsoft YaHei", "微软雅黑", Arial, Helvetica, sans-serif,"宋体"; */
/* 'PingFang SC', 'Microsoft YaHei',Arial, sans-serif; */
.el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/**修改全局的滚动条*/
/**滚动条的宽度*/
::-webkit-scrollbar {
  width: 8px;
}
/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #babbbd;
  //  background-color: #dddfe4;
  border-radius: 3px;
}
/* 气泡滚动条的滑块 */
/* .el-popover{
  height: 200px; 
  overflow: auto;
} */
</style>
