<template>
  <yui-window-wrapper
    :width="data.Width"
    @register="register"
    :title="data.Title"
    :canFullscreen="true"
    @visible-change="handleVisibleChange"
    subtitle="副标题"
  >
    <collapse-container
      class="cl-mb-10"
      title="从内部操作"
      :showTitle="false"
      :can-expan="false"
      help-message=""
    >
      <yui-form
        :field-list="formData.fieldList"
        :field-form="formData.fieldForm"
        @change="change"
      />
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
  nextTick,
} from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { YuiWindowWrapper } from "@/components/Windows/index";
import { useModalInner } from "@/components/Windows";
import { YuiForm } from "@/components/Form/index";
import { FormSchema } from "./data";

export default defineComponent({
  name: "Modal2",
  components: { CollapseContainer, PageWrapper, YuiWindowWrapper, YuiForm },
  props: {
    userData: { type: Object },
  },
  setup(props) {

    const [register, { closeModal, setModalProps }] = useModalInner((data) => {
      data && onDataReceive(data);
    });

    const formData = reactive(FormSchema);
    const modelRef = ref({});

    let data = reactive({
      Title: "演示打开窗体并传递数据",
      Maximize: false,
      Width: "600px",
    });

    function change(item: any, index: any, event: any) {
      console.log("-------------change----------1------", item);
      // console.log("-------------change-----------2-----",index);
      // console.log("-------------change-----------3-----",formData.fieldForm[item.field]);
    }

    function onDataReceive(data) {
      console.log("Data Received", data);
      // 方式1;
      // setFieldsValue({
      //   field2: data.data,
      //   field1: data.info,
      // });

      // // 方式2
      //   modelRef.value = { field2: data.data, field1: data.info };
      formData.fieldForm.name = data.data;

      // setProps({
      //   model:{ field2: data.data, field1: data.info }
      // })
    }

    function handleVisibleChange(v) {
      v && props.userData && nextTick(() => onDataReceive(props.userData));
    }

    return {
      register,
      data,
      closeModal,
      formData,
      change,
      handleVisibleChange,
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
  border-left: 0px;
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
