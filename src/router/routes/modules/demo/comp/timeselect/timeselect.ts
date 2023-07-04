import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_timeselect: AppRouteModule = {
  path: '/comp/timeselect',
  name: 'TimeSelect',
  component: LAYOUT,
  redirect: '/comp/timeselect/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '时间选择',
      component: () => import('@/views/demo/comp/timeselect/index.vue'),
      meta: {
        title: '时间选择',
        icon: '',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_timeselect;