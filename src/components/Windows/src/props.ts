import type { PropType, CSSProperties } from 'vue';
import type { ModalWrapperProps } from './typing';

// import type { CSSProperties, VNodeChild, ComputedRef } from 'vue';


// const { t } = useI18n();

export const modalProps = {
  visible: { type: Boolean },
  scrollTop: { type: Boolean, default: true },
  width: { type: String, default: "600px" },
  height: { type: Number },
  minHeight: { type: Number },
  // 启用可拖拽功能
  draggable: { type: Boolean, default: false },
  centered: { type: Boolean },
  cancelText: { type: String, default: 'cancel' },
  okText: { type: String, default: 'ok' },

  closeFunc: Function as PropType<() => Promise<boolean>>,
};

export const basicProps = Object.assign({}, modalProps, {
  defaultFullscreen: { type: Boolean },
  // Can it be full screen 
  // 可以是全屏吗
  canFullscreen: { type: Boolean, default: true },
  // After enabling the wrapper, the bottom can be increased in height
  wrapperFooterOffset: { type: Number, default: 0 },
  // Warm reminder message
  helpMessage: [String, Array] as PropType<string | string[]>,
  // Whether to setting wrapper
  useWrapper: { type: Boolean, default: true },
  loading: { type: Boolean },
  loadingTip: { type: String },
  /**
   * @description: Show close button
   */
  showCancelBtn: { type: Boolean, default: true },
  /**
   * @description: Show confirmation button
   */
  showOkBtn: { type: Boolean, default: true },

  wrapperProps: Object as PropType<Partial<ModalWrapperProps>>,

  afterClose: Function as PropType<() => Promise<VueNode>>,

  bodyStyle: Object as PropType<CSSProperties>,

  closable: { type: Boolean, default: true },

  closeIcon: Object as PropType<VueNode>,

  confirmLoading: { type: Boolean },

  destroyOnClose: { type: Boolean },

  footer: Object as PropType<VueNode>,

  getContainer: Function as PropType<() => any>,

  mask: { type: Boolean, default: true },

  maskClosable: { type: Boolean, default: true },
  keyboard: { type: Boolean, default: true },

  maskStyle: Object as PropType<CSSProperties>,

  okType: { type: String, default: 'primary' },

  okButtonProps: Object as PropType<string>,

  cancelButtonProps: Object as PropType<string>,

  title: { type: String },

  visible: { type: Boolean },

  width: [String, Number] as PropType<string | number>,

  wrapClassName: { type: String },

  zIndex: { type: Number },
});
