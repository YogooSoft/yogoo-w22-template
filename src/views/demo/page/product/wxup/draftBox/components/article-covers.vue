<template>
  <yui-window-wrapper
    width="1050px"
    @register="register"
    title="素材选择"
    :canFullscreen="false"
    :fullscreen="false"
    @visible-change="handleVisibleChange"
  >
    <div class="flex-1">
      <div class="list">
        <div
          v-for="(item, index) in covers.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )"
          :key="index"
          class="item"
          @click=""
        >
          <img
            style="width: 100%; height: 100%; display: inline-block"
            :src="item['cover_img']"
            alt=""
            @click="transValue(item['cover_img'])"
          />
        </div>
      </div>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="20"
        :current-page="currentPage"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button type="primary" @click="submitForm(ArticleRuleFormRef)"
          >确定</el-button
        > -->

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
  onMounted,
} from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { YuiWindowWrapper } from "@/components/Windows/index";
import { useModalInner } from "@/components/Windows";
import type { FormInstance, FormRules } from "element-plus";

import { message } from "@/hooks/web/useMessage";
import { messageBox } from "@/hooks/web/useMessageBox";
import { GetWxupCoversData } from "@/api/wxupData";

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

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));

let data = reactive({
  title: "素材选择",
  Maximize: false,
  Width: "800px",
});

const setWidth = (value: string) => {
  data.Width = value;
};

let covers = ref([]);
function GetWxupCoversDataFun() {
  GetWxupCoversData("userid").then((res: any) => {
    if (res.meta.code == "0") {
      covers.value = res.data.data;

      console.log("===1===", covers);
    }
  });
}

// function submitForm() {
//   closeModal();
//   transValue();
// }
function onDataReceive(data) {
  console.log("Data Received", data);

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
const transValue = (data) => {
  ArticleRuleForm["cover_img_src"] = data;
  ("https://img0.baidu.com/it/u=1170715780,3460607516&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500");
  emit("getValue", ArticleRuleForm);
  closeModal();
};

let pageSize = ref(10);
let currentPage = ref(1);
function handleSizeChange(val) {
  pageSize.value = val;
}
function handleCurrentChange(val) {
  currentPage.value = val;
}

onMounted(() => {
  GetWxupCoversDataFun();
});
</script>

<style lang="less" scoped>
.flex-1 {
  flex: 1;
  margin-left: 35px;
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
  margin-right: 35px;
}

.list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  background-color: inherit;

  .item {
    border: 1px solid var(--el-border-color-lighter);
    background-color: var(--el-bg-color);
    padding: 10px 10px 0 10px;
    border-radius: 4px;
    margin: 0 10px 10px 0;
    height: 163px;
    width: 300px;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
      background-color: var(--el-fill-color-lighter);
    }
  }
}
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
