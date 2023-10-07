<template>
  <yui-window-wrapper
    width="600px"
    @register="register"
    :title="data.title"
    :canFullscreen="false"
    :fullscreen="false"
    @visible-change="handleVisibleChange"
  >
    <div class="flex-1">
      <el-descriptions :column="1">
        <el-descriptions-item label="微信原始ID：">{{
          WeChatUpdateRuleForm.originalID
        }}</el-descriptions-item>
        <el-descriptions-item label="微信账号：">{{
          WeChatUpdateRuleForm.account
        }}</el-descriptions-item>
        <br />
        <el-descriptions-item label="开发者ID：">{{
          WeChatUpdateRuleForm.appID
        }}</el-descriptions-item>

        <el-descriptions-item label="开发者密码：">{{
          WeChatUpdateRuleForm.appSecret
        }}</el-descriptions-item>

        <el-descriptions-item label="公众号名称：">{{
          WeChatUpdateRuleForm.name
        }}</el-descriptions-item>
        <el-descriptions-item label="公众号类型：">{{
          WeChatUpdateRuleForm.type_zh
        }}</el-descriptions-item>
      </el-descriptions>

      <!-- <el-form
        ref="WeChatUpdateRuleFormRef"
        :model="WeChatUpdateRuleForm"
        label-width="120px"
        class="demo-WeChatUpdateRuleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="微信原始ID：" prop="originalID">
          <span>{{ WeChatUpdateRuleForm.originalID }}</span>
        </el-form-item>
        <el-form-item label="微信账号：" prop="account">
          <span>{{ WeChatUpdateRuleForm.account }}</span>
        </el-form-item>
        <el-form-item label="开发者ID：" prop="appID">
          <span>{{ WeChatUpdateRuleForm.appID }}</span>
        </el-form-item>
        <el-form-item label="开发者密码：" prop="appSecret">
          <span>{{ WeChatUpdateRuleForm.appSecret }}</span>
        </el-form-item>
        <el-form-item label="公众号名称：" prop="name">
          <span>{{ WeChatUpdateRuleForm.name }}</span>
        </el-form-item>
        <el-form-item label="公众号类型：" prop="name">
          <span>{{ WeChatUpdateRuleForm.type_zh }}</span>
        </el-form-item>

      </el-form> -->
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="closeModal">取消</el-button>
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
import type { FormInstance } from "element-plus";

export default defineComponent({
  name: "WeChatUpdateForm",
  components: { CollapseContainer, PageWrapper, YuiWindowWrapper },
  props: {
    wechatUpdateData: { type: Object },
  },

  setup(props) {
    const [register, { closeModal, setModalProps }] = useModalInner((data) => {
      data && onDataReceive(data);
    });
    let WeChatUpdateFormData = reactive({});
    const formSize = ref("default");

    const WeChatUpdateRuleFormRef = ref<FormInstance>();
    let WeChatUpdateRuleForm = reactive({});

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    const options = Array.from({ length: 10000 }).map((_, idx) => ({
      value: `${idx + 1}`,
      label: `${idx + 1}`,
    }));

    let data = reactive({
      title: "公众号详情",
      Maximize: false,
      Width: "600px",
    });

    const setWidth = (value: string) => {
      data.Width = value;
    };
    function onDataReceive(data) {
      console.log("Data Received", data);
      // 方式1;
      // setFieldsValue({
      //   field2: data.data,
      //   field1: data.info,
      // });

      // // 方式2
      //   modelRef.value = { field2: data.data, field1: data.info };
      WeChatUpdateRuleForm["originalID"] = data.originalID;
      WeChatUpdateRuleForm["account"] = data.account;
      WeChatUpdateRuleForm["appID"] = data.appID;
      WeChatUpdateRuleForm["appSecret"] = data.appSecret;
      WeChatUpdateRuleForm["name"] = data.name;
      WeChatUpdateRuleForm["type_zh"] = data.type_zh;

      console.log("Data WeChatUpdateRuleForm", WeChatUpdateRuleForm);

      // setProps({
      //   model:{ field2: data.data, field1: data.info }
      // })
    }
    function handleVisibleChange(v) {
      v &&
        props.wechatUpdateData &&
        nextTick(() => onDataReceive(props.wechatUpdateData));
    }

    return {
      register,
      formSize,
      data,
      options,
      closeModal,
      WeChatUpdateRuleFormRef,
      WeChatUpdateRuleForm,

      resetForm,
      onDataReceive,
      handleVisibleChange,
    };
  },
});
</script>

<style lang="less" scoped>
.flex-1 {
  flex: 1;
  margin-right: 35px;
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
  // margin-right: 35px;
}
.tools {
  float: right;
  display: flex;
  border: none;
}
</style>
