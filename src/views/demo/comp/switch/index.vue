<template>
  <page-wrapper title="开关示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="开关示例"
      :can-expan="false"
      help-message="输入框示例"
    >
      <div class="demo-swicth-size">
        <div class="swicth-box">打开</div>
        <div class="swicth-box">关闭</div>
        <div class="swicth-box">禁用</div>
        <div class="swicth-box">加载中</div>
      </div>
      <div class="demo-swicth-size">
        <div class="swicth-box-bottom">
          <el-switch v-model="value1" />
        </div>
        <div class="swicth-box-bottom">
          <el-switch
            v-model="value2"
            class="ml-2"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          />
        </div>
        <div class="swicth-box-bottom">
          <el-switch v-model="value1" disabled class="swicth-box-bottom" />
        </div>
        <div class="swicth-box-bottom">
          <el-switch v-model="value1" loading />
          <el-switch v-model="value2" loading style="margin: 0 0 0 10px" />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="尺寸"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-swicth-size">
        <div class="swicth-box">Large</div>
        <div class="swicth-box">Default</div>
        <div class="swicth-box">Small</div>
      </div>
      <div class="demo-swicth-size">
        <el-switch
          v-model="value"
          size="large"
          active-text="Open"
          inactive-text="Close"
          class="swicth-box-bottom"
        />
        <el-switch
          v-model="value"
          active-text="Open"
          inactive-text="Close"
          class="swicth-box-bottom"
        />
        <el-switch
          v-model="value"
          size="small"
          active-text="Open"
          inactive-text="Close"
          class="swicth-box-bottom"
        />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="文字描述"
      :can-expan="false"
      help-message=""
    >
      <el-switch
        v-model="value1"
        class="mb-2"
        active-text="Pay by month"
        inactive-text="Pay by year"
      />
      <br />
      <el-switch
        v-model="value2"
        class="mb-2"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        active-text="Pay by month"
        inactive-text="Pay by year"
      />
      <br />
      <el-switch
        v-model="value3"
        inline-prompt
        active-text="是"
        inactive-text="否"
      />
      <el-switch
        v-model="value4"
        class="ml-2"
        inline-prompt
        style="
          --el-switch-on-color: #13ce66;
          --el-switch-off-color: #ff4949;
          margin: 0 0 0 10px;
        "
        active-text="Y"
        inactive-text="N"
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义图标"
      :can-expan="false"
      help-message=""
    >
      <el-switch v-model="value1" :active-icon="Check" :inactive-icon="Close" />
      <br />
      <el-switch
        v-model="value2"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :active-icon="Check"
        :inactive-icon="Close"
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="阻止切换"
      :can-expan="false"
      help-message=""
    >
      <el-switch
        v-model="value5"
        :loading="loading1"
        :before-change="beforeChange1"
      />
      <el-switch
        v-model="value6"
        class="ml-2"
        :loading="loading2"
        :before-change="beforeChange2"
        style="margin: 0 0 0 10px"
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="扩展value类型"
      :can-expan="false"
      help-message=""
    >
      <el-tooltip :content="'Switch value: ' + value8" placement="top">
        <el-switch
          v-model="value8"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-value="100"
          inactive-value="0"
        />
      </el-tooltip>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { Search } from "@element-plus/icons-vue";
import { Check, Close } from "@element-plus/icons-vue";
import { ElMessage, ElTooltip } from "element-plus";

export default defineComponent({
  name: "demo_Input",
  components: {
    PageWrapper,
    CollapseContainer,
    Search,
    Check,
    Close,
  },

  setup() {
    const value = ref(true);
    const value1 = ref(true);
    const value2 = ref(false);
    const value3 = ref(true);
    const value4 = ref(true);
    const value5 = ref(false);
    const value6 = ref(false);
    const value8 = ref("100");

    const loading1 = ref(false);
    const loading2 = ref(false);

    const beforeChange1 = () => {
      loading1.value = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          loading1.value = false;
          ElMessage.success("Switch success");
          return resolve(true);
        }, 1000);
      });
    };

    const beforeChange2 = () => {
      loading2.value = true;
      return new Promise((_, reject) => {
        setTimeout(() => {
          loading2.value = false;
          ElMessage.error("Switch failed");
          return reject(new Error("Error"));
        }, 1000);
      });
    };

    return {
      value,
      value1,
      value2,
      value3,
      value4,
      value5,
      value6,
      value8,
      Check,
      Close,
      loading1,
      loading2,
      beforeChange1,
      beforeChange2,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.demo-swicth-size {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  // border: 1px solid #000;
  // margin: 0px;
  .swicth-box {
    width: 240px;
    margin: 0px 10px 10px 0px;
  }

  .swicth-box-bottom {
    width: 240px;
    margin: 0px 10px 0px 0px;
  }
}
</style>
