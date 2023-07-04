<template>
  <page-wrapper title="弹窗示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="弹窗对话框示例"
      :can-expan="false"
      help-message="弹窗对话框示例"
    >
      <div class="flex-1">
        <span>
          <el-button :plain="true" @click="openTargetModal(1)">
            打开弹窗
          </el-button>
          <el-button :plain="true" @click="openTargetModal(3)"
            >延时加载
          </el-button>
        </span>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="内外数据交互"
      :can-expan="false"
      help-message=""
    >
      <el-button :plain="true" @click="send()"> 打开弹窗并传递数据 </el-button>
    </collapse-container>

    <component
      :is="currentModal"
      v-model:visible="modalVisible"
      :userData="userData"
    />
    <Modal1 @register="register1" />
    <Modal2 @register="register2" />
    <Modal3 @register="register3" />
  </page-wrapper>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  shallowRef,
  ComponentOptions,
  nextTick,
  ref,
  unref,
  toRefs,
  reactive,
} from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { YuiWindowWrapper } from "@/components/Windows/index";
import { useModal } from "@/components/Windows/";
import Modal1 from "./Modal1.vue";
import Modal2 from "./Modal2.vue";
import Modal3 from "./Modal3.vue";
import { useModalInner } from "@/components/Windows";

export default defineComponent({
  name: "demoDialog",
  components: {
    CollapseContainer,
    PageWrapper,
    YuiWindowWrapper,
    Modal1,
    Modal2,
    Modal3,
  },

  setup(props) {
    const currentModal = shallowRef<Nullable<ComponentOptions>>(null);

    const [register1, { openModal: openModal1 }] = useModal();
    const [register2, { openModal: openModal2 }] = useModal();
    const [register3, { openModal: openModal3 }] = useModal();

    const modalVisible = ref<Boolean>(false);
    const userData = ref<any>(null);
    const [register, { closeModal, setModalProps }] = useModalInner();

    // const openM = () => {
    //   // setModalProps({ canFullscreen:false });
    //   currentModal.value = Modal1;
    //   modalVisible.value = true;
    // };

    function openTargetModal(index) {
      switch (index) {
        case 1:
          currentModal.value = Modal1;
          break;
        case 2:
          currentModal.value = Modal2;
          break;
        case 3:
          currentModal.value = Modal3;
          break;
        default:
          currentModal.value = Modal1;
          break;
      }
      nextTick(() => {
        // `useModal` not working with dynamic component
        // passing data through `userData` prop
        userData.value = { data: Math.random(), info: "Info222" };
        // open the target modal
        modalVisible.value = true;

        console.log("-----userData.value-------", userData.value);
      });
    }

    function send() {
      openModal2(true, {
        data: "content",
        info: "Info",
      });
    }

    let data = reactive({
      isShow: false,
      title: "演示yuiWindowsWrapper组件",
      Maximize: false,
      Width: "600px",
    });

    function close() {
      console.log("-------------close----------------");
      // const dataAsRefs = toRefs(data);
      // dataAsRefs.isShow.value = false;

      // console.log("-------------dataAsRefs------------",dataAsRefs.isShow.value,data.isShow);
      // setTimeout(() => {
      //   dataAsRefs.isShow.value = true;
      // }, 1000);

      //await open(false);
      //data.isShow  = false;
      // setTimeout(() => {
      //   data.value.isShow = false;
      // }, 1000);
    }

    async function sessionTimeout() {}

    return {
      sessionTimeout,
      open,
      close,
      register1,
      register2,
      register3,
      openModal1,
      currentModal,
      modalVisible,
      userData,
      openTargetModal,
      send,
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
// .el-button {
//   height: inherit;
//   margin-left: 0;
//   border: none;
// }

// :deep(.el-dialog__header) {
//  //padding: 1vh 1vw 0 1vw;
//  padding: 10px 10px 5px 10px;
// }
// :deep(.el-dialog__body) {
//   padding: 5px 10px 10px 10px;
// }

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
