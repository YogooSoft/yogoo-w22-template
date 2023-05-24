import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_input: AppRouteModule = {
  path: '/comp/input',
  name: 'Input',
  component: LAYOUT,
  redirect: '/comp/input/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '输入框',
      component: () => import('@/views/demo/comp/input/index.vue'),
      meta: {
        title: '输入框组件',
        icon: '输入框组件',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_input;