import { Persistent, BasicKeys } from '@/utils/cache/persistent';
import { CacheTypeEnum } from '@/enums/cacheEnum';
import projectSetting from '@/settings/projectSetting';
import { TOKEN_KEY } from '@/enums/cacheEnum';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;


/**
 * 获取令牌
 * @returns 
 */
export function getToken() {
  return getAuthCache<string>(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value);
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn();
}
