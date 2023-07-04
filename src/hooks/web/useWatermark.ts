import {
  getCurrentInstance,
  onBeforeUnmount,
  ref,
  Ref,
  shallowRef,
  unref,
} from "vue";
import { useRafThrottle } from "@/utils/domUtils";
import { addResizeListener, removeResizeListener } from "@/utils/event";
import { isDef } from "@/utils/is";

const domSymbol = Symbol("watermark-dom");

export function useWatermark(
  appendEl: Ref<HTMLElement | null> = ref(document.body) as Ref<HTMLElement>
) {
  const func = useRafThrottle(function () {
    const el = unref(appendEl);
    if (!el) return;
    const { clientHeight: height, clientWidth: width } = el;
    updateWatermark({ height, width });
  });
  const id = domSymbol.toString();
  const watermarkEl = shallowRef<HTMLElement>();

  const clear = () => {
    // if (document.getElementById(id) !== null) {
    //     document.body.removeChild(document.getElementById(id));
    //     removeResizeListener(el, func);
    //   }
    const domId = unref(watermarkEl);
    watermarkEl.value = undefined;
    const el = unref(appendEl);
    if (!el) return;
    domId && el.removeChild(domId);
    removeResizeListener(el, func);
  };

  function createBase64(str: string, str1: string = "") {
    const can = document.createElement("canvas");
    const width = 300;
    const height = 240;
    Object.assign(can, { width, height });

    const cans = can.getContext("2d");
    if (cans) {
      cans.rotate((-20 * Math.PI) / 120);
      cans.font = "15px YaHei Pingfang";
      cans.fillStyle = "rgba(0, 0, 0, 0.15)";
      cans.textAlign = "left";
      cans.textBaseline = "middle";
      cans.fillText(str, width / 20, height / 2);
      cans.font = "12px YaHei Pingfang";
      cans.fillText(str1, width / 20, height / 2.3);
    }
    return can.toDataURL("image/png");
  }

  function updateWatermark(
    options: {
      width?: number;
      height?: number;
      str?: string;
      str1?: string;
    } = {}
  ) {
    const el = unref(watermarkEl);
    if (!el) return;
    if (isDef(options.width)) {
      el.style.width = `${options.width}px`;
    }
    if (isDef(options.height)) {
      el.style.height = `${options.height}px`;
    }
    if (isDef(options.str)) {
      el.style.background = `url(${createBase64(
        options.str,
        options.str1
      )}) left top repeat`;
    }
  }

  const createWatermark = (str: string, str1: string) => {
    // if (document.getElementById(id) !== null) {
    //   document.body.removeChild(document.getElementById(id));
    // }

    // if (unref(watermarkEl)) {
    //   updateWatermark({ str,str1 });
    //   return id;
    // }
    const div = document.createElement("div");
    watermarkEl.value = div;
    div.id = id;
    div.style.pointerEvents = "none";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.position = "absolute";
    div.style.zIndex = "100000";
    const el = unref(appendEl);
    if (!el) return id;
    const { clientHeight: height, clientWidth: width } = el;
    updateWatermark({ str, str1, width, height });
    el.appendChild(div);
    return id;
  };

  function setWatermark(str: string, str1: string = "") {
    createWatermark(str, str1);
    addResizeListener(document.documentElement, func);
    const instance = getCurrentInstance();
    if (instance) {
      onBeforeUnmount(() => {
        clear();
      });
    }
  }

  return { setWatermark, clear };
}
