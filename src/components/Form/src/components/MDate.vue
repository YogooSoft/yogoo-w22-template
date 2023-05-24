<template>
    <el-date-picker
      v-if="item.formType == 'date'"
      v-model="fieldForm[item.field]"
      :disabled="item.disabled || disabled"
      clearable
      style="width: 100%"
      type="date"
      :size="size"
      :editable="true"
      value-format="YYYY-MM-DD"
      :placeholder="item.placeholder || '选择日期'"
      @click.stop
      @change="commonChange(item, index, $event)"
    />
    <el-date-picker
      v-else-if="item.formType == 'month'"
      v-model="fieldForm[item.field]"
      :disabled="item.disabled || disabled"
      clearable
      style="width: 100%"
      type="month"
      :size="size"
      value-format="YYYY-MM"
      :placeholder="item.placeholder || '选择月份'"
      @change="commonChange(item, index, $event)"
    />
    <el-date-picker
      v-else-if="item.formType == 'year'"
      v-model="fieldForm[item.field]"
      :disabled="item.disabled || disabled"
      clearable
      style="width: 100%"
      type="year"
      :size="size"
      value-format="YYYY"
      :placeholder="item.placeholder || '选择年份'"
      @change="commonChange(item, index, $event)"
    />
    <el-date-picker
      v-else-if="item.formType == 'dateRange'"
      v-model="fieldForm[item.field]"
      :disabled="item.disabled || disabled"
      :type="item.dateType || 'daterange'"
      :value-format="item.dateValueFormat || 'YYYY-MM-DD'"
      :picker-options="item.pickerOptions || ''"
      clearable
      :size="size"
      style="width: 100%"
      :start-placeholder="item.startPlaceholder || '开始日期'"
      :end-placeholder="item.endPlaceholder || '结束日期'"
      @change="commonChange(item, index, $event)"
    />
    <el-date-picker
      v-else-if="item.formType == 'datetime'"
      v-model="fieldForm[item.field]"
      :disabled="item.disabled || disabled"
      clearable
      style="width: 100%"
      :size="size"
      type="datetime"
      value-format="YYYY-MM-DD HH:mm:ss"
      :placeholder="item.placeholder || '选择日期'"
      @change="commonChange(item, index, $event)"
    />
  </template>
  <script lang="ts" setup>
  import { toRefs, PropType } from 'vue';
  import Hooks from '../hooks';
  // 定义defineProps
  const props = defineProps({
    modelValue: {
      type: [Number, String],
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
      type: String as PropType <''| 'large' | 'small'>,
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