import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_dynamicRouting: AppRouteModule = {
  path: '/func/dynamic-routing',
  name: 'DynamicRouting',
  component: LAYOUT,
  redirect: '/func/dynamic-routing/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '功能',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '动态路由',
      component: () => import('@/views/demo/function/dynamic-routing/index.vue'),
      meta: {
        title: '动态路由',
        icon: '',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_dynamicRouting;