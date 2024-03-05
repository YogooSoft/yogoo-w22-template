<template>
  <el-dialog
    :width="getBindValue.width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    title="Tips"
    :model-value="getBindValue.visible"
    :show-close="false"
    :fullscreen="fullscreen"
    :draggable="getBindValue.draggable"
    :destroy-on-close="true"
    @close="handleClose"
  >
    <template #title="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" class="windows-title">
          {{ getMergeProps.title
          }}<span style="font-size: 12px; color: #999999; margin-left: 10px"
            >{{ getMergeProps.subtitle }}
          </span>
        </h4>

        <div class="tools">
          <!-- 控制显示全屏 -->
          <el-button
            :disabled="!getMergeProps.canFullscreen"
            v-if="getMergeProps.showFullscreen"
            plain
            icon="FullScreen"
            size="small"
            class="icon-size-menu"
            @click="fullscreen = !fullscreen"
          ></el-button>
          <el-button
            plain
            icon="Close"
            size="small"
            class="icon-size-menu"
            @click="handleCancel"
          ></el-button>
        </div>
      </div>
    </template>
    <slot></slot>
    <slot name="footer"></slot>
  </el-dialog>
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  reactive,
  watch,
  unref,
  watchEffect,
  toRef,
  getCurrentInstance,
  nextTick,
} from "vue";
import { basicProps } from "./props";
import { isFunction } from "@/utils/is";
import { deepMerge } from "@/utils";
import type { ModalProps, ModalMethods } from "./typing";
import { omit } from "lodash-es";

export default defineComponent({
  name: "yuiWindowWrapper",
  components: {},
  inheritAttrs: false,
  props: basicProps,
  emits: [
    "visible-change",
    "height-change",
    "cancel",
    "ok",
    "register",
    "update:visible",
  ],
  setup(props, { emit, attrs }) {
    const visibleRef = ref(false);
    const propsRef = ref<Partial<ModalProps> | null>(null);
    const modalWrapperRef = ref<any>(null);

    const fullscreen = ref(false);

    const extHeightRef = ref(0);
    const modalMethods: ModalMethods = {
      setModalProps,
      emitVisible: undefined,
      redoModalHeight: () => {
        nextTick(() => {
          if (unref(modalWrapperRef)) {
            (unref(modalWrapperRef) as any).setModalHeight();
          }
        });
      },
    };

    const instance = getCurrentInstance();
    if (instance) {
      emit("register", modalMethods, instance.uid);
    }

    // Custom title component: get title
    const getMergeProps = computed((): Recordable => {
      return {
        ...props,
        ...(unref(propsRef) as any),
      };
    });

    const getProps = computed((): Recordable => {
      const opt = {
        ...unref(getMergeProps),
        visible: unref(visibleRef),
        okButtonProps: undefined,
        cancelButtonProps: undefined,
        title: undefined,
      };
      return {
        ...opt,
        // wrapClassName: unref(getWrapClassName),
      };
    });

    const getBindValue = computed((): Recordable => {
      const attr = {
        ...attrs,
        ...unref(getMergeProps),
        visible: unref(visibleRef),
        // wrapClassName: unref(getWrapClassName),
      };
      // if (unref(fullScreenRef)) {
      //   return omit(attr, ["height", "title"]);
      // }
      return omit(attr, "title");
    });

    /**
     * @description: 设置modal参数
     */
    function setModalProps(props: Partial<ModalProps>): void {
      // Keep the last setModalProps
      propsRef.value = deepMerge(unref(propsRef) || ({} as any), props);
      if (Reflect.has(props, "visible")) {
        visibleRef.value = !!props.visible;
      }
      // if (Reflect.has(props, "defaultFullscreen")) {
      //   fullScreenRef.value = !!props.defaultFullscreen;
      // }
    }

    // 取消事件
    async function handleCancel(e: Event) {
      e?.stopPropagation();

      if (props.closeFunc && isFunction(props.closeFunc)) {
        const isClose: boolean = await props.closeFunc();
        visibleRef.value = !isClose;
        return;
      }

      visibleRef.value = false;
      emit("cancel", e);
    }

    watchEffect(() => {
      visibleRef.value = !!props.visible;
      // fullScreenRef.value = !!props.defaultFullscreen;
    });

    watch(
      () => unref(visibleRef),
      (v) => {
        emit("visible-change", v);
        emit("update:visible", v);
        instance && modalMethods.emitVisible?.(v, instance.uid);
        nextTick(() => {
          if (props.scrollTop && v && unref(modalWrapperRef)) {
            (unref(modalWrapperRef) as any).scrollTop();
          }
        });
      },
      {
        immediate: false,
      }
    );

    const dialogVisible = ref(false);
    const handleClose = (done: () => void) => {
      console.log("--------handleClose--------");
    };

    return {
      fullscreen,
      dialogVisible,
      handleClose,
      getBindValue,
      handleCancel,
      getMergeProps,
    };
  },
});
</script>

<style lang="less" scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .el-button {
    border: none;
    margin-right: -20px;
  }
}
.icon-size-menu {
  font-size: 16px;
  padding: 0px 10px;
}

// :deep(.el-dialog__header) {
//  //padding: 1vh 1vw 0 1vw;
//  padding: 10px 10px 5px 10px;
// }
// :deep(.el-dialog__body) {
//   padding: 5px 10px 10px 10px;
// }
.windows-title {
  font-size: 14px;
  font-weight: 600;
  color: #222222;
  padding: 5px 2px;
  text-align: center;
  text-decoration: none;
}

.tools {
  float: right;
  display: flex;
  border: none;
}
</style>
