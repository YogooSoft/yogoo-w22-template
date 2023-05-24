<template>
  <page-wrapper title="单选框示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="单选框示例"
      :can-expan="false"
      help-message="示例"
    >
      <div class="demo-radio-box">
        <div class="radio-box">
          <div>Large</div>
          <el-radio-group v-model="radio1">
            <el-radio label="1" size="large">Option A</el-radio>
            <el-radio label="2" size="large">Option B</el-radio>
          </el-radio-group>
        </div>
        <div class="radio-box">
          <div>Default</div>
          <el-radio-group v-model="radio2">
            <el-radio label="1">Option A</el-radio>
            <el-radio label="2">Option B</el-radio>
          </el-radio-group>
        </div>
        <div class="radio-box">
          <div>Small</div>
          <el-radio-group v-model="radio3" size="small">
            <el-radio label="1">Option A</el-radio>
            <el-radio label="2" disabled>Option B</el-radio>
          </el-radio-group>
        </div>
        <div class="radio-box">
          <div>Disabled</div>
          <el-radio-group v-model="radio4" size="small" disabled>
            <el-radio label="1">Option A</el-radio>
            <el-radio label="2">Option B</el-radio>
          </el-radio-group>
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="单选框组"
      :can-expan="false"
      help-message=""
    >
      <el-radio-group v-model="radio">
        <el-radio :label="3">Option A</el-radio>
        <el-radio :label="6">Option B</el-radio>
        <el-radio :label="9">Option C</el-radio>
      </el-radio-group>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="按钮样式"
      :can-expan="false"
      help-message=""
    >
      <div>
        <div style="margin: 0 0 10px">Large</div>
        <el-radio-group v-model="radio5" size="large">
          <el-radio-button label="New York" />
          <el-radio-button label="Washington" />
          <el-radio-button label="Los Angeles" />
          <el-radio-button label="Chicago" />
        </el-radio-group>
      </div>
      <div class="demo-button-style">
        <div style="margin: 0 0 10px">Default</div>
        <el-radio-group v-model="radio6">
          <el-radio-button label="New York" />
          <el-radio-button label="Washington" />
          <el-radio-button label="Los Angeles" />
          <el-radio-button label="Chicago" />
        </el-radio-group>
      </div>
      <div class="demo-button-style">
        <div style="margin: 0 0 10px">Small</div>
        <el-radio-group v-model="radio7" size="small">
          <el-radio-button label="New York" />
          <el-radio-button label="Washington" disabled />
          <el-radio-button label="Los Angeles" />
          <el-radio-button label="Chicago" />
        </el-radio-group>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="带有边框"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-radio-box">
        <div class="radio-box">
          <div style="margin: 0 0 10px">Large</div>
          <el-radio-group v-model="radio1">
            <el-radio label="1" size="large" border>Option A</el-radio>
            <el-radio label="2" size="large" border>Option B</el-radio>
          </el-radio-group>
        </div>
        <div class="radio-box">
          <div style="margin: 0 0 10px">Default</div>
          <el-radio-group v-model="radio2">
            <el-radio label="1" border>Option A</el-radio>
            <el-radio label="2" border>Option B</el-radio>
          </el-radio-group>
        </div>
        <div class="radio-box">
          <div style="margin: 0 0 10px">Small</div>
          <el-radio-group v-model="radio3" size="small">
            <el-radio label="1" border>Option A</el-radio>
            <el-radio label="2" border disabled>Option B</el-radio>
          </el-radio-group>
        </div>
        <div class="radio-box">
          <div style="margin: 0 0 10px">Disabled</div>
          <el-radio-group v-model="radio4" size="small" disabled>
            <el-radio label="1" border>Option A</el-radio>
            <el-radio label="2" border>Option B</el-radio>
          </el-radio-group>
        </div>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "demo_Radio",
  components: {
    PageWrapper,
    CollapseContainer,
  },

  setup() {
    const radio = ref("1");
    const radio1 = ref("1");
    const radio2 = ref("1");
    const radio3 = ref("1");
    const radio4 = ref("1");
    const radio5 = ref("New York");
    const radio6 = ref("Washington");
    const radio7 = ref("New York");

    return {
      radio,
      radio1,
      radio2,
      radio3,
      radio4,
      radio5,
      radio6,
      radio7,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.demo-button-style {
  margin-top: 10px;
}

.demo-radio-box {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  // border: 1px solid #000;
  // margin: 0px;
  .radio-box {
    width: 250px;
    margin: 0px 5px 0px 0px;
  }
  .radio-box-bottom {
    width: 250px;
    margin: 0px 5px 0px 0px;
  }
}
</style>
