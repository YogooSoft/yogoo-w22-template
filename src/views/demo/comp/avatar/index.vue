<template>
  <page-wrapper
    title="头像示例"
    content="Avatar 组件可以用来代表人物或对象， 支持使用图片、图标或者文字作为 Avatar。"
  >
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message="使用 shape 和 size 属性来设置 Avatar 的形状和大小。"
    >
      <el-row class="demo-avatar demo-basic">
        <el-col :span="12">
          <div class="sub-title">circle</div>
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="50" :src="circleUrl" />
            </div>
            <div v-for="size in sizeList" :key="size" class="block">
              <el-avatar :size="size" :src="circleUrl" />
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="sub-title">square</div>
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar shape="square" :size="50" :src="squareUrl" />
            </div>
            <div v-for="size in sizeList" :key="size" class="block">
              <el-avatar shape="square" :size="size" :src="squareUrl" />
            </div>
          </div>
        </el-col>
      </el-row>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="展示类型"
      :can-expan="true"
      help-message="支持使用图片，图标或者文字作为 Avatar。"
    >
      <div class="demo-type">
        <div>
          <el-avatar :icon="UserFilled" />
        </div>
        <div>
          <el-avatar
            :src="
              require('@/assets/sample_images/03b0d39583f48206768a7534e55bcpng.png')
            "
          />
        </div>
        <div>
          <el-avatar>user</el-avatar>
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="回退行为"
      :can-expan="true"
      help-message="图片加载失败时的回退行为。"
    >
      <div class="demo-type">
        <el-avatar :size="60" src="https://empty" @error="errorHandler">
          <img
            :src="
              require('@/assets/sample_images/0fc7d20532fdaf769a25683617711png.png')
            "
          />
        </el-avatar>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="适应容器"
      :can-expan="true"
      help-message="当使用图片作为用户头像时，设置该图片如何在容器中展示。"
    >
      <div class="demo-fit">
        <div v-for="fit in fits" :key="fit" class="block">
          <span class="title">{{ fit }}</span>
          <el-avatar shape="square" :size="100" :fit="fit" :src="url" />
        </div>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, toRefs } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { UserFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "avatar",
  components: { CollapseContainer, PageWrapper, UserFilled },

  setup(props) {
    const state = reactive({
      circleUrl: require("@/assets/sample_images/3ea6beec64369c2642b92c6726f1epng.png"),
      squareUrl: require("@/assets/sample_images/f0ee8a3c7c9638a54940382568c9dpng.png"),
      sizeList: ["small", "default", "large"] as const,
    });

    const errorHandler = () => true;

    const { circleUrl, squareUrl, sizeList } = toRefs(state);
    const state1 = reactive({
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      url: require("@/assets/sample_images/4a731a90594a4af544c0c25941171jpeg.jpeg"),
    });

    const { fits, url } = toRefs(state1);

    return {
      circleUrl,
      squareUrl,
      sizeList,
      fits,
      url,
      UserFilled,
      errorHandler,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}
.demo-basic {
  text-align: center;
}
.demo-basic .sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.demo-basic .block:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
.demo-basic .block {
  flex: 1;
}
.demo-basic .el-col:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.demo-type {
  display: flex;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.demo-fit {
  display: flex;
  text-align: center;
  justify-content: space-between;
}
.demo-fit .block {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
}

.demo-fit .title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style>
