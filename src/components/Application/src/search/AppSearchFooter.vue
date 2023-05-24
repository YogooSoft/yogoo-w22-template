<template>
  <div :class="`${prefixCls}`">
    <AppSearchKeyItem
      :class="`${prefixCls}-item`"
      icon="ant-design:enter-outlined"
    />
    <span>确认</span>
    <AppSearchKeyItem
      :class="`${prefixCls}-item`"
      icon="ion:arrow-up-outline"
    />
    <AppSearchKeyItem
      :class="`${prefixCls}-item`"
      icon="ion:arrow-down-outline"
    />
    <span>切换</span>
    <AppSearchKeyItem :class="`${prefixCls}-item`" icon="mdi:keyboard-esc" />
    <span>关闭</span>
  </div>
</template>

<script lang="ts" setup>
import AppSearchKeyItem from "./AppSearchKeyItem.vue";
import { useDesign } from "@/hooks/web/useDesign";

const { prefixCls } = useDesign("app-search-footer");
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-app-search-footer";

.@{prefix-cls} {
  position: relative;
  display: flex;
  height: 44px;
  padding: 0 16px;
  font-size: 12px;
  color: #666;
  background-color: #fff;
  border-top: 1px solid #d9d9d9;
  border-radius: 0 0 16px 16px;
  align-items: center;
  flex-shrink: 0;

  &-item {
    display: flex;
    width: 20px;
    height: 18px;
    padding-bottom: 2px;
    margin-right: 0.4em;
    background-color: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
    border-radius: 2px;
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
      0 1px 2px 1px rgba(30, 35, 90, 0.4);
    align-items: center;
    justify-content: center;

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(6) {
      margin-left: 14px;
    }
  }
}
</style>
