import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const about: AppRouteModule = {
  path: '/about',
  name: '关于',
  component: LAYOUT,
  redirect: '/about/aboutPage',
  meta: {
    //hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: 'routes.dashboard.about',
    orderNo: 100000,
  },
  children: [
    {
      path: 'aboutPage',
      name: '关于',
      component: () => import('@/views/sys/about/index.vue'),
      meta: {
        title: 'routes.dashboard.about',
        icon: 'simple-icons:about-dot-me',
        // hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default about;
