import { withInstall } from '@/utils';

// import appLogo from './src/AppLogo.vue';
import appProvider from './src/AppProvider.vue';
import appSearch1 from './src/search/AppSearch.vue';

export { useAppProviderContext } from './src/useAppContext';

// export const AppLogo = withInstall(appLogo);
export const AppProvider = withInstall(appProvider);
export const AppSearch = withInstall(appSearch1);
