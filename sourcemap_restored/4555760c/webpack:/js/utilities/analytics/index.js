/* eslint-disable @loomhq/loom/no-js-extension */

import { LOOM_VERSION } from '@js/constants/versions';

import { getAtlassianAnalyticsClient } from '@js/common/analytics/atlassian-analytics/get-analytics-client';

import { selectFromCurrentUserCache } from '@js/common/current-user/cache/selectFromCurrentUserCache';

import {
  KEY_AJS_USER_ID,
  KEY_AJS_USER_TRAITS,
} from '@loomhq/shared-utilities/constants/cookie';
import { Team } from '@loomhq/shared-utilities/constants/product';

import { amplitudeLoaded } from './amplitude';
import { isInvalidUserId } from './helpers';
import { page } from './page';
import { track } from './track';
import { getCookie } from '../cookieUtils';
import * as logger from '../loggerx';

// wrapper for Segment's analytics.js to check for its existence
export const ready = function (callback) {
  if (typeof window?.analytics?.ready !== 'function') {
    return callback?.();
  }

  let fired = false;

  function _onReady() {
    if (fired) {
      return;
    }

    fired = true;

    callback?.();
  }

  window.analytics.ready(_onReady);

  // window.analytics will not fire the ready callback if someone has ad-blocker
  // on and a third-party library does not load - give a generous second for
  // ready to fire
  window.setTimeout(_onReady, 1000);
};

export const identify = function (userID, traits, options = {}) {
  // seed the ajs_anonymous_id cookie regardless of
  // window.analytics being present. This helps us
  // when it comes to having anon uuids in server req
  // credentials
  getAnalyticsIds();

  if (typeof window?.analytics?.identify !== 'function') {
    return;
  }

  if (!userID) {
    options.integrations = {
      ...(options.integrations || {}),
      Zendesk: false,
      Intercom: { hideDefaultLauncher: true },
    };
  }

  // due to zendesk api rate limiting we're removing all updates
  // from the website temporarily till we figure out a better
  // solution
  options.integrations = {
    ...(options.integrations || {}),
    Zendesk: false,
    Intercom: { hideDefaultLauncher: true },
  };

  // TODO(next author): Please use getLocalStorageKey from utilities/localStorage instead
  // eslint-disable-next-line no-restricted-properties
  const localStorageUserId = localStorage.getItem(KEY_AJS_USER_ID);
  const cookieUserId = getCookie(KEY_AJS_USER_ID);

  if (
    isInvalidUserId(userID) ||
    isInvalidUserId(localStorageUserId) ||
    isInvalidUserId(cookieUserId)
  ) {
    logger.error(
      new Error(
        'About to call analytics.identify with invalid user id from local storage.'
      ),
      {
        paramUserId: userID,
        localStorageUserId,
        // TODO(next author): Please use getLocalStorageKey from utilities/localStorage instead
        // eslint-disable-next-line no-restricted-properties
        localStorageUserTraits: localStorage.getItem(KEY_AJS_USER_TRAITS),
        cookieUserId,
        cookieUserTraits: getCookie(KEY_AJS_USER_TRAITS),
      },
      { team: Team.CorePlatform }
    );
  }

  window.analytics.identify(
    userID,
    {
      ...traits,
      website_version: LOOM_VERSION,
    },
    options
  );
};

export const getAnalyticsIds = function () {
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const userID = selectFromCurrentUserCache(user => user.id, undefined);

  const analyticsClient = getAtlassianAnalyticsClient();
  const gasv3AnonymousId = analyticsClient.getAnonymousId();

  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  let deviceID = null;

  if (amplitudeLoaded()) {
    deviceID = window.amplitude.getInstance().options.deviceId;
  }

  return { anonID: gasv3AnonymousId, deviceID, userID };
};

export { track, page };
