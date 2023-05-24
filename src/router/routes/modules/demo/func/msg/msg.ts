import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const msg: AppRouteModule = {
  path: '/func/msg',
  name: 'Msg',
  component: LAYOUT,
  redirect: '/func/msg/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: 'routes.dashboard.about',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '消息提示',
      component: () => import('@/views/demo/function/msg/index.vue'),
      meta: {
        title: 'routes.dashboard.icons',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default msg;