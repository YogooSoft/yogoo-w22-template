import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_dynamicForm: AppRouteModule = {
  path: '/comp/form/dynamic',
  name: 'dynamicform',
  component: LAYOUT,
  redirect: '/comp/form/dynamic/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '动态表单',
      component: () => import('@/views/demo/comp/form/dynamic/index.vue'),
      meta: {
        title: '动态表单',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_dynamicForm;