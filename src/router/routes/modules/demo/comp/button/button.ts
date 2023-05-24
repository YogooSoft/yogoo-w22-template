import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_button: AppRouteModule = {
  path: '/comp/button',
  name: 'Button',
  component: LAYOUT,
  redirect: '/comp/button/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '按钮',
      component: () => import('@/views/demo/comp/button/index.vue'),
      meta: {
        title: '按钮',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_button;