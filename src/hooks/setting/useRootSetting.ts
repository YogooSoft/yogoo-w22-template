import { defineComponent, computed, ref } from "vue";
import { useTodoStore } from "@/store/modules/todo";
import { useCacheStore } from "@/store/modules/cache";
import { store } from "@/store";


export function useRootSetting() {
  const appStore = useTodoStore(store);
  const cacheStore = useCacheStore(store);

  const getTitle = computed(() => appStore.getTitle);
  const getLoginPageTitle = computed(() => appStore.getLoginPageTitle);
  const getVersion = computed(() => appStore.getVersion);

  const getIsCollapse = computed(() => appStore.getIsCollapse);
  const setIsCollapse = computed(() => appStore.setIsCollapse);

  const getUserMenu =  computed(() => cacheStore.getUserMenu);
  const setUserMenu =  computed(() => cacheStore.setUserMenu);

  return {
    getTitle,
    getLoginPageTitle,
    getVersion,
    getIsCollapse,
    setIsCollapse,
    getUserMenu,
    setUserMenu
  };
}
