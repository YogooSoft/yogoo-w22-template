<template>
  <page-wrapper title="间距示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="间距示例"
      :can-expan="true"
      help-message="通过这个组件来给组件之间提供统一的间距。"
    >
      <div class="flex-1">
        <el-space wrap>
          <el-card
            v-for="i in 3"
            :key="i"
            class="box-card"
            style="width: 250px"
          >
            <template #header>
              <div class="card-header">
                <span>Card name</span>
                <el-button size="small" text>Operation button</el-button>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "List item " + o }}
            </div>
          </el-card>
        </el-space>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="垂直布局"
      :can-expan="true"
      help-message="通过这个组件来给组件之间提供统一的间距。"
    >
      <el-space direction="vertical">
        <el-card v-for="i in 2" :key="i" class="box-card" style="width: 250px">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button size="small" text>Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">
            {{ "List item " + o }}
          </div>
        </el-card>
      </el-space>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="控制间距的大小"
      :can-expan="true"
      help-message="通过调整 size 的值来控制间距的大小"
    >
      <el-space direction="vertical" alignment="start" :size="20">
        <el-radio-group v-model="size">
          <el-radio :label="'large'">large</el-radio>
          <el-radio :label="'default'">default</el-radio>
          <el-radio :label="'small'">small</el-radio>
        </el-radio-group>

        <el-space wrap :size="size">
          <el-card
            v-for="i in 3"
            :key="i"
            class="box-card"
            style="width: 250px"
          >
            <template #header>
              <div class="card-header">
                <span>Card name</span>
                <el-button size="small" text>Operation button</el-button>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "List item " + o }}
            </div>
          </el-card>
        </el-space>
      </el-space>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义间距的大小"
      :can-expan="true"
      help-message="可以通过传入自己定义的大小 (数值类型) 来设置。"
    >
      <el-slider v-model="size" />
      <el-space wrap :size="size">
        <el-card v-for="i in 2" :key="i" class="box-card" style="width: 250px">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button size="small" text>Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">
            {{ "List item " + o }}
          </div>
        </el-card>
      </el-space>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自动换行"
      :can-expan="true"
      help-message="在 水平 (horizontal) ** 模式下, 通过控制 wrap（布尔类型）**来控制是否自动换行"
    >
      <el-space wrap :size="size">
        <div v-for="i in 20" :key="i">
          <el-button text> Text button </el-button>
        </div>
      </el-space>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="填充容器"
      :can-expan="true"
      help-message="通过 fill**（布尔类型）**参数，您可以控制子节点是否自动填充容器。"
    >
      <div>
        <div style="margin-bottom: 15px">
          fill: <el-switch v-model="fill" />
        </div>
        <el-space :fill="fill" wrap>
          <el-card v-for="i in 3" :key="i" class="box-card">
            <template #header>
              <div class="card-header">
                <span>Card name</span>
                <el-button size="small" text>Operation button</el-button>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "List item " + o }}
            </div>
          </el-card>
        </el-space>
      </div>
      <el-divider />
      <div>
        <div style="margin-bottom: 15px">
          direction:
          <el-radio v-model="direction" label="horizontal">horizontal</el-radio>
          <el-radio v-model="direction" label="vertical">vertical</el-radio>
        </div>
        <div style="margin-bottom: 15px">
          fillRatio:<el-slider v-model="fillRatio" />
        </div>
        <el-space
          fill
          wrap
          :fill-ratio="fillRatio"
          :direction="direction"
          style="width: 100%"
        >
          <el-card v-for="i in 5" :key="i" class="box-card">
            <template #header>
              <div class="card-header">
                <span>Card name</span>
                <el-button size="small" text>Operation button</el-button>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "List item " + o }}
            </div>
          </el-card>
        </el-space>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "space",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const size = ref(20);
    const fill = ref(true);
    const direction = ref("horizontal");
    const fillRatio = ref(20);
    return { size, fill, direction, fillRatio };
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
.el-card {
  --el-card-border-color: var(--el-border-color-light, #ebeef5);
  --el-card-border-radius: 4px;
  --el-card-padding: 8px;
  --el-card-bg-color: var(--el-fill-color-blank);
}
.el-card__header {
  height: 32px !important;
}
.el-card__body {
  padding: 10px 10px 0px 10px !important;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;
}

.box-card {
  width: 220px;
  margin: 0px 10px 10px 0px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px !important;
}
</style>
