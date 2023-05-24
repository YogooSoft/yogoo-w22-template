<template>
  <page-wrapper
    title="走马灯示例"
    content="在有限空间内，循环播放同一类型的图片、文字等内容"
  >
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message="基础的文字链接用法。"
    >
      <div class="block text-center">
        <span class="demonstration"
          >当悬停时切换（默认）</span
        >
        <el-carousel height="150px" style="margin-top: 10px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="block text-center" style="margin-top: 10px">
        <span class="demonstration">单击时切换</span>
        <el-carousel trigger="click" height="150px" style="margin-top: 10px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="指示器"
      :can-expan="true"
      help-message="可以将指示器的显示位置设置在容器外部"
    >
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3
            style="display: flex; line-height: 300px; justify-content: center"
            text="2xl"
            justify="center"
          >
            {{ item }}
          </h3>
        </el-carousel-item>
      </el-carousel>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="切换箭头"
      :can-expan="true"
      help-message="可以设置切换箭头的显示时机"
    >
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3
            style="display: flex; line-height: 300px; justify-content: center"
            text="2xl"
            justify="center"
          >
            {{ item }}
          </h3>
        </el-carousel-item>
      </el-carousel>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="卡片化"
      :can-expan="true"
      help-message="当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格"
    >
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3
            style="display: flex; line-height: 200px; justify-content: center"
            text="2xl"
            justify="center"
          >
            {{ item }}
          </h3>
        </el-carousel-item>
      </el-carousel>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="垂直布局"
      :can-expan="true"
      help-message="默认情况下，direction 为 horizontal。 通过设置 direction 为 vertical 来让走马灯在垂直方向上显示。"
    >
      <el-carousel height="200px" direction="vertical" :autoplay="false">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3
            style="display: flex; line-height: 200px; justify-content: center"
            text="2xl"
            justify="center"
          >
            {{ item }}
          </h3>
        </el-carousel-item>
      </el-carousel>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "carousel",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    return {};
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__item h3 {
  font-size: 24px;
  font-weight: 600;
}
</style>
