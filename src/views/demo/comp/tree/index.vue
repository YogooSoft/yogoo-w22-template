<template>
  <page-wrapper title="树形控件示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message="用清晰的层级结构展示信息，可展开或折叠。"
    >
      <div class="demo-tree-size">
        <div class="tree-box">基础</div>
        <div class="tree-box">可选择</div>
        <div class="tree-box">懒加载自定义叶子节点</div>
      </div>
      <div class="demo-tree-size">
        <el-tree
          class="tree-box"
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
        <el-tree
          class="tree-box"
          :props="props1"
          :load="loadNode"
          lazy
          show-checkbox
          @check-change="handleCheckChange1"
        />
        <el-tree
          class="tree-box"
          :props="props2"
          :load="loadNode2"
          lazy
          show-checkbox
        />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="禁用"
      :can-expan="true"
      help-message="节点的复选框可以设置为禁用。可将 Tree 的某些节点设置为禁用状态"
    >
      <div class="demo-tree-size">
        <div class="tree-box">禁用复选框</div>
        <div class="tree-box">禁用状态</div>
      </div>
      <div class="demo-tree-size">
        <el-tree
          class="tree-box"
          :data="data3"
          :props="defaultProps3"
          show-checkbox
        />
        <el-tree
          class="tree-box"
          :data="data4"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps4"
        />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="树节点的选择"
      :can-expan="true"
      help-message="本例展示如何获取和设置选中节点。 获取和设置各有两种方式：通过 node 或通过 key。 如果需要通过 key 来获取或设置，则必须设置 node-key。"
    >
      <el-tree
        ref="treeRef"
        :data="data5"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :props="defaultProps5"
      />

      <div class="cl-mb-10-top">
        <el-button @click="getCheckedNodes">get by node</el-button>
        <el-button @click="getCheckedKeys">get by key</el-button>
        <el-button @click="setCheckedNodes">set by node</el-button>
        <el-button @click="setCheckedKeys">set by key</el-button>
        <el-button @click="resetChecked">reset</el-button>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义节点内容"
      :can-expan="true"
      help-message="节点的内容支持自定义，可以在节点区添加按钮或图标等内容"
    >
      <div>
        <p>Using render-content</p>
        <el-tree
          :data="dataSource"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
        />
        <p>Using scoped slot</p>
        <el-tree
          :data="dataSource"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <a @click="append(data)"> Append </a>
                <a style="margin-left: 8px" @click="remove(node, data)">
                  Delete
                </a>
              </span>
            </span>
          </template>
        </el-tree>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义节点名"
      :can-expan="true"
      help-message="节点的类名支持自定义。"
    >
      <div class="custom-tree-node-container">
        <el-tree
          :data="data6"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :props="{ class: customNodeClass }"
        />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="树节点过滤"
      :can-expan="true"
      help-message="树节点是可以被过滤的"
    >
      <el-input v-model="filterText" placeholder="Filter keyword" />

      <el-tree
        ref="treeRef"
        class="filter-tree"
        :data="data7"
        :props="defaultProps7"
        default-expand-all
        :filter-node-method="filterNode"
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="手风琴模式"
      :can-expan="true"
      help-message="对于同一级的节点，每次只能展开一个"
    >
      <el-tree
        :data="data"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick"
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="可拖拽节点"
      :can-expan="true"
      help-message="通过 draggable 属性可让节点变为可拖拽"
    >
      <el-tree
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        :data="data"
        draggable
        default-expand-all
        node-key="id"
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
      />
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, h, watch } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import type Node from "element-plus/es/components/tree/src/model/node";
import { ElTree } from "element-plus";
import ElMessage from "element-plus/lib/components/message";

import type { DragEvents } from "element-plus/es/components/tree/src/model/useDragNode";

import type { AllowDropType, NodeDropType } from "#/config";

interface Tree {
  label: string;
  children?: Tree[];
}

interface Tree1 {
  name: string;
}

interface Tree3 {
  name: string;
  leaf?: boolean;
}

interface Tree5 {
  id: number;
  label: string;
  children?: Tree5[];
}

