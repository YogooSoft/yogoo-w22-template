import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_basic: AppRouteModule = {
  path: '/comp/basic',
  name: 'Basic',
  component: LAYOUT,
  redirect: '/comp/basic/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '基础',
      component: () => import('@/views/demo/comp/basic/index.vue'),
      meta: {
        title: '基础组件',
        icon: '基础组件',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_basic;