import type { GlobEnvConfig } from '#/config';

import { warn } from '@/utils/log';
import pkg from '../../package.json';


export function getAppEnvConfig() {

  const {
    VUE_GLOB_APP_TITLE,
    VUE_GLOB_API_URL,
    VUE_USE_MOCK,
    VUE_GLOB_APP_SHORT_NAME,
    VUE_GLOB_API_URL_PREFIX,
    VUE_GLOB_UPLOAD_URL,
  } = process.env;

  return {
    VUE_GLOB_APP_TITLE,
    VUE_GLOB_API_URL,
    VUE_USE_MOCK,
    VUE_GLOB_APP_SHORT_NAME,
    VUE_GLOB_API_URL_PREFIX,
    VUE_GLOB_UPLOAD_URL,
  };
}

/**
 * @description: Development mode
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return <string>process.env.NODE_ENV;
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
    return getEnv() === devMode;
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
    return getEnv() === prodMode;
}
