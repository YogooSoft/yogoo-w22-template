<template>
  <page-wrapper title="水印示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="全局水印"
      :can-expan="true"
      help-message=""
    >
      <el-button type="primary" @click="setWatermark('上海悦高软件股份有限公司',mydate)">
        Create
      </el-button>
      <el-button @click="clear"> Clear </el-button>
      <el-button @click="setWatermark('WaterMark Info New')"> Reset </el-button>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { useWatermark } from "@/hooks/web/useWatermark";
import dayjs from "dayjs"; 

export default defineComponent({
  name: "session-timeout",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const areaRef = ref<Nullable<HTMLElement>>(null);
    const { setWatermark, clear } = useWatermark();
    let mydate = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    return {
      setWatermark,
      clear,
      areaRef,
      mydate
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}
</style>
