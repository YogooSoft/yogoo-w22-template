<template>
  <yui-window-wrapper
    width="600px"
    @register="register"
    :title="data.title"
    :canFullscreen="false"
    :fullscreen="false"
  >
    <div class="flex-1">
      <el-form
        ref="WeChatAddWeChatAddRuleFormRef"
        :model="WeChatAddRuleForm"
        :rules="rules"
        label-width="120px"
        class="demo-WeChatAddRuleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="微信原始ID" prop="originalID">
          <el-input
            v-model="WeChatAddRuleForm.originalID"
            placeholder="请输入微信原始ID"
          />
        </el-form-item>
        <el-form-item label="微信账号" prop="account">
          <el-input
            v-model="WeChatAddRuleForm.account"
            placeholder="请输入微信账号"
          />
        </el-form-item>
        <el-form-item label="开发者ID" prop="appID">
          <el-input
            v-model="WeChatAddRuleForm.appID"
            placeholder="请输入开发者ID"
          />
        </el-form-item>
        <el-form-item label="开发者密码" prop="appSecret">
          <el-input
            v-model="WeChatAddRuleForm.appSecret"
            placeholder="请输入开发者密码"
          />
        </el-form-item>
        <el-form-item label="公众号名称" prop="name">
          <el-input
            v-model="WeChatAddRuleForm.name"
            placeholder="请输入公众号名称"
          />
        </el-form-item>

        <el-form-item label="账号类型" prop="type">
          <el-select v-model="WeChatAddRuleForm.type" placeholder="账号类型">
            <el-option label="服务号" value="1" />
            <el-option label="订阅号" value="2" />
          </el-select>
        </el-form-item>

        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm(WeChatAddWeChatAddRuleFormRef)">
            确定
          </el-button>
          <el-button @click="resetForm(WeChatAddWeChatAddRuleFormRef)">Reset</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click="submitForm(WeChatAddWeChatAddRuleFormRef)"
          >确定</el-button
        >

        <el-button type="danger" @click="closeModal">取消</el-button>
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
import type { FormInstance, FormRules } from "element-plus";
// import { FormSchema } from "./data";
import { message } from "@/hooks/web/useMessage";
import { messageBox } from "@/hooks/web/useMessageBox";
export default defineComponent({
  name: "WeChatAddForm",
  components: { CollapseContainer, PageWrapper, YuiWindowWrapper },
  props: {
    userData: { type: Object },
  },

  setup(props) {
    // const WeChatAddFormData = reactive(FormSchema);
    const formSize = ref("default");
    const [register, { closeModal, setModalProps }] = useModalInner();
    const WeChatAddWeChatAddRuleFormRef = ref<FormInstance>();
    const WeChatAddRuleForm = reactive({
      originalID: "",
      account: "",
      appID: "",
      appSecret: "",
      name: "",
      type: "",
    });
    const rules = reactive<FormRules>({
      originalID: [
        {
          required: true,
          message: "请输入微信原始ID",
          trigger: "blur",
        },
      ],
      type: [
        {
          required: true,
          message: "请选择公众号类型",
          trigger: "change",
        },
      ],

      account: [
        {
          required: true,
          message: "请输入微信账号",
          trigger: "blur",
        },
      ],
      appID: [
        {
          required: true,
          message: "请输入开发者ID",
          trigger: "blur",
        },
      ],
      appSecret: [
        {
          required: true,
          message: "请输入开发者密码",
          trigger: "blur",
        },
      ],
      name: [
        {
          required: true,
          message: "请输入公众号名称",
          trigger: "blur",
        },
      ],
    });

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log("submit!");
          messageBox
            .confirm("您确认要创建吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "info",
            })
            .then(() => {
              closeModal();
              message.success("添加成功");
            });
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    const options = Array.from({ length: 10000 }).map((_, idx) => ({
      value: `${idx + 1}`,
      label: `${idx + 1}`,
    }));

    let data = reactive({
      title: "添加公众号",
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
      // WeChatAddFormData.fieldForm.name = data.data;

      // setProps({
      //   model:{ field2: data.data, field1: data.info }
      // })
    }

    return {
      register,
      formSize,
      data,
      options,
      closeModal,
      WeChatAddWeChatAddRuleFormRef,
      WeChatAddRuleForm,
      rules,
      submitForm,
      resetForm,
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
  margin-right: 35px;
}
.tools {
  float: right;
  display: flex;
  border: none;
}
</style>
