import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_radio: AppRouteModule = {
  path: '/comp/radio',
  name: 'Radio',
  component: LAYOUT,
  redirect: '/comp/radio/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '单选框',
      component: () => import('@/views/demo/comp/radio/index.vue'),
      meta: {
        title: '单选框',
        icon: '',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_radio;