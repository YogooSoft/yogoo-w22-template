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
      <el-form
        ref="WeChatUpdateRuleFormRef"
        :model="WeChatUpdateRuleForm"
        label-width="120px"
        class="demo-WeChatUpdateRuleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="公众号名称" prop="name">
          <span>{{ WeChatUpdateRuleForm.name }}</span>
        </el-form-item>

        <el-form-item label="账号状态" prop="type">
          <el-select
            v-model="WeChatUpdateRuleForm.status_zh"
            placeholder="账号类型"
          >
            <el-option label="启动" value="1" />
            <el-option label="停止" value="2" />
          </el-select>
        </el-form-item>

        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm(WeChatUpdateWeChatUpdateRuleFormRef)">
            确定
          </el-button>
          <el-button @click="resetForm(WeChatUpdateWeChatUpdateRuleFormRef)">Reset</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm(WeChatUpdateRuleFormRef)"
          >确定</el-button
        >

        <el-button type="danger" @click="closeModal">取消</el-button>
      </span>
    </template>
  </yui-window-wrapper>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { YuiWindowWrapper } from "@/components/Windows/index";
import { useModalInner } from "@/components/Windows";
import type { FormInstance, FormRules } from "element-plus";
import { message } from "@/hooks/web/useMessage";
import { messageBox } from "@/hooks/web/useMessageBox";
export default defineComponent({
  name: "WeChatDetailForm",
  components: { CollapseContainer, PageWrapper, YuiWindowWrapper },
  props: {
    wechatUpdateData: { type: Object },
  },

  setup(props) {
    const [register, { closeModal, setModalProps }] = useModalInner((data) => {
      data && onDataReceive(data);
    });
    let WeChatDetailFormData = reactive({});
    const formSize = ref("default");

    const WeChatUpdateRuleFormRef = ref<FormInstance>();
    let WeChatUpdateRuleForm = reactive({});

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log("submit!");
          messageBox
            .confirm("您确认要修改公众号状态吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "info",
            })
            .then(() => {
              closeModal();
              message.success("配置成功");
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
      title: "设置公众号状态",
      Maximize: false,
      Width: "600px",
    });

    const setWidth = (value: string) => {
      data.Width = value;
    };
    function onDataReceive(data) {
      console.log("Data Received", data);

      WeChatUpdateRuleForm["originalID"] = data.originalID;
      WeChatUpdateRuleForm["account"] = data.account;
      WeChatUpdateRuleForm["status_zh"] = data.status_zh;
      WeChatUpdateRuleForm["appSecret"] = data.appSecret;
      WeChatUpdateRuleForm["name"] = data.name;
      WeChatUpdateRuleForm["type"] = data.type;

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

      submitForm,
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
  margin-right: 35px;
}
.tools {
  float: right;
  display: flex;
  border: none;
}
</style>
