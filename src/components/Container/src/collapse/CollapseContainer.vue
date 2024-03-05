<template>
  <div :class="prefixCls">
    <collapse-header
      v-if="showTitle"
      v-bind="props"
      :prefixCls="prefixCls"
      :show="show"
      @expand="handleExpand"
    >
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #action>
        <slot name="action"></slot>
      </template>
    </collapse-header>

    <div class="p-2">
      <collapse-transition :enable="canExpan">
        <el-skeleton v-if="loading" :active="loading" />
        <div :class="`${prefixCls}__body`" v-else v-show="show">
          <slot></slot>
        </div>
      </collapse-transition>
    </div>
    <div :class="`${prefixCls}__footer`" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import { ref } from "vue";
// component
import { CollapseTransition } from "@/components/Transition";
import CollapseHeader from "./CollapseHeader.vue";
import { triggerWindowResize } from "@/utils/event";
// hook
import { useTimeoutFn } from "@/hooks/core/useTimeout";
import { useDesign } from "@/hooks/web/useDesign";

const props = defineProps({
  showTitle: { type: Boolean, default: true },
  title: { type: String, default: "" },
  loading: { type: Boolean },
  /**
   *  可以伸缩展开
   *  Can it be expanded
   */
  canExpan: { type: Boolean, default: true },
  /**
   * 标题右侧的提醒
   * Warm reminder on the right side of the title
   */
  helpMessage: {
    type: [Array, String] as PropType<string[] | string>,
    default: "",
  },
  /**
   * 扩展和收缩时是否触发 window.resize 事件，
   * 可以适应表格和表单，当表单缩小时，表单触发调整大小以适应高度
   * Whether to trigger window.resize when expanding and contracting,
   * Can adapt to tables and forms, when the form shrinks, the form triggers resize to adapt to the height
   */

  triggerWindowResize: { type: Boolean },
  /**
   * Delayed loading time
   */
  lazyTime: { type: Number, default: 0 },
});

const show = ref(true);
const { prefixCls } = useDesign("collapse-container");

/**
 * @description: Handling development events
 */
function handleExpand() {
  show.value = !show.value;
  if (props.triggerWindowResize) {
    // 200 milliseconds here is because the expansion has animation,
    useTimeoutFn(triggerWindowResize, 200);
  }
}
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-collapse-container";

.@{prefix-cls} {
  background-color: @component-background;
  border-radius: 2px;
  transition: all 0.3s ease-in-out;

  &__header {
    display: flex;
    height: 32px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid @border-color-light;
  }

  &__footer {
    border-top: 1px solid @border-color-light;
  }

  &__action {
    display: flex;
    text-align: right;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }

  &__body {
    padding: 10px;
  }
}
</style>
