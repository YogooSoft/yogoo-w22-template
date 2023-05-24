import type { Router, RouteLocationNormalized } from 'vue-router';
import { createPermissionGuard } from './permissionGuard';

export function setupRouterGuard(router: Router) {
    createPageGuard(router);
    // createPageLoadingGuard(router);
    // createHttpGuard(router);
    // createScrollGuard(router);
    // createMessageGuard(router);
    // createProgressGuard(router);
    createPermissionGuard(router);
    // createParamMenuGuard(router); // must after createPermissionGuard (menu has been built.)
    // createStateGuard(router);
  }

  function createPageGuard(router: Router) {
    const loadedPageMap = new Map<string, boolean>();
     
    router.beforeEach(async (to) => {
      // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
      // 页面已经加载，再次打开会更快，不需要进行加载和其他处理
      to.meta.loaded = !!loadedPageMap.get(to.path);
      // Notify routing changes
    //   setRouteChange(to);
  
      return true;
    });
  
    router.afterEach((to) => {
      loadedPageMap.set(to.path, true);
    });
  }