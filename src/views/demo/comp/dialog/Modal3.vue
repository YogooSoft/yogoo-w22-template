<template>
  <yui-window-wrapper
    width="600px"
    @register="register"
    :title="data.title"
    :canFullscreen="false"
    @visible-change="handleShow"
  >
    <collapse-container
      class="cl-mb-10"
      title="从内部操作"
      :showTitle="false"
      :can-expan="false"
      help-message="从内部操作弹窗组件"
    >
      <template v-if="loading">
        <div class="empty-tips" v-loading="loading">加载中，稍等3秒……</div>
      </template>
      <template v-if="!loading">
        <ul>
          <li v-for="index in lines" :key="index">加载完成{{ index }}！</li>
        </ul>
      </template>
    </collapse-container>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeModal">关闭窗口</el-button>
      </span>
    </template>
  </yui-window-wrapper>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  unref,
  toRefs,
  reactive,
  watch,
} from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { YuiWindowWrapper } from "@/components/Windows/index";
import { useModalInner } from "@/components/Windows";
import { ElLoading } from "element-plus";
export default defineComponent({
  name: "Modal1",
  components: { CollapseContainer, PageWrapper, YuiWindowWrapper },

  setup(props) {
    const loading = ref(true);
    const lines = ref(10);
    const [register, { closeModal, setModalProps, redoModalHeight }] =
      useModalInner();

    let data = reactive({
      title: "演示3秒加载",
      Maximize: false,
      Width: "600px",
    });

    watch(
      () => lines.value,
      () => {
        redoModalHeight();
      }
    );

    function handleShow(visible: boolean) {
      if (visible) {
        loading.value = true;
        setModalProps({ loading: true, confirmLoading: true });
        setTimeout(() => {
          lines.value = Math.round(Math.random() * 30 + 5);
          loading.value = false;
          setModalProps({ loading: false, confirmLoading: false });
        }, 3000);
      }
    }

    function setLines() {
      lines.value = Math.round(Math.random() * 20 + 10);
    }

    return {
      register,
      loading,
      lines,
      data,
      closeModal,
      handleShow,
      setLines,
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
.icon-size-menu {
  font-size: 16px;
  padding: 0px 10px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
.tools {
  float: right;
  display: flex;
  border: none;
}

.empty-tips {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
