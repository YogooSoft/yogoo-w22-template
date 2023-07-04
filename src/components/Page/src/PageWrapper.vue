<template>
  <div :class="getClass" ref="wrapperRef">
    <!-- <div class="page-wrapper" > -->
      <div v-if="dense"  style="margin-bottom: 10px;">
      <div style="font-size:medium;">{{ title }}</div>
      <div style="margin-top: 3px;">
        {{ content }}
      </div>
    </div>
    <!-- <el-alert type="info"  :closable="false">

  </el-alert> -->
    <div
      class="overflow-hidden"
      :class="getContentClass"
      :style="getContentStyle"
      ref="contentRef"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  ref,
  unref,
  CSSProperties,
  PropType,
  provide,
} from "vue";
import { propTypes } from "@/utils/propTypes";
import { useDesign } from "@/hooks/web/useDesign";
import { useContentHeight } from "@/hooks/web/useContentHeight";
import { PageWrapperFixedHeightKey } from "..";

export default defineComponent({
  name: "PageWrapper",
  components: {},
  inheritAttrs: false,
  props: {
    title: { type: String },
    content: { type: String },
    contentStyle: {
      type: Object as PropType<CSSProperties>,
    },
    contentFullHeight: propTypes.bool,
    contentBackground: propTypes.bool,
    contentClass: propTypes.string,
    fixedHeight: propTypes.bool,
    /**
     * 紧凑模式，默认 false
     */
    dense: propTypes.bool,
  },
  setup(props, { slots, attrs }) {
    const wrapperRef = ref(null);
    const headerRef = ref(null);
    const contentRef = ref(null);
    const footerRef = ref(null);
    const { prefixCls } = useDesign("page-wrapper");

    provide(
      PageWrapperFixedHeightKey,
      computed(() => props.fixedHeight)
    );

    const getIsContentFullHeight = computed(() => {
      return props.contentFullHeight;
    });

    const { redoHeight, setCompensation, contentHeight } = useContentHeight(
      getIsContentFullHeight,
      wrapperRef,
      [headerRef, footerRef],
      [contentRef]
    );
    setCompensation({ useLayoutFooter: true, elements: [footerRef] });

    const getClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--dense`]: props.dense,
        },
        attrs.class ?? {},
      ];
    });

    const getContentStyle = computed((): CSSProperties => {
      const { contentFullHeight, contentStyle, fixedHeight } = props;
      if (!contentFullHeight) {
        return { ...contentStyle };
      }

      const height = `${unref(contentHeight)}px`;
      return {
        ...contentStyle,
        minHeight: height,
        ...(fixedHeight ? { height } : {}),
      };
    });

    const getContentClass = computed(() => {
      const { contentBackground, contentClass } = props;
      return [
        `${prefixCls}-content`,
        contentClass,
        {
          [`${prefixCls}-content-bg`]: contentBackground,
        },
      ];
    });

    return {
      getContentStyle,
      wrapperRef,
      headerRef,
      contentRef,
      footerRef,
      getClass,
      getContentClass,
    };
  },
});
</script>

<style lang="less" scoped>
// .page-wrapper {
//   display: inline-block;
//   cursor: pointer;
//   fill: #5a5e66;
//   // vertical-align: 10px;
//   //margin-top: 15px;
//   width: 100%;
//   // height: 100%;
// }

@prefix-cls: ~"@{namespace}-page-wrapper";

.@{prefix-cls} {
  // position: relative;
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;

  width: 100%;
  height: 100%;

  .@{prefix-cls}-content {
    margin: 0;
    height: 100%;
  }

  &--dense {
    .@{prefix-cls}-content {
      margin: 0;
    }
  }
}

.pageHeader-box {
  width: 100%;
  height: 60px;
  // margin: 0px 10px 0px 0px;
  background-color: white;
}
</style>
