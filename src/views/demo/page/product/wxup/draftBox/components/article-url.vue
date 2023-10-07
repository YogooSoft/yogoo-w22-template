<template>
  <yui-window-wrapper
    width="600px"
    @register="register"
    title="原文地址"
    :canFullscreen="false"
    :fullscreen="false"
    @visible-change="handleVisibleChange"
  >
    <div class="flex-1">
      <el-form
        ref="ArticleRuleFormRef"
        :model="ArticleRuleForm"
        label-width="120px"
        class="demo-ArticleRuleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="原文链接" prop="originalID">
          <el-input
            v-model="ArticleRuleForm.article_url"
            placeholder="输入原文链接"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm(ArticleRuleFormRef)"
          >确定</el-button
        >

        <el-button type="danger" @click="closeModal">取消</el-button>
      </span>
    </template>
  </yui-window-wrapper>
</template>

<script lang="ts" setup>
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
import type { FormInstance, FormRules } from "element-plus";

import { message } from "@/hooks/web/useMessage";
import { messageBox } from "@/hooks/web/useMessageBox";

const props = defineProps({
  articleUrlData: { type: Object },
});

const [register, { closeModal, setModalProps }] = useModalInner((data) => {
  data && onDataReceive(data);
});
let ArticleDetailFormData = reactive({});
const formSize = ref("default");

const ArticleRuleFormRef = ref<FormInstance>();
let ArticleRuleForm = reactive({});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      messageBox
        .confirm("您确认要设置该链接吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        })
        .then(() => {
          closeModal();
          transValue();
          message.success("设置成功");
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
  title: "编辑公众号",
  Maximize: false,
  Width: "600px",
});

const setWidth = (value: string) => {
  data.Width = value;
};
function onDataReceive(data) {
  console.log("Data Received", data);
  ArticleRuleForm["article_url"] = data.data.article_url;
  ArticleRuleForm["art_now_index"] = data.art_now_index;

  console.log("Data ArticleRuleForm", ArticleRuleForm);
}
function handleVisibleChange(v) {
  v &&
    props.articleUrlData &&
    nextTick(() => onDataReceive(props.articleUrlData));
}

// 使用defineEmits注册一个自定义事件
const emit = defineEmits(["getValue"]);
// 点击事件触发emit，去调用我们注册的自定义事件getValue,并传递value参数至父组件
const transValue = () => {
  emit("getValue", ArticleRuleForm);
};
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
  margin-right: 35px;
}
</style>
