import { PAGE_DWELL_EVENT } from '@js/constants/events';

import { DwellTimeHelper } from '@atlassiansox/analytics-web-client';

import { getAtlassianAnalyticsClient } from '@js/common/analytics';
import {
  useIsCurrentUserLoggedIn,
  useCurrentUserSelector,
} from '@js/common/current-user';

import { useMount } from '@js/hooks/useMount';

import React from 'react';

import { Page } from '@loomhq/shared-utilities/constants/product';

import { DwellEvent } from './dwellTimerTypes';

type PageDwellPageWrapperProps = {
  children: React.ReactNode;
  pageName: typeof Page.IndividualVideo | typeof Page.IndividualScreenshot;
  props: { videoId: string | null } | { screenshotId: string | null };
};

export const PageDwellPageWrapper = ({
  children,
  pageName,
  props,
}: PageDwellPageWrapperProps): JSX.Element => {
  const userId = useCurrentUserSelector(user => user.id, undefined);
  const isUserLoggedIn = useIsCurrentUserLoggedIn();
  const analyticsClient = getAtlassianAnalyticsClient();

  const dwellEvent: DwellEvent = {
    name: pageName,
    dwellTime: 0,
    FinalDwellEvent: false,
    ...props,
    userId: userId ? userId.toString() : undefined,
  };

  if (!isUserLoggedIn) {
    dwellEvent.anonymousId = analyticsClient.getAnonymousId();
  }

  useMount(() => {
    const trackCallBack = (dwellData: any) => {
      dwellEvent.dwellTime = dwellData.attributes.dwellTime;
      dwellEvent.FinalDwellEvent = dwellData.attributes.finalDwellEvent;

      const event = {
        source: PAGE_DWELL_EVENT,
        action: 'dwelled',
        actionSubject: PAGE_DWELL_EVENT,
        attributes: {
          application: 'loom',
          ...dwellEvent,
        },
      };

      (async () => {
        await analyticsClient.sendTrackEvent(event);
      })();
    };

    const eventData = {
      source: pageName,
      actionSubject: PAGE_DWELL_EVENT,
    };

    const tracker = new DwellTimeHelper(trackCallBack, eventData);

    tracker.start();

    return () => {
      tracker.stop();
    };
  });

  return <>{children}</>;
};
