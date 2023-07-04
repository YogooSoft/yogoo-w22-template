<template>
  <page-wrapper title="级联选择器示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="级联选择器示例"
      :can-expan="true"
      help-message="当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。"
    >
      <div class="demo-select-size">
        <div class="select-box">选项在单击时展开</div>
        <div class="select-box">选项在悬停时展开</div>
      </div>
      <div class="demo-select-size">
        <div class="select-box">
          <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"
            class="select-box"
          />
        </div>
        <div class="select-box">
          <el-cascader
            v-model="value"
            :options="options"
            :props="props1"
            @change="handleChange"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message=""
    >
      <div class="demo-select-size">
        <div class="select-box">有禁用选项</div>
        <div class="select-box">可清空</div>
        <div class="select-box">仅显示最后一级</div>
      </div>
      <div class="demo-select-size">
        <div class="select-box">
          <el-cascader :options="options" />
        </div>
        <div class="select-box">
          <el-cascader :options="options" clearable />
        </div>
        <div class="select-box">
          <el-cascader :options="options" :show-all-levels="false" />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="多选"
      :can-expan="true"
      help-message=""
    >
      <div class="demo-select-size">
        <div class="select-box">显示所有</div>
        <div class="select-box">折叠显示</div>
        <div class="select-box">折叠显示并 tooltip 提示</div>
      </div>
      <div class="demo-select-size">
        <div class="select-box">
          <el-cascader :options="options1" :props="props" clearable />
        </div>
        <div class="select-box">
          <el-cascader
            :options="options1"
            :props="props"
            collapse-tags
            clearable
          />
        </div>
        <div class="select-box">
          <el-cascader
            :options="options1"
            :props="props"
            collapse-tags
            collapse-tags-tooltip
            clearable
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="选择任意一级选项"
      :can-expan="true"
      help-message="在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。 启用该功能后，可让父子节点取消关联，选择任意一级选项。"
    >
      <div class="demo-select-size">
        <div class="select-box">单选</div>
        <div class="select-box">多选</div>
      </div>
      <div class="demo-select-size">
        <div class="select-box">
          <el-cascader :options="options" :props="props3" clearable />
        </div>
        <div class="select-box">
          <el-cascader :options="options" :props="props4" clearable />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="动态加载"
      :can-expan="true"
      help-message="当选中某一级时，动态加载该级下的选项。"
    >
      <el-cascader :props="props5" />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="可搜索"
      :can-expan="true"
      help-message="可以快捷地搜索选项并选择。"
    >
      <div class="demo-select-size">
        <div class="select-box">单选</div>
        <div class="select-box">多选</div>
      </div>
      <div class="demo-select-size">
        <div class="select-box">
          <el-cascader
            placeholder="Try searchingL Guide"
            :options="options"
            filterable
          />
        </div>
        <div class="select-box">
          <el-cascader
            placeholder="Try searchingL Guide"
            :options="options"
            :props="props"
            filterable
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义节点内容"
      :can-expan="true"
      help-message="可以自定义备选项的节点内容"
    >
      <el-cascader :options="options">
        <template #default="{ node, data }">
          <span>{{ data.label }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>
      </el-cascader>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="级联面板"
      :can-expan="true"
      help-message="级联面板是级联选择器的核心组件，与级联选择器一样，有单选、多选、动态加载等多种功能。"
    >
    <el-cascader-panel :options="options" />
  </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import type { CascaderProps } from "element-plus";

export default defineComponent({
  name: "cascader",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const value = ref([]);

    const props1 = {
      expandTrigger: "hover" as const,
    };

    const handleChange = (value) => {
      console.log(value);
    };

    const options = [
      {
        value: "guide",
        label: "Guide",
        disabled: true,
        children: [
          {
            value: "disciplines",
            label: "Disciplines",
            children: [
              {
                value: "consistency",
                label: "Consistency",
              },
              {
                value: "feedback",
                label: "Feedback",
              },
              {
                value: "efficiency",
                label: "Efficiency",
              },
              {
                value: "controllability",
                label: "Controllability",
              },
            ],
          },
          {
            value: "navigation",
            label: "Navigation",
            children: [
              {
                value: "side nav",
                label: "Side Navigation",
              },
              {
                value: "top nav",
                label: "Top Navigation",
              },
            ],
          },
        ],
      },
      {
        value: "component",
        label: "Component",
        children: [
          {
            value: "basic",
            label: "Basic",
            children: [
              {
                value: "layout",
                label: "Layout",
              },
              {
                value: "color",
                label: "Color",
              },
              {
                value: "typography",
                label: "Typography",
              },
              {
                value: "icon",
                label: "Icon",
              },
              {
                value: "button",
                label: "Button",
              },
            ],
          },
          {
            value: "form",
            label: "Form",
            children: [
              {
                value: "radio",
                label: "Radio",
              },
              {
                value: "checkbox",
                label: "Checkbox",
              },
              {
                value: "input",
                label: "Input",
              },
              {
                value: "input-number",
                label: "InputNumber",
              },
              {
                value: "select",
                label: "Select",
              },
              {
                value: "cascader",
                label: "Cascader",
              },
              {
                value: "switch",
                label: "Switch",
              },
              {
                value: "slider",
                label: "Slider",
              },
              {
                value: "time-picker",
                label: "TimePicker",
              },
              {
                value: "date-picker",
                label: "DatePicker",
              },
              {
                value: "datetime-picker",
                label: "DateTimePicker",
              },
              {
                value: "upload",
                label: "Upload",
              },
              {
                value: "rate",
                label: "Rate",
              },
              {
                value: "form",
                label: "Form",
              },
            ],
          },
          {
            value: "data",
            label: "Data",
            children: [
              {
                value: "table",
                label: "Table",
              },
              {
                value: "tag",
                label: "Tag",
              },
              {
                value: "progress",
                label: "Progress",
              },
              {
                value: "tree",
                label: "Tree",
              },
              {
                value: "pagination",
                label: "Pagination",
              },
              {
                value: "badge",
                label: "Badge",
              },
            ],
          },
          {
            value: "notice",
            label: "Notice",
            children: [
              {
                value: "alert",
                label: "Alert",
              },
              {
                value: "loading",
                label: "Loading",
              },
              {
                value: "message",
                label: "Message",
              },
              {
                value: "message-box",
                label: "MessageBox",
              },
              {
                value: "notification",
                label: "Notification",
              },
            ],
          },
          {
            value: "navigation",
            label: "Navigation",
            children: [
              {
                value: "menu",
                label: "Menu",
              },
              {
                value: "tabs",
                label: "Tabs",
              },
              {
                value: "breadcrumb",
                label: "Breadcrumb",
              },
              {
                value: "dropdown",
                label: "Dropdown",
              },
              {
                value: "steps",
                label: "Steps",
              },
            ],
          },
          {
            value: "others",
            label: "Others",
            children: [
              {
                value: "dialog",
                label: "Dialog",
              },
              {
                value: "tooltip",
                label: "Tooltip",
              },
              {
                value: "popover",
                label: "Popover",
              },
              {
                value: "card",
                label: "Card",
              },
              {
                value: "carousel",
                label: "Carousel",
              },
              {
                value: "collapse",
                label: "Collapse",
              },
            ],
          },
        ],
      },
      {
        value: "resource",
        label: "Resource",
        children: [
          {
            value: "axure",
            label: "Axure Components",
          },
          {
            value: "sketch",
            label: "Sketch Templates",
          },
          {
            value: "docs",
            label: "Design Documentation",
          },
        ],
      },
    ];

    const options1 = [
      {
        value: 1,
        label: "Asia",
        children: [
          {
            value: 2,
            label: "China",
            children: [
              { value: 3, label: "Beijing" },
              { value: 4, label: "Shanghai" },
              { value: 5, label: "Hangzhou" },
            ],
          },
          {
            value: 6,
            label: "Japan",
            children: [
              { value: 7, label: "Tokyo" },
              { value: 8, label: "Osaka" },
              { value: 9, label: "Kyoto" },
            ],
          },
          {
            value: 10,
            label: "Korea",
            children: [
              { value: 11, label: "Seoul" },
              { value: 12, label: "Busan" },
              { value: 13, label: "Taegu" },
            ],
          },
        ],
      },
      {
        value: 14,
        label: "Europe",
        children: [
          {
            value: 15,
            label: "France",
            children: [
              { value: 16, label: "Paris" },
              { value: 17, label: "Marseille" },
              { value: 18, label: "Lyon" },
            ],
          },
          {
            value: 19,
            label: "UK",
            children: [
              { value: 20, label: "London" },
              { value: 21, label: "Birmingham" },
              { value: 22, label: "Manchester" },
            ],
          },
        ],
      },
      {
        value: 23,
        label: "North America",
        children: [
          {
            value: 24,
            label: "US",
            children: [
              { value: 25, label: "New York" },
              { value: 26, label: "Los Angeles" },
              { value: 27, label: "Washington" },
            ],
          },
          {
            value: 28,
            label: "Canada",
            children: [
              { value: 29, label: "Toronto" },
              { value: 30, label: "Montreal" },
              { value: 31, label: "Ottawa" },
            ],
          },
        ],
      },
    ];

    const props3 = {
      checkStrictly: true,
    };

    const props4 = {
      multiple: true,
      checkStrictly: true,
    };

    let id = 0;
    const props5: CascaderProps = {
      lazy: true,
      lazyLoad(node, resolve) {
        const { level } = node;
        setTimeout(() => {
          const nodes = Array.from({ length: level + 1 }).map((item) => ({
            value: ++id,
            label: `Option - ${id}`,
            leaf: level >= 2,
          }));
          // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
          resolve(nodes);
        }, 1000);
      },
    };

    return {
      value,
      handleChange,
      options,
      options1,
      props1,
      props3,
      props4,
      props5,
      props: {
        // props.
        multiple: true,
      },
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.demo-select-size {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  // border: 1px solid #000;
  // margin: 0px;
  .select-box {
    width: 240px;
    margin: 0px 10px 10px 0px;
  }

  .select-box-bottom {
    width: 240px;
    margin: 0px 10px 0px 0px;
  }
}
</style>
