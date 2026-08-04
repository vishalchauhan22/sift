/* eslint-disable @loomhq/loom/no-js-extension */
let localStorage;

// block third party cookies check
// https://useloom.atlassian.net/browse/LOOM-1639
try {
  localStorage = window && window.localStorage;
} catch (err) {
  // do nothing
}

const hidePartialInfoSavedKey = 'engagementInsights:showPartialInfoSaved';

export const hidePartialInfo = () =>
  // TODO(next author): Please use setLocalStorageKey from utilities/localStorage instead
  // eslint-disable-next-line no-restricted-properties
  localStorage && localStorage.setItem(hidePartialInfoSavedKey, true);
export const getHidePartialInfoStored = () =>
  // TODO(next author): Please use getLocalStorageKey from utilities/localStorage instead
  // eslint-disable-next-line no-restricted-properties
  localStorage && localStorage.getItem(hidePartialInfoSavedKey);
