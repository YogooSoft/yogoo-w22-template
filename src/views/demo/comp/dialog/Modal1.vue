<template>
  <yui-window-wrapper
    width="600px"
    @register="register"
    :title="data.title"
    :canFullscreen=false 
  >
    <collapse-container
      class="cl-mb-10"
      title="从内部操作"
      :showTitle="true"
      :can-expan="false"
      help-message="从内部操作弹窗组件"
    >
      <div class="flex-1">
        <span>
          <!-- <el-button :plain="true" @click="sessionTimeout()"
            >点击触发用户登陆过期</el-button
          > -->
          <el-button @click="setTitle">修改窗口标题属性</el-button>
        <el-button @click="setMaximize(true)">修改最大化按钮禁用属性</el-button>
        </span>
      </div>
    </collapse-container>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeModal">关闭窗口</el-button>
      </span>
    </template>
  </yui-window-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref, toRefs, reactive } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { YuiWindowWrapper } from "@/components/Windows/index";
import { useModalInner } from "@/components/Windows";
export default defineComponent({
  name: "Modal1",
  components: { CollapseContainer, PageWrapper, YuiWindowWrapper },

  setup(props) {
    const [register, { closeModal, setModalProps }] = useModalInner();

    let data = reactive({
      title: "演示yuiWindowsWrapper组件",
      Maximize: false,
      Width: "600px",
    });

    // setModalProps({ canFullscreen: false });
    //setModalProps({ loading: false, confirmLoading: false });

    let isShow = true;

    async function sessionTimeout() {}

    const setWidth = (value: string) => {
      data.Width = value;
    };

    const setMaximize = (value: boolean) => {
      setModalProps({ canFullscreen: value });
    };

    const setTitle = (value: string) => {
      setModalProps({ title: 'Modal New Title' });
    };

    return {
      register,
      sessionTimeout,
      setTitle,
      setMaximize,
      data,
      closeModal,
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
</style>
