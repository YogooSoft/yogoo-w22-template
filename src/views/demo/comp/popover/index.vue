<template>
  <page-wrapper title="气泡卡片示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message=""
    >
      <el-popover
        placement="top-start"
        title="Title"
        :width="200"
        trigger="hover"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <el-button class="m-2">Hover to activate</el-button>
        </template>
      </el-popover>

      <el-popover
        placement="bottom"
        title="Title"
        :width="200"
        trigger="click"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <el-button class="m-2">Click to activate</el-button>
        </template>
      </el-popover>

      <el-popover
        ref="popover"
        placement="right"
        title="Title"
        :width="200"
        trigger="focus"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <el-button class="m-2">Focus to activate</el-button>
        </template>
      </el-popover>

      <el-popover
        ref="popover"
        title="Title"
        :width="200"
        trigger="contextmenu"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <el-button class="m-2">contextmenu to activate</el-button>
        </template>
      </el-popover>

      <el-popover
        :visible="visible"
        placement="bottom"
        title="Title"
        :width="200"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <el-button class="m-2" @click="visible = !visible"
            >Manual to activate</el-button
          >
        </template>
      </el-popover>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="虚拟触发"
      :can-expan="true"
      help-message=""
    >
      <el-button ref="buttonRef">Click me</el-button>

      <el-popover
        ref="popoverRef"
        :virtual-ref="buttonRef"
        trigger="click"
        title="With title"
        virtual-triggering
      >
        <span> Some content </span>
      </el-popover>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="内容可扩展"
      :can-expan="true"
      help-message=""
    >
      <div style="display: flex; align-items: center">
        <el-popover placement="right" :width="400" trigger="click">
          <template #reference>
            <el-button style="margin-right: 16px">Click to activate</el-button>
          </template>
          <el-table :data="gridData">
            <el-table-column width="150" property="date" label="date" />
            <el-table-column width="100" property="name" label="name" />
            <el-table-column width="300" property="address" label="address" />
          </el-table>
        </el-popover>

        <el-popover
          :width="300"
          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        >
          <template #reference>
            <el-avatar
              src="https://avatars.githubusercontent.com/u/72015883?v=4"
            />
          </template>
          <template #default>
            <div
              class="demo-rich-conent"
              style="display: flex; gap: 16px; flex-direction: column"
            >
              <el-avatar
                :size="60"
                src="https://avatars.githubusercontent.com/u/72015883?v=4"
                style="margin-bottom: 8px"
              />
              <div>
                <p
                  class="demo-rich-content__name"
                  style="margin: 0; font-weight: 500"
                >
                  Element Plus
                </p>
                <p
                  class="demo-rich-content__mention"
                  style="
                    margin: 0;
                    font-size: 14px;
                    color: var(--el-color-info);
                  "
                >
                  @element-plus
                </p>
              </div>

              <p class="demo-rich-content__desc" style="margin: 0">
                Element Plus, a Vue 3 based component library for developers,
                designers and product managers
              </p>
            </div>
          </template>
        </el-popover>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="嵌套操作"
      :can-expan="true"
      help-message=""
    >
      <el-popover :visible="visible1" placement="top" :width="160">
        <p>Are you sure to delete this?</p>
        <div style="text-align: right; margin: 0">
          <el-button size="small" text @click="visible1 = false"
            >cancel</el-button
          >
          <el-button size="small" type="primary" @click="visible1 = false"
            >confirm</el-button
          >
        </div>
        <template #reference>
          <el-button @click="visible1 = true">Delete</el-button>
        </template>
      </el-popover>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
// import { ClickOutside as vClickOutside } from "element-plus";

export default defineComponent({
  name: "popover",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const visible = ref(false);
    const visible1 = ref(false);
    const buttonRef = ref();
    const popoverRef = ref();
    // const onClickOutside = () => {
    //   unref(popoverRef).popperRef?.delayHide?.();
    // };

    const gridData = [
      {
        date: "2016-05-02",
        name: "Jack",
        address: "New York City",
      },
      {
        date: "2016-05-04",
        name: "Jack",
        address: "New York City",
      },
      {
        date: "2016-05-01",
        name: "Jack",
        address: "New York City",
      },
      {
        date: "2016-05-03",
        name: "Jack",
        address: "New York City",
      },
    ];

    return { buttonRef, popoverRef, visible,visible1, gridData };
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

.el-button + .el-button {
  margin-left: 8px;
}
</style>
