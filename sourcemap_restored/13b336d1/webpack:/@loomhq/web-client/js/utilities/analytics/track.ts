import {
  ALLOWLIST_GOOGLE_ANALYTICS,
  INCLUDED_EVENTS_FROM_INTERCOM,
  VIEWER_SESSION_EVENTS,
} from '@js/constants/events';

import { LOOM_VERSION_NUMERIC } from '@js/constants/runtimeConfig';

import { selectIsCurrentUserLoggedInFromCache } from '@js/common/current-user';
import { selectFromCurrentUserCache } from '@js/common/current-user/cache/selectFromCurrentUserCache';

import { isMobile } from '@js/utilities/device';

import { KEY_AJS_ANON_ID } from '@loomhq/shared-utilities/constants/cookie';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { convertObjectPropertiesToCamelCase } from '@loomhq/shared-utilities/utilities/analytics/convertObjectPropertiesToCamelCase';

import { getCookie } from '../cookieUtils';
import { getViewerSessionIdAndUpdateTimestamp } from '../localStorage/viewerSession';
import * as logger from '../loggerx';
import { v4 } from 'uuid';
import { sendAtlassianAnalyticsEvent } from './send-atlassian-analaytics-event';
import {
  AnalyticsEvent,
  AnalyticsEventProps,
  AnalyticsEventOptions,
} from './types';
import { withIdentifiers } from './attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

// maximum time to wait before calling the callback
// this because the callback may never be called when ad blocker is running
// so we call it if this much time has passed and it hasn't been called yet
const MAX_WAIT_BEFORE_CALLBACK_MS = 150;

// callback here is particularly useful where we trigger a page unload
// immediately following a track call. this ensures the post will
// execute before the unload and avoid raciness
export const track = function (
  evt: AnalyticsEvent,
  props: AnalyticsEventProps = {},
  callback?: () => void
): void {
  try {
    if (typeof window?.analytics?.track !== 'function') {
      callback?.();
      return;
    }

    const options: AnalyticsEventOptions = {};
    const ajsId = getCookie(KEY_AJS_ANON_ID);
    // not all events are required in intercom and they
    // cause events to not go through due to their event
    // limit.
    if (!INCLUDED_EVENTS_FROM_INTERCOM.includes(evt)) {
      options.integrations = {
        Intercom: false,
      };
    }

    // There are limits to the Google Analytics API volume so we are
    // including this allowlist to explicitly receive a subset of our
    // events from Segment
    if (!ALLOWLIST_GOOGLE_ANALYTICS.includes(evt)) {
      options.integrations = {
        ...(options.integrations || {}),
        'Google Analytics': false,
      };
    }

    // Zendesks track API is in an early access program right now
    // which one must sign up for to use and we have not signed up for it yet
    // https://segment.com/docs/destinations/zendesk/#track
    options.integrations = {
      ...(options.integrations || {}),
      Zendesk: false,
    };

    const memberships = selectFromCurrentUserCache(
      user => user.memberships,
      undefined
    );

    //  if user has a selected workspace attach to event property
    const selectedWorkspaceId = memberships?.find(
      membership => membership.isSelected
    )?.organization.id;

    const isLoggedIn = selectIsCurrentUserLoggedInFromCache();
    const isSdkSharedUser = selectFromCurrentUserCache(
      user => user.isSdkSharedUser,
      false
    );
    const defaultWorkspaceId = selectFromCurrentUserCache(
      user => user.defaultWorkspaceId,
      undefined
    );
    const currentUserId = selectFromCurrentUserCache(
      user => user.id,
      undefined
    );

    if (isLoggedIn) {
      if (isSdkSharedUser) {
        props = {
          ...props,
          ...withIdentifiers(
            evt,
            AnalyticsEntityId.workspace(
              defaultWorkspaceId?.toString(),
              'string',
              'sdkPartnerId'
            )
          ),
        };
      } else {
        if (props.userId) {
          logger.warning(
            new Error(
              'Avoid logging a userId field in an analytics event explicitly. This overwrites the userId that is included in all events by default.'
            ),
            {
              fields: props,
            },
            {
              // Ideally we should determine an owner for analytics as an owned surface
              feature: Feature.Undetermined,
            }
          );
        }

        props.userId = currentUserId ? String(currentUserId) : undefined;
        props = {
          ...props,
          ...withIdentifiers(
            evt,
            AnalyticsEntityId.workspace(
              selectedWorkspaceId || props.organization_id,
              'any',
              'organization_id'
            )
          ),
        };
      }
    } else {
      options.integrations = {
        ...(options.integrations || {}),
      };
    }

    // Log whether the user is logged in or not
    props.is_logged_in = isLoggedIn;

    // Log whether the user is on a mobile device
    props.isMobile = isMobile;

    props.loomVersionNumeric = LOOM_VERSION_NUMERIC;

    const tempBulkTestUuid = v4(); // TDODO: Remove after data profile testing is complete
    props.tempBulkTestUuid = tempBulkTestUuid;

    // If this event is one of the events that we are interested in as part
    // of a viewer's journey, log the viewer session id.
    if (VIEWER_SESSION_EVENTS.includes(evt)) {
      props.viewerSessionId = getViewerSessionIdAndUpdateTimestamp();
    }

    if (typeof callback === 'function') {
      let callbackHasBeenCalled = false;

      const originalCallback = callback;

      callback = () => {
        if (!callbackHasBeenCalled) {
          callbackHasBeenCalled = true;
          originalCallback();
        }
      };

      setTimeout(callback, MAX_WAIT_BEFORE_CALLBACK_MS);
    }
    // Call segment analytics track with proper types
    const properties = { ...props, ajsId };
    window.analytics?.track(evt, properties, callback);

    if (window?.dataLayer) {
      // Google Tag Manager event
      window.dataLayer.push({
        event: evt,
        ...properties,
        options,
      });
    }

    // send atlassian analytics events to GASV3
    sendAtlassianAnalyticsEvent(
      evt,
      convertObjectPropertiesToCamelCase(properties)
    );
  } catch (err) {
    logger.error('error in analytics.track', err, {
      feature: Feature.AtlassianAnalytics,
    });
    callback?.();
  }
};
