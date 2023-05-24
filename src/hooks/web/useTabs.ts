import type { RouteLocationNormalized, Router } from 'vue-router';

import { useRouter } from 'vue-router';
import { unref } from 'vue';

import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { useAppStore } from '@/store/modules/app';

enum TableActionEnum {
  REFRESH,
  CLOSE_ALL,
  CLOSE_OTHER,
  CLOSE_CURRENT,
  CLOSE,
}

export function useTabs(_router?: Router) {
    // const appStore = useAppStore();
  
    // function canIUseTabs(): boolean {
    //   const { show } = appStore.getMultiTabsSetting;
    //   if (!show) {
    //     throw new Error('The multi-tab page is currently not open, please open it in the settings！');
    //   }
    //   return !!show;
    // }
  
    const tabStore = useMultipleTabStore();
    const router = _router || useRouter();
  
    const { currentRoute } = router;
  
    function getCurrentTab() {
      const route = unref(currentRoute);
      return tabStore.getTabList.find((item) => item.path === route.path)!;
    }

    function getTabList() {
      return tabStore.getTabList;
    }

    function setTabList(tabList: any) {
      tabStore.setTabList(tabList);
    }

    function goToPage(router: Router){
      tabStore.goToPage(router);
    }
  
    // async function updateTabTitle(title: string, tab?: RouteLocationNormalized) {
    //   const canIUse = canIUseTabs;
    //   if (!canIUse) {
    //     return;
    //   }
    //   const targetTab = tab || getCurrentTab();
    //   await tabStore.setTabTitle(title, targetTab);
    // }
  
    // async function updateTabPath(path: string, tab?: RouteLocationNormalized) {
    //   const canIUse = canIUseTabs;
    //   if (!canIUse) {
    //     return;
    //   }
    //   const targetTab = tab || getCurrentTab();
    //   await tabStore.updateTabPath(path, targetTab);
    // }

    // async function closeCurrentTab()
    // {
    //    return await tabStore.closePage(router);
    // }
  
    async function handleTabAction(action: TableActionEnum, tab?: RouteLocationNormalized) {
    //   const canIUse = canIUseTabs;
    //   if (!canIUse) {
    //     return;
    //   }
      const currentTab = getCurrentTab();
      switch (action) {
        case TableActionEnum.REFRESH:
          await tabStore.refreshPage(router);
          break;
  
        case TableActionEnum.CLOSE_ALL:
          await tabStore.closeAllTab(router);
          break;
  
        case TableActionEnum.CLOSE_OTHER:
          await tabStore.closeOtherTabs(router);
          break;
  
        case TableActionEnum.CLOSE_CURRENT:
        // case TableActionEnum.CLOSE:
          await tabStore.closePage(router,tab);
          break;
      }
    }
  
    return {
      refreshPage: (router) => handleTabAction(TableActionEnum.REFRESH),
      closeAll: (router) => handleTabAction(TableActionEnum.CLOSE_ALL),
      closeOther: (router) => handleTabAction(TableActionEnum.CLOSE_OTHER),
      closeCurrent: (router) => handleTabAction(TableActionEnum.CLOSE_CURRENT,router),
      getCurrentTab,
      getTabList,
      setTabList,
      goToPage
    //   closeCurrentTab
    //   close: (tab?: RouteLocationNormalized) => handleTabAction(TableActionEnum.CLOSE, tab),
    //   setTitle: (title: string, tab?: RouteLocationNormalized) => updateTabTitle(title, tab),
    //   updatePath: (fullPath: string, tab?: RouteLocationNormalized) => updateTabPath(fullPath, tab),
    };
  }
  