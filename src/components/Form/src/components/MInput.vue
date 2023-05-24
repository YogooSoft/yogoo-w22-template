<template>
    <el-input
      v-if="item.formType == 'text' && !item.hidden"
      v-model="fieldForm[item.field]"
      :size="size || ''"
      :disabled="item.disabled || disabled"
      :maxlength="item.maxlength"
      :placeholder="item.placeholder"
      :type="item.formType"
      :show-word-limit="item.showLimit"
      :title="fieldForm[item.field]"
      clearable
      :readonly="item.readonly"
      :name="item.field"
      @input="commonChange(item, index, $event)"
    />
    <el-input-number
      v-else-if="['floatnumber', 'number'].includes(item.formType)"
      v-model="fieldForm[item.field]"
      :placeholder="item.placeholder"
      :disabled="item.disabled || disabled"
      :controls="item.controls || false"
      :controls-position="item.position || 'right'"
      clearable
      :size="size"
      @change="commonChange(item, index, $event)"
    />
    <el-input
      v-else-if="item.formType === 'textarea'"
      v-model="fieldForm[item.field]"
      :disabled="item.disabled || disabled"
      :rows="item.rows || 2"
      :autosize="!item.autosize && { minRows: item.rows || 2 }"
      :maxlength="item.maxlength || 800"
      :placeholder="item.placeholder"
      :type="item.formType"
      clearable
      :size="size"
      :resize="item.resize || 'none'"
      @input="commonChange(item, index, $event)"
    />
  </template>
  <script lang="ts" setup>
  import { toRefs} from 'vue';
  import Hooks from '../hooks';
   
  // 定义props 
  const props = defineProps({
    modelValue: {
      default: '',
    },
    item: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'small',
    },
    index: {
      type: Number,
      default: null,
    },
    fieldForm: {
      type: Object,
      default: () => {},
    },
  });
  const { fieldForm } = toRefs(props);
   
  // 定义$emit
  const $emit = defineEmits(['change']);
   
  const { commonChange } = Hooks($emit);
  </script>