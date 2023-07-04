import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const demo_basicForm: AppRouteModule = {
  path: '/comp/form/basic',
  name: 'form',
  component: LAYOUT,
  redirect: '/comp/form/basic/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '组件',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: '基础表单',
      component: () => import('@/views/demo/comp/form/basic/index.vue'),
      meta: {
        title: '基础表单',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
        hideclose: false,
      },
    },
  ],
};

export default demo_basicForm;