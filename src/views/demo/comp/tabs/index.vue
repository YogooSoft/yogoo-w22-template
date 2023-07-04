<template>
  <page-wrapper title="标签页示例" content="分隔内容上有关联但属于不同类别的数据集合">
    <collapse-container
      class="cl-mb-10"
      title="基础用法示例"
      :can-expan="true"
      help-message="基础的、简洁的标签页"
    >
      <div class="flex-1">
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="User" name="first">User</el-tab-pane>
          <el-tab-pane label="Config" name="second">Config</el-tab-pane>
          <el-tab-pane label="Role" name="third">Role</el-tab-pane>
          <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
        </el-tabs>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="卡片风格的标签"
      :can-expan="true"
      help-message="可以设置具有卡片风格的标签"
    >
      <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="带有边框的卡片风格"
      :can-expan="true"
      help-message=""
    >
      <el-tabs type="border-card">
        <el-tab-pane label="User">User</el-tab-pane>
        <el-tab-pane label="Config">Config</el-tab-pane>
        <el-tab-pane label="Role">Role</el-tab-pane>
        <el-tab-pane label="Task">Task</el-tab-pane>
      </el-tabs>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="标签位置的设置"
      :can-expan="true"
      help-message=""
    >
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
        <el-radio-button label="top">top</el-radio-button>
        <el-radio-button label="right">right</el-radio-button>
        <el-radio-button label="bottom">bottom</el-radio-button>
        <el-radio-button label="left">left</el-radio-button>
      </el-radio-group>

      <el-tabs
        :tab-position="tabPosition"
        style="height: 200px"
        class="demo-tabs"
      >
        <el-tab-pane label="User">User</el-tab-pane>
        <el-tab-pane label="Config">Config</el-tab-pane>
        <el-tab-pane label="Role">Role</el-tab-pane>
        <el-tab-pane label="Task">Task</el-tab-pane>
      </el-tabs>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义标签页的内容"
      :can-expan="true"
      help-message=""
    >
      <el-tabs type="border-card" class="demo-tabs">
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><calendar /></el-icon>
              <span>Route</span>
            </span>
          </template>
          Route
        </el-tab-pane>
        <el-tab-pane label="Config">Config</el-tab-pane>
        <el-tab-pane label="Role">Role</el-tab-pane>
        <el-tab-pane label="Task">Task</el-tab-pane>
      </el-tabs>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="动态增减标签页"
      :can-expan="true"
      help-message=""
    >
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        editable
        class="demo-tabs"
        @edit="handleTabsEdit"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          {{ item.content }}
        </el-tab-pane>
      </el-tabs>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义增加标签页触发器"
      :can-expan="true"
      help-message=""
    >
      <div style="margin-bottom: 20px">
        <el-button size="small" @click="addTab(editableTabsValue)">
          add tab
        </el-button>
      </div>
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        class="demo-tabs"
        closable
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          {{ item.content }}
        </el-tab-pane>
      </el-tabs>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import type { TabsPaneContext } from "element-plus";
import { Calendar } from "@element-plus/icons-vue";

export default defineComponent({
  name: "tabs",
  components: { CollapseContainer, PageWrapper, Calendar },

  setup(props) {
    const activeName = ref("first");
    const tabPosition = ref("left");

    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event);
    };

    let tabIndex = 2;
    const editableTabsValue = ref("2");
    const editableTabs = ref([
      {
        title: "Tab 1",
        name: "1",
        content: "Tab 1 content",
      },
      {
        title: "Tab 2",
        name: "2",
        content: "Tab 2 content",
      },
    ]);

    const handleTabsEdit = (targetName: string, action: "remove" | "add") => {
      if (action === "add") {
        const newTabName = `${++tabIndex}`;
        editableTabs.value.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content",
        });
        editableTabsValue.value = newTabName;
      } else if (action === "remove") {
        const tabs = editableTabs.value;
        let activeName = editableTabsValue.value;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        editableTabsValue.value = activeName;
        editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
      }
    };

    const addTab = (targetName: string) => {
      const newTabName = `${++tabIndex}`;
      editableTabs.value.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content",
      });
      editableTabsValue.value = newTabName;
    };
    const removeTab = (targetName: string) => {
      console.log("======targetName=====", targetName);
      const tabs = editableTabs.value;
      let activeName = editableTabsValue.value;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
          
    editableTabsValue.value = activeName;
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
    };


    return {
      activeName,
      handleClick,
      tabPosition,
      editableTabsValue,
      editableTabs,
      handleTabsEdit,
      addTab,
      removeTab,
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
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
