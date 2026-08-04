import { WORKSPACE_DESTINATION_STATE_CALCULATED } from '@js/constants/events';

import { delayAnalyticsEvent } from '@js/common/analytics';
import {
  selectWorkspaceId,
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';

import { useWorkspaceDestinationStateData } from '@js/hooks/useWorkspaceDestinationStateData';
import React, { useEffect, useRef } from 'react';

import { getViewerSessionIdAndUpdateTimestamp } from '@js/utilities/localStorage/viewerSession';

import { VIEWER_SESSION_ID } from '@loomhq/shared-utilities/constants/analytics';
import { Page } from '@loomhq/shared-utilities/constants/product';
import { page, track } from '@js/utilities/analytics';

// List of page names that will start a new viewer session or prolong
// an existing active viewer session.
const VIEWER_SESSION_PAGE_ENTRYPOINTS = [Page.IndividualVideo];

type AnalyticsTrackPageWrapperProps = {
  children: React.ReactNode;
  pageName: string | Page; // TODO: restrict to Page once all events are updated
  props?: {
    is_owner?: boolean;
    fresh?: boolean;
    isCommunityLoom?: boolean | null;
    isVariables?: boolean;
  };
};

export const AnalyticsTrackPageWrapper = ({
  children,
  pageName,
  props = {},
}: AnalyticsTrackPageWrapperProps): JSX.Element => {
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const organizationId = useCurrentUserSelector(selectWorkspaceId, undefined);
  const workspaceDestinationStateData = useWorkspaceDestinationStateData();

  const loggedPageState = useRef(false);
  const loggedDestinationState = useRef(false);

  useEffect(() => {
    if (loggedPageState.current) {
      return;
    }

    loggedPageState.current = true;

    if (VIEWER_SESSION_PAGE_ENTRYPOINTS.includes(pageName as Page)) {
      props[VIEWER_SESSION_ID] = getViewerSessionIdAndUpdateTimestamp();
    }

    const propsToLog = {
      ...props,
      is_logged_in: isLoggedIn,
      organization_id: organizationId,
    };

    delayAnalyticsEvent(page, pageName, propsToLog);
  }, [pageName, props, isLoggedIn, organizationId]);

  useEffect(() => {
    if (
      !isLoggedIn ||
      !workspaceDestinationStateData ||
      loggedDestinationState.current
    ) {
      return;
    }

    loggedDestinationState.current = true;

    delayAnalyticsEvent(
      track,
      WORKSPACE_DESTINATION_STATE_CALCULATED,
      workspaceDestinationStateData
    );
  }, [isLoggedIn, workspaceDestinationStateData]);

  return <>{children}</>;
};
