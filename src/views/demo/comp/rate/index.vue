<template>
  <page-wrapper title="评分示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message="评分默认被分为三个等级，可以利用颜色数组对分数及情感倾向进行分级（默认情况下不区分颜色）。 三个等级所对应的颜色用 colors 属性设置，而它们对应的两个阈值则通过 low-threshold 和 high-threshold 设定。"
    >
      <div class="demo-rate-block">
        <span class="demonstration">Default</span>
        <el-rate v-model="value1" />
      </div>
      <div class="demo-rate-block">
        <span class="demonstration">Color for different levels</span>
        <el-rate v-model="value2" :colors="colors" />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="尺寸"
      :can-expan="true"
      help-message=""
    >
      <el-rate v-model="value" size="large" />
      <br />
      <el-rate v-model="value" />
      <br />
      <el-rate v-model="value" size="small" />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="允许半选"
      :can-expan="true"
      help-message=""
    >
      <el-rate v-model="value" allow-half />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="辅助文字"
      :can-expan="true"
      help-message="用辅助文字直接地表达对应分数"
    >
      <el-rate
        v-model="value"
        :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
        show-text
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="可清空"
      :can-expan="true"
      help-message="当你再次点击相同的值时，可以将值重置为 0。"
    >
      <el-rate v-model="value5" clearable />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="更多种类的图标"
      :can-expan="true"
      help-message="当有多层评价时，可以用不同类型的图标区分评分层级。"
    >
      <el-rate
        v-model="value3"
        :icons="icons"
        :void-icon="ChatRound"
        :colors="['#409eff', '#67c23a', '#FF9900']"
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="只读"
      :can-expan="true"
      help-message="只读的评分用来展示分数， 允许出现半星。"
    >
      <el-rate
        v-model="value4"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value} points"
      />
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import {
  ChatDotRound,
  ChatLineRound,
  ChatRound,
} from "@element-plus/icons-vue";

export default defineComponent({
  name: "rate",
  components: {
    CollapseContainer,
    PageWrapper,
    ChatDotRound,
    ChatLineRound,
    ChatRound,
  },

  setup(props) {
    const value = ref(null);
    const value1 = ref(null);
    const value2 = ref(null);
    const value3 = ref(3);
    const value4 = ref(3.7);
    const value5 = ref(3);
    const colors = ref(["#99A9BF", "#F7BA2A", "#FF9900"]); // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    const icons = [ChatRound, ChatLineRound, ChatDotRound]; // same as { 2: ChatRound, 4: { value: ChatLineRound, excluded: true }, 5: ChatDotRound }

    return {
      value,
      value1,
      value2,
      value3,
      value4,
      value5,
      colors,
      icons,
      ChatRound,
      ChatLineRound,
      ChatDotRound,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.demo-rate-block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
}
.demo-rate-block:last-child {
  border-right: none;
}
.demo-rate-block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
