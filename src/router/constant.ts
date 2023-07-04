export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const EXCEPTION_COMPONENT = () => import('@/views/sys/exception/Exception.vue');

/**
 * @description: default layout
 */
// 一级菜单 组件
export const LAYOUT = () => import('@/layouts/layout.vue');
// 二级及以下菜单 
export const LAYOUTEMPTY = () => import('@/layouts/layoutEmpty.vue');
// 动态生成组件对象 
export const APIVIEWS = (component) => import(`@/views${component}`);


/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      });
    });
};
