import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const icons: AppRouteModule = {
  path: '/func/icons',
  name: 'Icons',
  component: LAYOUT,
  redirect: '/func/icons/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: 'routes.dashboard.about',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '图标',
      component: () => import('@/views/demo/function/icons/index.vue'),
      meta: {
        title: 'routes.dashboard.icons',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default icons;