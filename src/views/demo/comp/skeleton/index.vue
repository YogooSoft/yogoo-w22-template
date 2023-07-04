<template>
  <page-wrapper
    title="骨架图示例"
    content="在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好"
  >
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message="基础的骨架效果,可以配置骨架屏段落数量，以便更接近真实渲染效果。显示的数量会比传入的数量多 1，首行会被渲染一个长度 33% 的段首"
    >
      <div class="demo-skeleton-box">
        <div class="skeleton-box">
          <div>基础用法</div>
          <div style="margin-top: 10px">
            <el-skeleton />
            <br />
            <el-skeleton style="--el-skeleton-circle-size: 50px">
              <template #template>
                <el-skeleton-item variant="circle" />
              </template>
            </el-skeleton>
          </div>
        </div>
        <div class="skeleton-box">
          <div>更多参数</div>
          <div style="margin-top: 10px"><el-skeleton :rows="5" /></div>
        </div>
        <div class="skeleton-box">
          <div>动画效果</div>
          <div style="margin-top: 10px"><el-skeleton :rows="5" animated /></div>
        </div>
      </div>

    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义"
      :can-expan="true"
      help-message=""
    >
      <el-skeleton style="width: 240px">
        <template #template>
          <el-skeleton-item
            variant="image"
            style="width: 240px; height: 240px"
          />
          <div style="padding: 14px">
            <el-skeleton-item variant="p" style="width: 50%" />
            <div
              style="
                display: flex;
                align-items: center;
                justify-items: space-between;
              "
            >
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "skeleton",
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

.demo-skeleton-box {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  // border: 1px solid #000;
  // margin: 0px;
  .skeleton-box {
    width: 300px;
    margin: 0px 5px 0px 0px;
  }
  .skeleton-box-bottom {
    width: 300px;
    margin: 0px 5px 0px 0px;
  }
}
</style>
