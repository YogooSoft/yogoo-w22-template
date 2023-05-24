import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_sessionTimeout: AppRouteModule = {
  path: '/func/session-timeout',
  name: 'SessionTimeout',
  component: LAYOUT,
  redirect: '/func/session-timeout/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: 'routes.dashboard.about',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '登陆过期',
      component: () => import('@/views/demo/function/session-timeout/index.vue'),
      meta: {
        title: 'routes.dashboard.icons',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_sessionTimeout;