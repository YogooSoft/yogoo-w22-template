<template>
  <page-wrapper title="加载中示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="数据加载动效示例"
      :can-expan="true"
      help-message="在需要的时候展示加载动画，防止页面失去响应提高用户体验（例如表格）"
    >
      <div class="flex-1">
        <el-table v-loading="loading" :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="让加载组件铺满整个屏幕示例"
      :can-expan="true"
      help-message="加载数据时显示全屏动画。"
    >
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        type="primary"
        @click="openFullScreen1"
      >
        As a directive
      </el-button>
      <el-button type="primary" @click="openFullScreen2">
        As a service
      </el-button>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { ElLoading } from "element-plus";

export default defineComponent({
  name: "loading",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const loading = ref(true);

    const tableData = [
      {
        date: "2016-05-02",
        name: "John Smith",
        address: "No.1518,  Jinshajiang Road, Putuo District",
      },
      {
        date: "2016-05-04",
        name: "John Smith",
        address: "No.1518,  Jinshajiang Road, Putuo District",
      },
      {
        date: "2016-05-01",
        name: "John Smith",
        address: "No.1518,  Jinshajiang Road, Putuo District",
      },
    ];

    const fullscreenLoading = ref(false);
    const openFullScreen1 = () => {
      fullscreenLoading.value = true;
      setTimeout(() => {
        fullscreenLoading.value = false;
      }, 2000);
    };

    const openFullScreen2 = () => {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    };

    return {
      fullscreenLoading,
      openFullScreen1,
      openFullScreen2,
      loading,
      tableData,
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
.el-alert {
  margin-bottom: 10px;
}

// body {
//   margin: 0;
// }
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
