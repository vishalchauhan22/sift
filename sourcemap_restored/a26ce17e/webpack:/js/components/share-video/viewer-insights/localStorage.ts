import {
  setLocalStorageKey,
  getLocalStorageKey,
} from '@js/utilities/localStorage';

const hidePartialInfoSavedKey = 'engagementInsights:showPartialInfoSaved';

export const hidePartialInfo = (): void =>
  setLocalStorageKey(hidePartialInfoSavedKey, true);

export const getHidePartialInfoStored = (): boolean | undefined =>
  getLocalStorageKey(hidePartialInfoSavedKey);
