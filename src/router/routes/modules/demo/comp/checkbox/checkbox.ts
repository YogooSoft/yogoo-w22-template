import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_checkbox: AppRouteModule = {
  path: '/comp/checkbox',
  name: 'Checkbox',
  component: LAYOUT,
  redirect: '/comp/checkbox/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '多选框',
      component: () => import('@/views/demo/comp/checkbox/index.vue'),
      meta: {
        title: '多选框',
        icon: '',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_checkbox;