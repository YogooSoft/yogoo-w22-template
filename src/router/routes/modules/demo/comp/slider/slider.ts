import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_slider: AppRouteModule = {
  path: '/comp/slider',
  name: 'Slider',
  component: LAYOUT,
  redirect: '/comp/slider/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '滑块',
      component: () => import('@/views/demo/comp/slider/index.vue'),
      meta: {
        title: '滑块',
        icon: '',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_slider;