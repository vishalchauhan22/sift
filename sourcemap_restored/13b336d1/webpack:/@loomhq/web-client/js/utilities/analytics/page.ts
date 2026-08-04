import { isDev } from '@js/constants/environment';

import { LOOM_VERSION_NUMERIC } from '@js/constants/runtimeConfig';

import { selectIsCurrentUserLoggedInFromCache } from '@js/common/current-user/cache/selectIsCurrentUserLoggedInFromCache';

import { getAnalyticsIds } from '@js/utilities/analytics';
import { isMobile } from '@js/utilities/device';

import { DEBUG_ANALYTICS } from '@loomhq/shared-utilities/constants/analytics';

import * as logger from '../loggerx';
import { v4 } from 'uuid';

import { sendAtlassianAnalyticsEvent } from './send-atlassian-analaytics-event';

import type { AnalyticsEvent, AnalyticsEventProps } from './types';
import { convertObjectPropertiesToCamelCase } from '@loomhq/shared-utilities/utilities/analytics/convertObjectPropertiesToCamelCase';

export const page = function (
  name: AnalyticsEvent,
  props: AnalyticsEventProps = {}
): void {
  if (typeof window?.analytics?.page !== 'function') {
    return;
  }

  const { anonID, userID } = getAnalyticsIds();

  if (DEBUG_ANALYTICS && isDev) {
    logger.info(`📊 [analytics] Page: ${name}`, props);
  }

  const isLoggedIn = selectIsCurrentUserLoggedInFromCache();

  props.is_logged_in = isLoggedIn;

  // Log whether the user is on a mobile device
  props.isMobile = isMobile;

  props.loomVersionNumeric = LOOM_VERSION_NUMERIC;

  const tempBulkTestUuid = v4(); // TDODO: Remove after data profile testing is complete
  props.tempBulkTestUuid = tempBulkTestUuid;

  window.analytics.page(name, props);

  if (window.dataLayer) {
    // Google Tag Manager event
    window.dataLayer.push({
      event: `Viewed ${name} Page`,
      name,
      path: window.location.pathname,
      referrer: document?.referrer,
      search: window.location.search,
      segmentAnonymousId: anonID,
      title: document?.title,
      url: window.location.href,
      userId: userID,
      ...props,
    });
  }

  // send atlassian analytics events to GASV3
  sendAtlassianAnalyticsEvent(name, convertObjectPropertiesToCamelCase(props));
};
