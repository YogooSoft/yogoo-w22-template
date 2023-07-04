<template>
  <page-wrapper title="下拉菜单示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="下拉菜单示例"
      :can-expan="true"
      help-message="将动作或菜单折叠到下拉菜单中。"
    >
      <div class="demo-dropdown-size">
        <div class="dropdown-box">基础用法</div>
        <div class="dropdown-box">按钮触发</div>
        <div class="dropdown-box">分隔符</div>
      </div>
      <div class="demo-dropdown-size">
        <div class="dropdown-box">
          <el-dropdown>
            <span class="el-dropdown-link">
              Dropdown List
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="dropdown-box">
          <el-dropdown>
            <el-button type="primary">
              Dropdown List<el-icon class="el-icon--right"
                ><arrow-down
              /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="dropdown-box">
          <el-dropdown split-button type="primary" @click="handleClick">
            Dropdown List
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="尺寸"
      :can-expan="true"
      help-message=""
    >
      <div class="demo-dropdown-size">
        <div class="dropdown-box">
          <el-dropdown size="large" split-button type="primary">
            Large
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="dropdown-box">
          <el-dropdown split-button type="primary">
            Default
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="dropdown-box">
          <el-dropdown size="small" split-button type="primary">
            Small
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="触发方式"
      :can-expan="true"
      help-message="可以配置点击激活或者悬停激活。"
    >
      <el-row class="block-col-2">
        <el-col :span="8">
          <span class="demonstration">悬停触发</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              Dropdown List<el-icon class="el-icon--right"
                ><arrow-down
              /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
                <el-dropdown-item :icon="CirclePlusFilled">
                  Action 2
                </el-dropdown-item>
                <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
                <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
                <el-dropdown-item :icon="CircleCheck"
                  >Action 5</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
        <el-col :span="8">
          <span class="demonstration">单击触发</span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              Dropdown List<el-icon class="el-icon--right"
                ><arrow-down
              /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
                <el-dropdown-item :icon="CirclePlusFilled">
                  Action 2
                </el-dropdown-item>
                <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
                <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
                <el-dropdown-item :icon="CircleCheck"
                  >Action 5</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
        <el-col :span="8">
          <span class="demonstration">右键单击触发</span>
          <el-dropdown trigger="contextmenu">
            <span class="el-dropdown-link">
              Dropdown List<el-icon class="el-icon--right"
                ><arrow-down
              /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
                <el-dropdown-item :icon="CirclePlusFilled">
                  Action 2
                </el-dropdown-item>
                <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
                <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
                <el-dropdown-item :icon="CircleCheck"
                  >Action 5</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="菜单隐藏方式"
      :can-expan="true"
      help-message="通过 hide-on-click 属性来配置。"
    >
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
            <el-dropdown-item divided>Action 6</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="指令事件"
      :can-expan="true"
      help-message="点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。"
    >
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">Action 1</el-dropdown-item>
            <el-dropdown-item command="b">Action 2</el-dropdown-item>
            <el-dropdown-item command="c">Action 3</el-dropdown-item>
            <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
            <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="下拉方法"
      :can-expan="true"
      help-message="您可以手动使用 手动打开 或 手动关闭下拉菜单以打开或关闭"
    >
      <div style="font-size: 14px">
        <p>鼠标右键触发打开（关闭）下拉列表2将关闭（打开）下拉列表1。</p>
      </div>
      <div style="margin: 10px 0px 10px 0px">
        <el-button @click="showClick">show</el-button>
      </div>
      <el-dropdown
        ref="dropdown1"
        trigger="contextmenu"
        style="margin-right: 30px"
      >
        <span class="el-dropdown-link"> Dropdown List1 </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown trigger="contextmenu" @visible-change="handleVisible2">
        <span class="el-dropdown-link"> Dropdown List2 </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import {
  ArrowDown,
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "dropdown",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const handleClick = () => {
      // eslint-disable-next-line no-alert
      //alert("button click");
      ElMessage(`"button click"`);
    };

    const handleCommand = (command: string | number | object) => {
      ElMessage(`click on item ${command}`);
    };

    const dropdown1 = ref();
    function handleVisible2(visible: any) {
      if (visible) {
        dropdown1.value.handleClose();
      } else {
        dropdown1.value.handleOpen();
      }
    }
    function showClick() {
      dropdown1.value.handleOpen();
    }

    return {
      handleClick,
      ArrowDown,
      Check,
      CircleCheck,
      CirclePlus,
      CirclePlusFilled,
      Plus,
      handleCommand,
      dropdown1,
      handleVisible2,
      showClick,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  color: @--color-primary;
  display: flex;
  align-items: center;
}

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.block-col-2 .demonstration {
  display: block;
  //color: var(--el-text-color-secondary);
  //font-size: 14px;
  margin-bottom: 20px;
}

.demo-dropdown-size {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  // border: 1px solid #000;
  // margin: 0px;
  .dropdown-box {
    width: 240px;
    margin: 0px 10px 10px 0px;
  }

  .dropdown-box-bottom {
    width: 240px;
    margin: 0px 10px 0px 0px;
  }
}
</style>
