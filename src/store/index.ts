import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };

/*
采用Pinia替代Vuex

Pinia 是 Vue.js 的轻量级状态管理库，最近很受欢迎。它使用 Vue 3 中的新反应系统来构建一个直观且完全类型化的状态管理库。
Pinia的成功可以归功于其管理存储数据的独特功能（可扩展性、存储模块组织、状态变化分组、多存储创建等）。
*/
