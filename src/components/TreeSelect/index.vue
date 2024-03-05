<template>
  <!-- :visible="isShowSelect" -->
  <div style="width: 284px; display: inline-block; margin-left: -5px">
    <el-popover
      placement="bottom"
      :width="width + 24"
      trigger="click"
      @hide="popoverHide"
      clearable
    >
      <template #reference>
        <el-select
          :style="selectStyle"
          ref="select"
          v-model="selectedData"
          :multiple="multiple"
          collapse-tags
          clearable
          @blur="select_blur"
          slot="reference"
          @click.native="isShowSelect = !isShowSelect"
          class="tree-select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>

      <template #default>
        <!-- el-tree 开始 -->
        <el-input placeholder="输入关键字进行检索" v-model="filterText">
        </el-input>
        <el-tree
          class="common-tree"
          :style="style"
          clearable
          ref="tree"
          :data="branch_select_data"
          :props="defaultProps"
          :show-checkbox="multiple"
          :node-key="nodeKey"
          :check-strictly="checkStrictly"
          :expand-on-click-node="false"
          :default-checked-keys="defaultCheckedKeys"
          :highlight-current="true"
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
          :filter-node-method="filterNode"
          :default-expanded-keys="['9999']"
        >
          <template #default="{ node, data }">
            <span
              :class="{
                'custom-origan-tree-node':
                  data['children'] && data['children'].length,
              }"
              class="custom-tree-node"
              :title="node.label"
              style="
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #666666;
              "
            >
              <span>{{ node.label }}</span>
            </span>
          </template>
        </el-tree>
      </template>
      <!-- el-select 开始 -->
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "tree-select",
  // props: ["clear"],
  props: {
    // 树结构数据
    branch_select_data: {
      type: Array,
      default() {
        return [];
      },
    },
    // 是否可选根节点
    rootNodeChick: Boolean,
    // 是否清空数据
    clear: Number,
    defaultProps: {
      type: Object,
      default() {
        return {
          children: "children", //树形结构数据中对应的属性名称，可改为自己数据中属性
          label: "label", //树形结构数据中对应的属性名称，可改为自己数据中属性
        };
      },
    },
    // 配置是否可多选
    multiple: {
      type: Boolean,
      default() {
        return false;
      },
    },
    //树形结构数据中对应的属性名称，可改为自己数据中属性
    nodeKey: {
      type: String,
      default() {
        return "id";
      },
    },
    filterText: {
      type: String,
      default() {
        return "";
      },
    },
    // 显示复选框情况下，是否严格遵循父子不互相关联
    checkStrictly: {
      type: Boolean,
      default() {
        return false;
      },
    },
    // 默认选中的节点key数组
    checkedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    width: {
      type: Number,
      default() {
        return 260;
      },
    },
    height: {
      type: Number,
      default() {
        return 360;
      },
    },
  },
  data() {
    return {
      defaultCheckedKeys: [],
      isShowSelect: false, // 是否显示树状选择器
      options: [],
      selectedData: [], // 选中的节点
      style:
        "width:" +
        this.width +
        "px;overflow:scroll;max-height:200px;margin-top:10px",
      selectStyle: "width:" + (this.width + 24) + "px;",
      checkedIds: [],
      checkedData: [],
    };
  },
  mounted() {
    if (this.checkedKeys.length > 0) {
      if (this.multiple) {
        this.defaultCheckedKeys = this.checkedKeys;
        this.selectedData = this.checkedKeys.map((item) => {
          var node = this.$refs.tree.getNode(item);
          return node.label;
        });
      } else {
        var item = this.checkedKeys[0];
        this.$refs.tree.setCurrentKey(item);
        var node = this.$refs.tree.getNode(item);
        this.selectedData = node.label;
      }
    }
  },
  methods: {
    filterNode(value, data, node) {
      if (!value) return true;
      if (data.label) {
        return this.chooseNode(value, data, node);
      }

      // return data.label.indexOf(value) !== -1;
    },
    // 过滤父节点 / 子节点 (如果输入的参数是父节点且能匹配，则返回该节点以及其下的所有子节点；如果参数是子节点，则返回该节点的父节点。name是中文字符，enName是英文字符.
    chooseNode(value, data, node) {
      if (data.label.indexOf(value) !== -1) {
        return true;
      }
      const level = node.level;
      // 如果传入的节点本身就是一级节点就不用校验了
      if (level === 1) {
        return false;
      }
      // 先取当前节点的父节点
      let parentData = node.parent;
      // 遍历当前节点的父节点
      let index = 0;
      while (index < level - 1) {
        // 如果匹配到直接返回，此处name值是中文字符，enName是英文字符。判断匹配中英文过滤
        if (parentData.data.label.indexOf(value) !== -1) {
          return true;
        }
        // 否则的话再往上一层做匹配
        parentData = parentData.parent;
        index++;
      }
      // 没匹配到返回false
      return false;
    },
    loadCheckedKeys() {
      if (this.checkedKeys.length > 0) {
        if (this.multiple) {
          this.defaultCheckedKeys = this.checkedKeys;
          this.selectedData = this.checkedKeys.map((item) => {
            var node = this.$refs.tree.getNode(item);
            return node.label;
          });
        } else {
          var item = this.checkedKeys[0];
          this.$refs.tree.setCurrentKey(item);
          var node = this.$refs.tree.getNode(item);
          this.selectedData = node.label;
        }
      }
    },
    changeIsShowSelect() {
      // alert(1);
      this.isShowSelect = false;
    },
    popoverHide() {
      this.checkedIds = [];
      this.checkedData = [];
      if (this.multiple) {
        // handleCheckChange();
        // this.checkedIds = this.$refs.tree.getCheckedNodes(); // 所有被选中的节点的 key 所组成的数组数据
        // this.checkedData = this.$refs.tree.getCheckedNodes(); // 所有被选中的节点所组成的数组数据
        var checkedKeys = this.$refs.tree.getCheckedNodes(); // 所有被选中的节点的 key 所组成的数组数据
        // console.log("==checkedKeys==", this.$refs.tree.getCheckedNodes());
        checkedKeys.forEach((item) => {
          // var node = this.$refs.tree.getCheckedNodes(item); // 所有被选中的节点对应的node
          var node = item; // 所有被选中的节点对应的node
          let tmpMap = {};
          // console.log("==node2=", node);
          // if (node.childNodes.length == 0) {
          if (node.children.length == 0) {
            this.checkedIds.push(node.id);

            this.checkedData.push(node);
          }
        });
      } else {
        this.checkedIds = this.$refs.tree.getCurrentKey();
        this.checkedData = this.$refs.tree.getCurrentNode();
      }
      this.$emit("popoverHide", this.checkedIds, this.checkedData);
    },
    // 节点被点击时的回调,返回被点击的节点数据
    handleNodeClick(data, node) {
      if (!this.multiple) {
        let tmpMap = {};
        tmpMap.value = node.key;
        tmpMap.label = node.label;
        this.options = [];
        this.options.push(tmpMap);
        this.selectedData = node.label;
        this.isShowSelect = !this.isShowSelect;
        // console.log("==this.options=", this.options);
      }
    },
    // 节点选中状态发生变化时的回调
    handleCheckChange() {
      var checkedKeys = this.$refs.tree.getCheckedNodes(); // 所有被选中的节点的 key 所组成的数组数据
      // console.log("==checkedKeys==", this.$refs.tree.getCheckedNodes());
      this.options = [];
      if (!this.rootNodeChick)
        checkedKeys.forEach((item) => {
          // var node = this.$refs.tree.getCheckedNodes(item); // 所有被选中的节点对应的node
          var node = item; // 所有被选中的节点对应的node
          let tmpMap = {};
          // console.log("==node=", node);
          // if (node.childNodes.length == 0) {
          if (node.children.length == 0) {
            tmpMap.value = node.key;
            tmpMap.label = node.label;

            this.options.push(tmpMap);
          }
        });
      else
        this.options = checkedKeys.map((item) => {
          var node = item; // 所有被选中的节点对应的node
          let tmpMap = {};
          tmpMap.value = node.key;
          tmpMap.label = node.label;
          return tmpMap;
        });
      this.selectedData = this.options.map((item) => {
        return item.label;
      });
      // console.log("==this.options=", this.options);
    },

    select_blur() {
      // alert(1);
      // this.isShowSelect = false;
    },
    filterMethod(keyWord) {
      this.$refs.tree.filter(keyWord);
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    isShowSelect(val) {
      // 隐藏select自带的下拉框
      this.$refs.select.blur();
    },
    clear: function (n, o) {
      //箭头函数  不然会发生this改变
      if (n != 0) {
        this.selectedData = [];
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys([]);
        });
      }
    },
    selectedData: function (newData, oldData) {
      this.popoverHide();
      if (
        newData == undefined ||
        newData == null ||
        newData == [] ||
        newData.length == 0
      )
        this.$refs.tree.setCheckedKeys([]);
    },
  },
};
</script>

<style scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 999;
}
.common-tree {
  overflow: auto;
}
.tree-select .el-select__tags .el-tag .el-tag__close {
  display: none;
}
.tree-select .el-select__tags .el-tag .el-icon-close {
  display: none;
}
</style>

<style>
.tree-select .el-select__tags .el-tag .el-tag__close {
  display: none;
}
.tree-select .el-select__tags .el-tag .el-icon-close {
  display: none;
}
/* .el-popper.is-light {
  display: none;
} */
</style>
