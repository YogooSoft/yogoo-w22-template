import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_timeline: AppRouteModule = {
  path: '/comp/timeline',
  name: 'Timeline',
  component: LAYOUT,
  redirect: '/comp/timeline/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '时间线',
      component: () => import('@/views/demo/comp/timeline/index.vue'),
      meta: {
        title: '开关',
        icon: '',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_timeline;