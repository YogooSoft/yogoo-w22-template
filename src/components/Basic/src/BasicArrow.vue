<!--
 * 带动画的箭头组件
-->
<template>
  <span :class="getClass" >
  <el-icon ><ArrowRight/></el-icon >
  </span>
</template>
<script lang="ts" setup>
  import { defineComponent, computed, ref } from 'vue';
  import { useDesign } from '@/hooks/web/useDesign';
  const props = defineProps({
    /**
     * 箭头展开状态 
     * Arrow expand state
     */
    expand: { type: Boolean },
    /**
     * 默认情况下向上箭头
     * Arrow up by default
     */
    up: { type: Boolean },
    /**
     * 默认情况下向下箭头
     * Arrow down by default
     */
    down: { type: Boolean },
    /**
     * 取消内联的填充/边距
     * Cancel padding/margin for inline
     */
    inset: { type: Boolean },
  });

  const { prefixCls } = useDesign('basic-arrow');

  /**
   * 获取组件类
   * get component class
   */
  const getClass = computed(() => {
    const { expand, up, down, inset } = props;
    return [
      prefixCls,
      {
        [`${prefixCls}--active`]: expand,
        up,
        inset,
        down,
      },
    ];
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-basic-arrow';

  .@{prefix-cls} {
    color: @text-color;
    display: inline-block;
    cursor: pointer;
    transform: rotate(0deg);
    transition: all 0.3s ease 0.1s;
    transform-origin: center center;
    margin: 0px 7px;

    &--active {
      transform: rotate(90deg);
    }

    &.inset {
      line-height: 0px;
    }

    &.up {
      transform: rotate(-90deg);
    }

    &.down {
      transform: rotate(90deg);
    }

    &.up.@{prefix-cls}--active {
      transform: rotate(90deg);
    }

    &.down.@{prefix-cls}--active {
      transform: rotate(-90deg);
    }
  }
</style>
