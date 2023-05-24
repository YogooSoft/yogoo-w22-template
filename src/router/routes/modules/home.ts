import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: 'routes.dashboard.dashboard',
  },
  children: [
    {
      path: 'analysis',
      name: '首页',
      component: () => import('@/views/home/Home.vue'),
      meta: {
        // affix: true,
        title: 'routes.dashboard.analysis',
        hideclose: true,
      },
    }
  ],
};

export default dashboard;
