<template>
  <page-wrapper title="分割线示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="分割线示例"
      :can-expan="true"
      help-message="对不同段落的文本进行分割"
    >
      <div>
        <span
          >I sit at my window this morning where the world like a passer-by
          stops for a moment, nods to me and goes.</span
        >
        <el-divider />
        <span
          >There little thoughts are the rustle of leaves; they have their
          whisper of joy in my mind.</span
        >
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="设置文案"
      :can-expan="true"
      help-message="可以在分割线上自定义文本内容"
    >
      <div>
        <span>你看不到你是什么，你看到的是你的影子。 </span>
        <el-divider content-position="left">罗宾德拉纳特·泰戈尔</el-divider>
        <span
          >我的愿望是愚蠢的，他们在你的歌声中呼喊，我的主人。让我听听。</span
        >
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <span>我不能选择最好的。最好的选择了我。</span>
        <el-divider content-position="right">罗宾德拉纳特·泰戈尔</el-divider>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="虚线"
      :can-expan="true"
      help-message="可以设置分隔符的样式"
    >
      <div>
        <span>What language is thine, O sea?</span>
        <el-divider border-style="dashed" />
        <span>The language of eternal question.</span>
      </div>
      <el-divider border-style="dotted" />
      <span>What language is thy answer, O sky?</span>
      <el-divider border-style="double" />
      <span>The language of eternal silence.</span>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="垂直分隔线"
      :can-expan="true"
      help-message=""
    >
      <div>
        <span>Rain</span>
        <el-divider direction="vertical" />
        <span>Home</span>
        <el-divider direction="vertical" border-style="dashed" />
        <span>Grass</span>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { StarFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "divider",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    return {};
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
</style>
