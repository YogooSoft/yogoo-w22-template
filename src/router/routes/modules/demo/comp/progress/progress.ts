import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_progress: AppRouteModule = {
  path: '/comp/progress',
  name: 'Progress',
  component: LAYOUT,
  redirect: '/comp/progress/index',
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '进度条',
      component: () => import('@/views/demo/comp/progress/index.vue'),
      meta: {
        title: '进度条',
        icon: '',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_progress;