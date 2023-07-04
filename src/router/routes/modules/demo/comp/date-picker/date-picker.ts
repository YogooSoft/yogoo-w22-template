import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_datePicker: AppRouteModule = {
  path: '/comp/date-picker',
  name: 'Date-picker',
  component: LAYOUT,
  redirect: '/comp/date-picker/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '日期选择器',
      component: () => import('@/views/demo/comp/date-picker/index.vue'),
      meta: {
        title: '日期选择器',
        icon: '',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_datePicker;