interface Tree6 {
  id: number;
  label: string;
  isPenultimate?: boolean;
  children?: Tree6[];
}

interface Tree7 {
  id: number;
  label: string;
  children?: Tree7[];
}

export default defineComponent({
  name: "tree",
  components: { CollapseContainer, PageWrapper, h },

  setup(props) {
    const handleNodeClick = (data: Tree) => {
      console.log(data);
    };

    const data: Tree[] = [
      {
        label: "Level one 1",
        children: [
          {
            label: "Level two 1-1",
            children: [
              {
                label: "Level three 1-1-1",
              },
            ],
          },
        ],
      },
      {
        label: "Level one 2",
        children: [
          {
            label: "Level two 2-1",
            children: [
              {
                label: "Level three 2-1-1",
              },
            ],
          },
          {
            label: "Level two 2-2",
            children: [
              {
                label: "Level three 2-2-1",
              },
            ],
          },
        ],
      },
      {
        label: "Level one 3",
        children: [
          {
            label: "Level two 3-1",
            children: [
              {
                label: "Level three 3-1-1",
              },
            ],
          },
          {
            label: "Level two 3-2",
            children: [
              {
                label: "Level three 3-2-1",
              },
            ],
          },
        ],
      },
    ];

    const defaultProps = {
      children: "children",
      label: "label",
    };

    let count = 1;
    const props1 = {
      label: "name",
      children: "zones",
    };

    const handleCheckChange1 = (
      data: Tree1,
      checked: boolean,
      indeterminate: boolean
    ) => {
      console.log(data, checked, indeterminate);
    };

    const loadNode = (node: Node, resolve: (data: Tree1[]) => void) => {
      if (node.level === 0) {
        return resolve([{ name: "Root1" }, { name: "Root2" }]);
      }
      if (node.level > 3) return resolve([]);

      let hasChild = false;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        let data: Tree1[] = [];
        if (hasChild) {
          data = [
            {
              name: `zone${count++}`,
            },
            {
              name: `zone${count++}`,
            },
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    };

    const props2 = {
      label: "name",
      children: "zones",
      isLeaf: "leaf",
    };

    const loadNode2 = (node: Node, resolve: (data: Tree3[]) => void) => {
      if (node.level === 0) {
        return resolve([{ name: "region" }]);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data: Tree3[] = [
          {
            name: "leaf",
            leaf: true,
          },
          {
            name: "zone",
          },
        ];

        resolve(data);
      }, 500);
    };

    const defaultProps3 = {
      children: "children",
      label: "label",
      disabled: "disabled",
    };

    const data3 = [
      {
        id: 1,
        label: "Level one 1",
        children: [
          {
            id: 3,
            label: "Level two 2-1",
            children: [
              {
                id: 4,
                label: "Level three 3-1-1",
              },
              {
                id: 5,
                label: "Level three 3-1-2",
                disabled: true,
              },
            ],
          },
          {
            id: 2,
            label: "Level two 2-2",
            disabled: true,
            children: [
              {
                id: 6,
                label: "Level three 3-2-1",
              },
              {
                id: 7,
                label: "Level three 3-2-2",
                disabled: true,
              },
            ],
          },
        ],
      },
    ];

    const defaultProps4 = {
      children: "children",
      label: "label",
    };
    const data4 = [
      {
        id: 1,
        label: "Level one 1",
        children: [
          {
            id: 4,
            label: "Level two 1-1",
            children: [
              {
                id: 9,
                label: "Level three 1-1-1",
              },
              {
                id: 10,
                label: "Level three 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Level one 2",
        children: [
          {
            id: 5,
            label: "Level two 2-1",
          },
          {
            id: 6,
            label: "Level two 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "Level one 3",
        children: [
          {
            id: 7,
            label: "Level two 3-1",
          },
          {
            id: 8,
            label: "Level two 3-2",
          },
        ],
      },
    ];

    const treeRef = ref<InstanceType<typeof ElTree>>();

    const getCheckedNodes = () => {
      ElMessage({
        message: "请查看 console 输出日志",
        type: "success",
      });
      console.log(treeRef.value!.getCheckedNodes(false, false));
    };
    const getCheckedKeys = () => {
      ElMessage({
        message: "请查看 console 输出日志",
        type: "success",
      });
      console.log(treeRef.value!.getCheckedKeys(false));
    };
    const setCheckedNodes = () => {
      treeRef.value!.setCheckedNodes(
        [
          {
            id: 5,
            label: "Level two 2-1",
          },
          {
            id: 9,
            label: "Level three 1-1-1",
          },
        ] as Node[],
        false
      );
    };
    const setCheckedKeys = () => {
      treeRef.value!.setCheckedKeys([3], false);
    };
    const resetChecked = () => {
      treeRef.value!.setCheckedKeys([], false);
    };

    const defaultProps5 = {
      children: "children",
      label: "label",
    };

    const data5: Tree5[] = [
      {
        id: 1,
        label: "Level one 1",
        children: [
          {
            id: 4,
            label: "Level two 1-1",
            children: [
              {
                id: 9,
                label: "Level three 1-1-1",
              },
              {
                id: 10,
                label: "Level three 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Level one 2",
        children: [
          {
            id: 5,
            label: "Level two 2-1",
          },
          {
            id: 6,
            label: "Level two 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "Level one 3",
        children: [
          {
            id: 7,
            label: "Level two 3-1",
          },
          {
            id: 8,
            label: "Level two 3-2",
          },
        ],
      },
    ];

    let id = 1000;

    const append = (data: Tree5) => {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        data.children = [];
      }
      data.children.push(newChild);
      dataSource.value = [...dataSource.value];
    };

    const remove = (node: Node, data: Tree5) => {
      const parent = node.parent;
      const children: Tree5[] = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      dataSource.value = [...dataSource.value];
    };

    // const renderContent = (
    //   h,
    //   {
    //     node,
    //     data,
    //     store,
    //   }: {
    //     node: Node;
    //     data: Tree5;
    //     store: Node["store"];
    //   }
    // ) => {
    //   return h(
    //     "span",
    //     {
    //       class: "custom-tree-node",
    //     },
    //     h("span", null, node.label),
    //     h(
    //       "span",
    //       null,
    //       h(
    //         "a",
    //         {
    //           onClick: () => append(data),
    //         },
    //         "Append "
    //       ),
    //       h(
    //         "a",
    //         {
    //           style: "margin-left: 8px",
    //           onClick: () => remove(node, data),
    //         },
    //         "Delete"
    //       )
    //     )
    //   );
    // };

    const renderContent = (
      h,
      {
        node,
        data,
        store,
      }: {
        node: Node;
        data: Tree5;
        store: Node["store"];
      }
    ) => {
      return h(
        "div",
        {
           class: "custom-tree-node",
           style: "display: flex; justify-content: space-between;"
        },
        h("span", null, node.label),
        h(
          "span",
          {
            style: "text-align: right;"
          },
          h(
            "a",
            {
              onClick: () => append(data),
            },
            "Append "
          ),
          h(
            "a",
            {
              style: "margin-left: 8px",
              onClick: () => remove(node, data),
            },
            "Delete"
          )
        )
      );
    };

    const dataSource = ref<Tree5[]>([
      {
        id: 1,
        label: "Level one 1",
        children: [
          {
            id: 4,
            label: "Level two 1-1",
            children: [
              {
                id: 9,
                label: "Level three 1-1-1",
              },
              {
                id: 10,
                label: "Level three 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Level one 2",
        children: [
          {
            id: 5,
            label: "Level two 2-1",
          },
          {
            id: 6,
            label: "Level two 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "Level one 3",
        children: [
          {
            id: 7,
            label: "Level two 3-1",
          },
          {
            id: 8,
            label: "Level two 3-2",
          },
        ],
      },
    ]);

    const customNodeClass = (data: Tree6, node: Node) => {
      if (data.isPenultimate) {
        return "is-penultimate";
      }
      return null;
    };

    const data6: Tree6[] = [
      {
        id: 1,
        label: "Level one 1",
        children: [
          {
            id: 4,
            label: "Level two 1-1",
            isPenultimate: true,
            children: [
              {
                id: 9,
                label: "Level three 1-1-1",
              },
              {
                id: 10,
                label: "Level three 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Level one 2",
        isPenultimate: true,
        children: [
          {
            id: 5,
            label: "Level two 2-1",
          },
          {
            id: 6,
            label: "Level two 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "Level one 3",
        isPenultimate: true,
        children: [
          {
            id: 7,
            label: "Level two 3-1",
          },
          {
            id: 8,
            label: "Level two 3-2",
          },
        ],
      },
    ];

    const filterText = ref("");

    const defaultProps7 = {
      children: "children",
      label: "label",
    };

    watch(filterText, (val) => {
      treeRef.value!.filter(val);
    });

    const filterNode = (value: string, data: Tree) => {
      if (!value) return true;
      return data.label.includes(value);
    };

    const data7: Tree7[] = [
      {
        id: 1,
        label: "Level one 1",
        children: [
          {
            id: 4,
            label: "Level two 1-1",
            children: [
              {
                id: 9,
                label: "Level three 1-1-1",
              },
              {
                id: 10,
                label: "Level three 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Level one 2",
        children: [
          {
            id: 5,
            label: "Level two 2-1",
          },
          {
            id: 6,
            label: "Level two 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "Level one 3",
        children: [
          {
            id: 7,
            label: "Level two 3-1",
          },
          {
            id: 8,
            label: "Level two 3-2",
          },
        ],
      },
    ];

    const handleDragStart = (node: Node, ev: DragEvents) => {
      console.log("drag start", node);
    };
    const handleDragEnter = (
      draggingNode: Node,
      dropNode: Node,
      ev: DragEvents
    ) => {
      console.log("tree drag enter:", dropNode.label);
    };
    const handleDragLeave = (
      draggingNode: Node,
      dropNode: Node,
      ev: DragEvents
    ) => {
      console.log("tree drag leave:", dropNode.label);
    };
    const handleDragOver = (
      draggingNode: Node,
      dropNode: Node,
      ev: DragEvents
    ) => {
      console.log("tree drag over:", dropNode.label);
    };
    const handleDragEnd = (
      draggingNode: Node,
      dropNode: Node,
      dropType: NodeDropType,
      ev: DragEvents
    ) => {
      console.log("tree drag end:", dropNode && dropNode.label, dropType);
    };
    const handleDrop = (
      draggingNode: Node,
      dropNode: Node,
      dropType: NodeDropType,
      ev: DragEvents
    ) => {
      console.log("tree drop:", dropNode.label, dropType);
    };
    const allowDrop = (
      draggingNode: Node,
      dropNode: Node,
      type: AllowDropType
    ) => {
      if (dropNode.data.label === "Level two 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    };
    const allowDrag = (draggingNode: Node) => {
      return !draggingNode.data.label.includes("Level three 3-1-1");
    };

    return {
      handleNodeClick,
      data,
      defaultProps,
      props1,
      handleCheckChange1,
      loadNode,
      props2,
      loadNode2,
      defaultProps3,
      data3,
      defaultProps4,
      data4,
      defaultProps5,
      data5,
      getCheckedNodes,
      getCheckedKeys,
      setCheckedNodes,
      setCheckedKeys,
      resetChecked,
      treeRef,
      append,
      remove,
      renderContent,
      dataSource,
      customNodeClass,
      data6,
      defaultProps7,
      data7,
      filterText,
      filterNode,
      allowDrop,
      allowDrag,
      handleDragStart,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDragEnd,
      handleDrop,
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
.demo-tree-size {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  // border: 1px solid #000;
  // margin: 0px;
  .tree-box {
    width: 240px;
    margin: 0px 10px 10px 0px;
  }

  .tree-box-bottom {
    width: 240px;
    margin: 0px 10px 0px 0px;
  }
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.is-penultimate > .el-tree-node__content {
  color: #626aef;
}

:deep(a) {
  color: #2a7dc9;
  text-decoration: none;
  // background-color: cadetblue;
}
</style>
