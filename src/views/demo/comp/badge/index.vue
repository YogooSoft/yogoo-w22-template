<template>
  <page-wrapper title="徽章示例" content="按钮和图标上的数字或状态标记。">
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message="可以用来展示新消息的数量。"
    >
      <el-badge :value="12" class="item">
        <el-button>comments</el-button>
      </el-badge>
      <el-badge :value="3" class="item">
        <el-button>replies</el-button>
      </el-badge>
      <el-badge :value="1" class="item" type="primary">
        <el-button>comments</el-button>
      </el-badge>
      <el-badge :value="2" class="item" type="warning">
        <el-button>replies</el-button>
      </el-badge>

      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          Click Me
          <el-icon class="el-icon--right"><caret-bottom /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item class="clearfix">
              comments
              <el-badge class="mark" :value="12" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              replies
              <el-badge class="mark" :value="3" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="最大值"
      :can-expan="true"
      help-message="可以自定义最大值"
    >
      <el-badge :value="200" :max="99" class="item">
        <el-button>comments</el-button>
      </el-badge>
      <el-badge :value="100" :max="10" class="item">
        <el-button>replies</el-button>
      </el-badge>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义显示内容"
      :can-expan="true"
      help-message="可以展示除数字以外你想要展示的任何值。"
    >
      <el-badge value="new" class="item">
        <el-button>comments</el-button>
      </el-badge>
      <el-badge value="hot" class="item">
        <el-button>replies</el-button>
      </el-badge>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="小红点"
      :can-expan="true"
      help-message="通过一个小红点标记来告知用户有新内容。"
    >
      <el-badge is-dot class="item">query</el-badge>
      <el-badge is-dot class="item">
        <el-button class="share-button" :icon="Share" type="primary" />
      </el-badge>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { CaretBottom } from "@element-plus/icons-vue";
import { Share } from "@element-plus/icons-vue";

export default defineComponent({
  name: "badge",
  components: { CollapseContainer, PageWrapper, CaretBottom, Share },

  setup(props) {
    return { CaretBottom, Share };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}

.el-dropdown {
  margin-top: 1.1rem;
}
</style>
