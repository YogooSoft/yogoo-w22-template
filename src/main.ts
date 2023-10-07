import { createApp } from "vue";
import App from "./App.vue";
import { router, setupRouter } from "@/router";
import { setupRouterGuard } from "@/router/guard";
import { setupStore } from "@/store";
// CSS重置的现代化替代方案
import "normalize.css/normalize.css";
import ElementPlus from "element-plus";
import zhcn from "element-plus/lib/locale/lang/zh-cn";
import "element-plus/theme-chalk/index.css";
import "element-plus/dist/index.css";

// 全局样式
import "@/styles/index.less";

// 数字专用字体，付费字库
import "@/assets/font/font.css";

//import NProgress from "nprogress";
import "nprogress/nprogress.css";

import * as ElIcons from "@element-plus/icons-vue";
// 注册 icon
import { YGIcons as icon } from "@/icons";
// svg component
import SvgIcon from "@/components/SvgIcon/index.vue";
// mock 数据
import { mockXHR } from "./../mock/index";
// import { zhCn } from "element-plus/es/locale";

import { updateGrayMode } from "@/utils/theme/updateGrayMode";
import { updateColorWeak } from "@/utils/theme/updateColorWeak";

// import * as echarts from "echarts";
import VChart from "vue-echarts";

// 引入瀑布流
import { VueMasonryPlugin } from "vue-masonry";
// 引入控制台模拟插件
import Terminal from "vue-web-terminal";

// 引入MITT
import mitt from "mitt";

// 灰色模式
updateGrayMode(false);
// 色弱模式
updateColorWeak(false);

// 判断是否为mock模式
// if (process.env.NODE_ENV === "development") {
if (process.env.VUE_APP_MOCK === "true") {
  console.info("-------启动mock服务--------");
  mockXHR();
}
// }

// 配置全局的NProgress
// NProgress.configure({
//   easing: "ease",
//   speed: 500,
//   showSpinner: false,
//   trickleSpeed: 200,
//   minimum: 0.3,
// });

const app = createApp(App);
// 配置存储
setupStore(app);

// 配置路由
setupRouter(app);
// 路由保护
setupRouterGuard(router);

// 遍历 注册 @element-plus/icons-vue 全局图标
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name]);
}
// 遍历 注册 @/icons 全局图标
Object.keys(icon).forEach((key) => {
  app.component(key, icon[key as keyof typeof icon]);
});

// 设置默认
// app.use(ElementPlus, {
//   size:  'medium', // set element-ui default size
// });

//注册全局组件
app.component("svg-icon", SvgIcon);

// app.component("echarts",echarts);
app.component("VChart", VChart);
// app.component("vMasonry", VueMasonryPlugin);

// setupRouter(app);
// app.use(setupStore);
// app.use(router);

// vue3挂载到全局
app.config.globalProperties.Bus = mitt();

app.use(ElementPlus, { locale: zhcn });

app.use(VueMasonryPlugin);
app.use(Terminal);
app.mount("#app", true);
