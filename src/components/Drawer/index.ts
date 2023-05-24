import { withInstall } from '@/utils/';

import yuiDrawer from './src/Drawer.vue';

export const YuiDrawer = withInstall(yuiDrawer);
export { useDrawer, useDrawerInner } from './src/useDrawer';
export * from './src/typing';


