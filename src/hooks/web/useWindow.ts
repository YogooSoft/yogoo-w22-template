import { useWindowStore } from "@/store/modules/window";
const WindowStore = useWindowStore();

export class window {
  static open = () => {
    WindowStore.setModel(true);
  };

  static close = () => {
    WindowStore.setModel(false);
  };

  static setTitle = (title: string) => {
    WindowStore.setTitle(title);
  };

  static setWidth = (width: string) => {
    WindowStore.setWidth(width);
  };

  static setMaximize = (value: boolean) => {
    WindowStore.setMaximize(value);
  };
}
