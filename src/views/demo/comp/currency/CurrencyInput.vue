<template>
  <input
    ref="inputRef"
    type="text"
    placeholder="请输入..."
    :disabled="disabled"
    class="currencyInput"
  />
</template>

<script>
/**
 * @date 2023-06-20
 * @Description: 金额输入框组件
 */
import { useCurrencyInput } from "vue-currency-input";
import { watchDebounced } from "@vueuse/core";

export default {
  name: "CurrencyInput",
  props: {
    modelValue: [Number, String],
    options: Object,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { inputRef, numberValue } = useCurrencyInput(props.options, false);
    watchDebounced(numberValue, (value) => emit("update:modelValue", value), {
      debounce: 1000,
    });
    return { inputRef };
  },
};
</script>

<style lang="less" scoped>
.currencyInput {
  width: 100%;
  line-height: 32px;
  height: 32px;
  box-sizing: border-box;
  padding: 1px 11px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  background-color: #ffffff;
  background-image: none;
  outline: 0;
  &:hover {
    border: 1px solid #c0c4cc;
  }
  &:focus {
    border: 1px solid #409eff;
  }
  &:disabled {
    color: #a8abb2;
    -webkit-text-fill-color: #a8abb2;
    background-color: #f5f7fa;
    cursor: not-allowed;
    border: 1px solid #dcdfe6;
  }
}
</style>
