<template>
  <el-drawer
    :model-value="getBindValues.visible"
    :direction="getBindValues.placement"
    :before-close="onClose"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :size="getBindValues.width"
  >
    <div class="drawer-container">
      <yui-drawer-header
        :title="title"
        :showClose="getBindValues.showClose"
        @close="onClose"
      ></yui-drawer-header>
      <div class="drawer-default" v-loading="getLoading">
        <scroll-container>
          <slot name="default"></slot>
        </scroll-container>
      </div>
      <div v-if="getBindValues.showFooter" class="drawer-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-drawer>
</template>
<script lang="ts">
import type { DrawerInstance, DrawerProps } from "./typing";
import type { CSSProperties } from "vue";
import {
  defineComponent,
  ref,
  computed,
  watch,
  unref,
  nextTick,
  toRaw,
  getCurrentInstance,
} from "vue";
import yuiDrawerHeader from "./DrawerHeader.vue";
import { ScrollContainer } from "@/components/Container";
import { isFunction, isNumber } from "@/utils/is";
import { deepMerge } from "@/utils";
import { basicProps } from "./props";
import { useDesign } from "@/hooks/web/useDesign";
import { useAttrs } from "@/hooks/core/useAttrs";

export default defineComponent({
  name: "yuiDrawer",
  components: { yuiDrawerHeader, ScrollContainer },
  inheritAttrs: false,
  props: basicProps,
  emits: ["visible-change", "ok", "close", "register"],
  setup(props, { emit }) {
    const visibleRef = ref(false);
    const attrs = useAttrs();
    const propsRef = ref<Partial<Nullable<DrawerProps>>>(null);

    const { prefixVar, prefixCls } = useDesign("basic-drawer");

    const drawerInstance: DrawerInstance = {
      setDrawerProps: setDrawerProps,
      emitVisible: undefined,
    };

    const instance = getCurrentInstance();

    instance && emit("register", drawerInstance, instance.uid);

    const getMergeProps = computed((): DrawerProps => {
      return deepMerge(toRaw(props), unref(propsRef));
    });

    const getProps = computed((): DrawerProps => {
      const opt = {
        placement: "rtl",
        ...unref(attrs),
        ...unref(getMergeProps),
        visible: unref(visibleRef),
      };
      opt.title = undefined;
      const { isDetail, width, wrapClassName, getContainer } = opt;
      if (isDetail) {
        if (!width) {
          opt.width = "100%";
        }
        const detailCls = `${prefixCls}__detail`;
        opt.wrapClassName = wrapClassName
          ? `${wrapClassName} ${detailCls}`
          : detailCls;

        if (!getContainer) {
          // TODO type error?
          opt.getContainer = `.${prefixVar}-layout-content` as any;
        }
      }
      return opt as DrawerProps;
    });

    const getBindValues = computed((): DrawerProps => {
      return {
        ...attrs,
        ...unref(getProps),
      };
    });

    const getFooterHeight = computed(() => {
      const { footerHeight, showFooter } = unref(getProps);
      if (showFooter && footerHeight) {
        return isNumber(footerHeight)
          ? `${footerHeight}px`
          : `${footerHeight.replace("px", "")}px`;
      }
      return `0px`;
    });

    const getScrollContentStyle = computed((): CSSProperties => {
      const footerHeight = unref(getFooterHeight);
      return {
        position: "relative",
        height: `calc(100% - ${footerHeight})`,
      };
    });

    const getLoading = computed(() => {
      return !!unref(getProps)?.loading;
    });

    watch(
      () => props.visible,
      (newVal, oldVal) => {
        if (newVal !== oldVal) visibleRef.value = newVal;
      },
      { deep: true }
    );

    watch(
      () => visibleRef.value,
      (visible) => {
        nextTick(() => {
          emit("visible-change", visible);
          instance && drawerInstance.emitVisible?.(visible, instance.uid);
        });
      }
    );

    // Cancel event
    async function onClose(e: Recordable) {
      const { closeFunc } = unref(getProps);
      emit("close", e);
      if (closeFunc && isFunction(closeFunc)) {
        const res = await closeFunc();
        visibleRef.value = !res;
        return;
      }
      visibleRef.value = false;
    }

    function setDrawerProps(props: Partial<DrawerProps>): void {
      // Keep the last setDrawerProps
      propsRef.value = deepMerge(unref(propsRef) || ({} as any), props);

      if (Reflect.has(props, "visible")) {
        visibleRef.value = !!props.visible;
      }
    }

    return {
      onClose,
      prefixCls,
      getMergeProps: getMergeProps as any,
      getScrollContentStyle,
      getProps: getProps as any,
      getLoading,
      getBindValues,
      getFooterHeight,
    };
  },
});
</script>

<style lang="less" scoped>
.drawer-container {
  flex-direction: column;
  justify-content: flex-end;
  display: flex;
  height: 100%;
  width: 100%;
  .drawer-default {
    overflow: scroll;
    height: 100%;
    width: 100%;
  }
  .drawer-footer {
    height: 35px;
    width: 100%;
  }
}
</style>
