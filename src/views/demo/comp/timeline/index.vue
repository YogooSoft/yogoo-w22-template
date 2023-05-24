<template>
  <page-wrapper title="时间线示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="时间线示例"
      :can-expan="false"
      help-message="示例"
    >
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自己定义节点样式"
      :can-expan="false"
      help-message=""
    >
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities1"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :hollow="activity.hollow"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义时间戳"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-timeline-box">
        <div class="timeline-box">
          <div style="margin: 0 0 10px 0">时间戳</div>
          <el-timeline>
            <el-timeline-item timestamp="2022/4/12" placement="top">
              <el-card>
                <div>Update Github template</div>
                <div style="margin: 10px 0 0px 0">
                  Tom committed 2022/4/12 20:46
                </div>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/4/3" placement="top">
              <el-card>
                <div>Update Github template</div>
                <div style="margin: 10px 0 0px 0">
                  Tom committed 2022/4/3 20:46
                </div>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/4/2" placement="top">
              <el-card>
                <div>Update Github template</div>
                <div style="margin: 10px 0 0px 0">
                  Tom committed 2022/4/3 20:46
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div style="width: 60px;"/>
        <div class="timeline-box">
          <div style="margin: 0 0 10px 0">垂直居中</div>
          <el-timeline>
            <el-timeline-item center timestamp="2022/4/12" placement="top">
              <el-card>
                <div>Update Github template</div>
                <div style="margin: 10px 0 0px 0">
                  Tom committed 2022/4/12 20:46
                </div>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/4/3" placement="top">
              <el-card>
                <div>Update Github template</div>
                <div style="margin: 10px 0 0px 0">
                  Tom committed 2022/4/3 20:46
                </div>
              </el-card>
            </el-timeline-item>
            <el-timeline-item center timestamp="2022/4/2" placement="top">
              Event start
            </el-timeline-item>
            <el-timeline-item timestamp="2022/4/2" placement="top">
              Event end
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>

     
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { MoreFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "demo_Timeline",
  components: {
    PageWrapper,
    CollapseContainer,
  },

  setup() {
    const activities = [
      {
        content: "Event start",
        timestamp: "2022-11-05",
      },
      {
        content: "Approved",
        timestamp: "2022-11-12",
      },
      {
        content: "Success",
        timestamp: "2022-11-13",
      },
    ];

    const activities1 = [
      {
        content: "Custom icon",
        timestamp: "2022-04-12 20:46",
        size: "large",
        type: "primary",
        icon: MoreFilled,
      },
      {
        content: "Custom color",
        timestamp: "2022-04-03 20:46",
        color: "#0bbd87",
      },
      {
        content: "Custom size",
        timestamp: "2022-04-03 20:46",
        size: "large",
      },
      {
        content: "Custom hollow",
        timestamp: "2022-04-03 20:46",
        type: "primary",
        hollow: true,
      },
      {
        content: "Default node",
        timestamp: "2022-04-03 20:46",
      },
    ];

    return {
      activities,
      activities1,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.demo-timeline-box {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  // border: 1px solid #000;
  // margin: 0px;
  .timeline-box {
    width: 450px;
    margin: 0px 10px 10px 0px;
  }

  .timeline-box-bottom {
    width: 450px;
    margin: 0px 10px 0px 0px;
  }
}
</style>
