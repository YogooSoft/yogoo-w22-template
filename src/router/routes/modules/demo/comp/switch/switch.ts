import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_switch: AppRouteModule = {
  path: '/comp/switch',
  name: 'Switch',
  component: LAYOUT,
  redirect: '/comp/switch/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '开关',
      component: () => import('@/views/demo/comp/switch/index.vue'),
      meta: {
        title: '开关',
        icon: '',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_switch;