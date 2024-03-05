<template>
  <page-wrapper title="链接示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="数字输入框示例"
      :can-expan="false"
      help-message="仅允许输入标准的数字值，可定义范围"
    >
      <div class="demo-input-size">
        <div class="input-box">基础用法</div>
        <div class="input-box">仅显示输入框</div>
        <div class="input-box">禁用状态</div>
      </div>
      <div class="demo-input-size">
        <div class="input-box-bottom">
          <el-input-number
            v-model="num"
            :min="1"
            :max="10"
            @change="handleChange"
          />
        </div>
        <div class="input-box-bottom">
          <el-input-number
            v-model="num"
            :min="1"
            :max="10"
            :controls="false"
            @change="handleChange"
          />
        </div>
        <div class="input-box-bottom">
          <el-input-number v-model="num" :disabled="true" />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="步进"
      :can-expan="false"
      help-message="允许定义递增递减的步进控制"
    >
      <el-input-number v-model="num5" :step="2" />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="严格步进"
      :can-expan="false"
      help-message=""
    >
      <el-input-number v-model="num2" :step="2" step-strictly />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="精度"
      :can-expan="false"
      help-message=""
    >
      <el-input-number v-model="num1" :precision="2" :step="0.1" :max="10" />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="不同的输入框尺寸"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-input-size">
        <div class="input-box">Large</div>
        <div class="input-box">Default</div>
        <div class="input-box">Small</div>
      </div>
      <div class="demo-input-size">
        <div class="input-box-bottom">
          <el-input-number v-model="num6" class="mx-4" size="large" />
        </div>
        <div class="input-box-bottom">
          <el-input-number v-model="num7" class="mx-4" />
        </div>
        <div class="input-box-bottom">
          <el-input-number v-model="num8" size="small" />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="按钮位置"
      :can-expan="false"
      help-message="设置 controls-position 属性可以控制按钮位置。"
    >
      <div class="demo-input-size">
        <div class="input-box">Large</div>
        <div class="input-box">Default</div>
        <div class="input-box">Small</div>
      </div>
      <div class="demo-input-size">
        <div class="input-box-bottom">
          <el-input-number
            v-model="num"
            :min="1"
            :max="10"
            controls-position="right"
            size="large"
            @change="handleChange"
          />
        </div>
        <div class="input-box-bottom">
          <el-input-number
            v-model="num"
            :min="1"
            :max="10"
            controls-position="right"
            @change="handleChange"
          />
        </div>
        <div class="input-box-bottom">
          <el-input-number
            v-model="num"
            :min="1"
            :max="10"
            size="small"
            controls-position="right"
            @change="handleChange"
          />
        </div>
      </div>
    </collapse-container>
  </page-wrapper>
</template>
<script lang="ts" setup>
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

const num = ref(1);
const num2 = ref(2);
const num5 = ref(5);
const num1 = ref(1);
const num6 = ref(1);
const num7 = ref(1);
const num8 = ref(1);

const handleChange = (value: number) => {
  console.log(value);
};
</script>
<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.mx-4 {
  margin-right: 10px;
}

.demo-input-size {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;

  // border: 1px solid #000;
  // margin: 0px;
  .input-box {
    width: 240px;
    margin: 0px 10px 10px 0px;
  }

  .input-box-bottom {
    width: 240px;
    margin: 0px 10px 0px 0px;
  }
}
</style>
