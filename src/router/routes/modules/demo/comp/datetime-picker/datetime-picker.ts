import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_datetimePicker: AppRouteModule = {
  path: '/comp/datetime-picker',
  name: 'Datetime-picker',
  component: LAYOUT,
  redirect: '/comp/datetime-picker/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '日期时间选择器',
      component: () => import('@/views/demo/comp/datetime-picker/index.vue'),
      meta: {
        title: '日期时间选择器',
        icon: '',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_datetimePicker;