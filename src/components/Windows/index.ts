import { withInstall } from '@/utils/';

import yuiWindowWrapper from './src/WindowWrapper.vue';

export const YuiWindowWrapper = withInstall(yuiWindowWrapper);

export { useModal, useModalInner } from './src/hooks/useModal';
export * from './src/typing';