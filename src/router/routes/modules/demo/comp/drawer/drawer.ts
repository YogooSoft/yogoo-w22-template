import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_drawer: AppRouteModule = {
  path: '/comp/drawer',
  name: 'drawer',
  component: LAYOUT,
  redirect: '/comp/drawer/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '抽屉扩展',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '抽屉扩展',
      component: () => import('@/views/demo/comp/drawer/index.vue'),
      meta: {
        title: '抽屉扩展',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_drawer;