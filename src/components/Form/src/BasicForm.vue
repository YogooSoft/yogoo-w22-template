<template>
  <div class="form">
    <el-form
      :label-position="labelPosition"
      :inline="inline"
      :rules="rules"
      ref="formRef"
      :label-width="labelWidth"
      :model="fieldForm"
      :class="customClass"
    >
      <el-form-item
        v-for="(item, index) in props.fieldList"
        :key="index"
        :prop="item.field"
        :validate-on-rule-change="false"
        :style="{
          flexBasis: item.percent
            ? item.percent
            : item.percent
            ? `${item.percent}%!important`
            : '',
          width:
            item.width && isNaN(Number(item.width))
              ? item.width + '!important' || ''
              : item.width + 'px!important' || '',
        }"
        :class="[item.className || '', `is-${item.formType}`]"
        :rules="getRules(item)"
      >
        <template #label v-if="item.name">
          <div style="display: inline">
            <a :style="{ color: item.labelColor || '' }">{{
              item.name || ""
            }}</a>
          </div>
        </template>
        <template v-if="item.formType && item.mold && !item.hidden">
          <component
            :is="com['M' + item.mold]"
            v-model="fieldForm[item.field]"
            :item="item"
            :index="index"
            :disabled="disabled"
            :size="size"
            :field-form="fieldForm"
            @change="commonChange(item, index, $event)"
          />
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { toRefs, reactive } from "vue";
//引入组件
import MInput from "./components/MInput.vue";
import MDate from "./components/MDate.vue";
import MSelect from "./components/MSelect.vue";

//这是自定义表单验证规则
import GenerateRules from "./GenerateRules";

//接收父组件传递的参数
const props = defineProps({
  customClass: {
    type: String,
    default: "is-three-columns",
  },
  rules: {
    type: Object,
    default: () => {
      return {};
    },
  },
  fieldForm: {
    type: Object,
    default: () => {
      return {};
    },
  },
  labelWidth: {
    type: Number,
    default: 90,
  },
  fieldList: {
    // type: Array,
    type: Object,
    default: () => [],
  },
  // 行内表单
  inline: {
    type: Boolean,
    default: false,
  },
  // 对齐方式 'right' | 'left' | 'top'
  labelPosition: {
    type: String,
    default: "right",
  },
  size: {
    type: String,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const { customClass, rules, fieldForm, labelWidth, fieldList } = toRefs(props);

// 定义组件
const com: Record<string, any> = {
  MInput: MInput,
  MDate: MDate,
  MSelect: MSelect,
};

//事件传递
const $emit = defineEmits(["change"]);

/**
 * 常规组件change事件
 * @param item 配置数据
 * @param index 下标
 * @param value 选中/输入的值
 * @param data 选中的整条数据
 */
//  const commonChange = (item, index, value, data) => {
//   $emit('change', item, index, value, data);
// };

const commonChange = (item, index, value) => {
  $emit("change", item, index, value);
};

//自定义验证规则
const { getRules } = GenerateRules();
</script>
