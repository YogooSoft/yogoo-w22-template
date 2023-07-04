<template>
  <page-wrapper title="Tag 标签示例" content="用于标记和选择。">
    <collapse-container
      class="cl-mb-10"
      title="Tag 标签示例"
      :can-expan="true"
      help-message="用于标记和选择。"
    >
      <el-tag class="ml-2">Tag 1</el-tag>
      <el-tag class="ml-2" type="success">Tag 2</el-tag>
      <el-tag class="ml-2" type="info">Tag 3</el-tag>
      <el-tag class="ml-2" type="warning">Tag 4</el-tag>
      <el-tag class="ml-2" type="danger">Tag 5</el-tag>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="可移除标签"
      :can-expan="true"
      help-message=""
    >
      <el-tag
        v-for="tag in tags"
        :key="tag.name"
        class="ml-2"
        closable
        :type="tag.type"
      >
        {{ tag.name }}
      </el-tag>
    </collapse-container>
    <collapse-container
      class="cl-mb-10 button-new-tag"
      title="动态编辑标签"
      :can-expan="true"
      help-message=""
    >
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        class="ml-2"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        class="ml-2"
        style="border-top: 0px"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="ml-2" size="small" @click="showInput">
        + New Tag
      </el-button>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="不同尺寸"
      :can-expan="true"
      help-message=""
    >
      <el-row>
        <el-tag class="mx-1" size="large">Large</el-tag>
        <el-tag class="mx-1">Default</el-tag>
        <el-tag class="mx-1" size="small">Small</el-tag>
      </el-row>

      <el-row class="mt-4">
        <el-tag class="mx-1" size="large" closable>Large</el-tag>
        <el-tag class="mx-1" closable>Default</el-tag>
        <el-tag class="mx-1" size="small" closable>Small</el-tag>
      </el-row>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="主题"
      :can-expan="true"
      help-message=""
    >
      <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
        <span class="ml-2">Dark</span>
        <el-tag
          v-for="item in items"
          :key="item.label"
          :type="item.type"
          class="mx-1"
          effect="dark"
        >
          {{ item.label }}
        </el-tag>
        <el-tag
          v-for="item in items"
          :key="item.label"
          :type="item.type"
          class="mx-1"
          effect="dark"
          closable
        >
          {{ item.label }}
        </el-tag>
      </div>
      <div class="mt-4">
        <span class="ml-2">Light</span>
        <el-tag
          v-for="item in items"
          :key="item.label"
          class="mx-1"
          :type="item.type"
          effect="light"
        >
          {{ item.label }}
        </el-tag>
        <el-tag
          v-for="item in items"
          :key="item.label"
          class="mx-1"
          :type="item.type"
          effect="light"
          closable
        >
          {{ item.label }}
        </el-tag>
      </div>
      <div class="mt-4">
        <span class="ml-2">Plain</span>
        <el-tag
          v-for="item in items"
          :key="item.label"
          class="mx-1"
          :type="item.type"
          effect="plain"
        >
          {{ item.label }}
        </el-tag>
        <el-tag
          v-for="item in items"
          :key="item.label"
          class="mx-1"
          :type="item.type"
          effect="plain"
          closable
        >
          {{ item.label }}
        </el-tag>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="可选中的标签"
      :can-expan="true"
      help-message=""
    >
      <el-check-tag checked style="margin-right: 8px">Checked</el-check-tag>
      <el-check-tag :checked="checked" @change="onChange"
        >Toggle me</el-check-tag
      >
    </collapse-container>
  </page-wrapper>
</template>
<script lang="ts" setup>
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { nextTick } from "vue";
import { ElInput } from "element-plus";
import type { TagProps } from "element-plus";

const tags = ref([
  { name: "Tag 1", type: "" },
  { name: "Tag 2", type: "success" },
  { name: "Tag 3", type: "info" },
  { name: "Tag 4", type: "warning" },
  { name: "Tag 5", type: "danger" },
]);

const inputValue = ref("");
const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"]);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

type Item = { type: TagProps["type"]; label: string };

const items = ref<Array<Item>>([
  { type: "", label: "Tag 1" },
  { type: "success", label: "Tag 2" },
  { type: "info", label: "Tag 3" },
  { type: "danger", label: "Tag 4" },
  { type: "warning", label: "Tag 5" },
]);

const checked = ref(false);

const onChange = (status: boolean) => {
  checked.value = status;
};
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
.ml-2 {
  margin-right: 10px;
}
.mx-1 {
  margin-right: 10px;
}

.mt-4 {
  margin-top: 10px;
}
.button-new-tag {
  display: fix;
  align-items: center;
}
</style>
