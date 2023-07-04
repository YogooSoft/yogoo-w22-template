<template>
  <page-wrapper title="滚动条示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="滚动条示例"
      :can-expan="true"
      help-message="用于替换浏览器原生滚动条。"
    >
      <el-scrollbar height="400px">
        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </el-scrollbar>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="横向滚动"
      :can-expan="true"
      help-message="当元素宽度大于滚动条宽度时，会显示横向滚动条。"
    >
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <p
            v-for="item in 50"
            :key="item"
            class="scrollbar-demo-item-transverse"
          >
            {{ item }}
          </p>
        </div>
      </el-scrollbar>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="最大高度"
      :can-expan="true"
      help-message="当元素高度超过最大高度，才会显示滚动条。"
    >
      <el-button @click="add">Add Item</el-button>
      <el-button @click="onDelete">Delete Item</el-button>
      <el-scrollbar max-height="400px">
        <p v-for="item in count" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </el-scrollbar>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="手动滚动"
      :can-expan="true"
      help-message="通过使用 setScrollTop 与 setScrollLeft 方法，可以手动控制滚动条滚动。"
    >
      <el-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
        <div ref="innerRef">
          <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
            {{ item }}
          </p>
        </div>
      </el-scrollbar>

      <el-slider
        v-model="value"
        :max="max"
        :format-tooltip="formatTooltip"
        @input="inputSlider"
      />
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { onMounted } from "vue";
import { ElScrollbar } from "element-plus";

export default defineComponent({
  name: "scrollbar",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const count = ref(3);

    const add = () => {
      count.value++;
    };
    const onDelete = () => {
      if (count.value > 0) {
        count.value--;
      }
    };

    const max = ref(0);
    const value = ref(0);
    const innerRef = ref<HTMLDivElement>();
    const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();

    onMounted(() => {
      max.value = innerRef.value!.clientHeight - 380;
    });

    const inputSlider = (value: number) => {
      scrollbarRef.value!.setScrollTop(value);
    };
    const scroll = ({ scrollTop }) => {
      value.value = scrollTop;
    };
    const formatTooltip = (value: number) => {
      return `${value} px`;
    };

    return {
      count,
      add,
      onDelete,
      max,
      value,
      innerRef,
      scrollbarRef,
      inputSlider,
      scroll,
      formatTooltip,
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

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item-transverse {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
</style>
