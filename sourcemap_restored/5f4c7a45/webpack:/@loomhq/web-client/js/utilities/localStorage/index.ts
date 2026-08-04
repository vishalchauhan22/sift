import { REQUEST_PUSH_PERMISSIONS } from '@loomhq/shared-utilities/constants/triggers';

import { jsonParseUnsafeThrows } from '../json/safe-json-parse';

let localStorage;

// block third party cookies check
// https://useloom.atlassian.net/browse/LOOM-1639
try {
  localStorage = window && window.localStorage;
} catch (err) {
  // do nothing
}

export const setLocalStorageKey = (
  key: string | undefined,
  val: unknown
): void => {
  if (localStorage) {
    // Intentional exception since this is the utility function
    // eslint-disable-next-line no-restricted-properties
    localStorage.setItem(key, JSON.stringify(val));
  }
};

export const getLocalStorageKey = (key: string | undefined): any => {
  let val;

  if (!localStorage) {
    return val;
  }

  try {
    // Intentional exception since this is the utility function
    // eslint-disable-next-line no-restricted-properties
    val = localStorage.getItem(key);

    val = jsonParseUnsafeThrows(val);
  } catch (err) {
    // do nothing
  }

  return val;
};

export const clearLocalStorageKey = (key: string | undefined): void =>
  // Intentional exception since this is the utility function
  // eslint-disable-next-line no-restricted-properties
  localStorage && localStorage.removeItem(key);

const requestPushPermissionKey = `triggers:${REQUEST_PUSH_PERMISSIONS}`;

export const getRequestPushPermissionData = (): any =>
  getLocalStorageKey(requestPushPermissionKey);
export const clearRequestPushPermissionData = (): void =>
  clearLocalStorageKey(requestPushPermissionKey);

const showCaptionsKey = 'showCaptions';

export const getShowCaptions = (): any => getLocalStorageKey(showCaptionsKey);
