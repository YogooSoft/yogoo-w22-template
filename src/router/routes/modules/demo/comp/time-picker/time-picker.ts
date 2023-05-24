import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_timePicker: AppRouteModule = {
  path: '/comp/time-picker',
  name: 'Time-picker',
  component: LAYOUT,
  redirect: '/comp/time-picker/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '时间选择器',
      component: () => import('@/views/demo/comp/time-picker/index.vue'),
      meta: {
        title: '时间选择器',
        icon: '',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_timePicker;