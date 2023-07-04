import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_dialog: AppRouteModule = {
  path: '/comp/dialog',
  name: 'dialog',
  component: LAYOUT,
  redirect: '/comp/dialog/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '弹窗扩展',
      component: () => import('@/views/demo/comp/dialog/index.vue'),
      meta: {
        title: '弹窗扩展',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_dialog;