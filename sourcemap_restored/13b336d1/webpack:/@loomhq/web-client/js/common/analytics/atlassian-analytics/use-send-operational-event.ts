import {
  getCleanedBrowserName,
  getCleanedOSName,
  getCurrentPageName,
  PlayerContext,
} from '@js/components/video-player-fresh/playback/events';
import * as loggerx from '@js/utilities/loggerx';

import { deviceDetails } from '@js/utilities/device';

import {
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_BUSINESS_PLUS_AI,
} from '@loomhq/shared-utilities/constants/workspacePlans';

import { getAtlassianAnalyticsClient } from './get-analytics-client';

type SendVideoPlaybackEventParams = {
  eventName: string;
  videoId: string;
  videoWorkspacePlan: string;
  videoWorkspacePlanIncludesAI: boolean;
  videoWorkspaceSiteId: string;
  videoWorkspaceLoomOrgId?: string;
  playerContext: PlayerContext;
  extras: Record<string, unknown>;
};

export const sendVideoPlaybackEvent = ({
  eventName,
  videoId,
  videoWorkspacePlan,
  videoWorkspacePlanIncludesAI,
  videoWorkspaceSiteId,
  videoWorkspaceLoomOrgId,
  playerContext,
  extras,
}: SendVideoPlaybackEventParams): void => {
  const analyticsClient = getAtlassianAnalyticsClient();

  videoWorkspacePlan =
    videoWorkspacePlan === WORKSPACE_PLAN_BUSINESS &&
    videoWorkspacePlanIncludesAI
      ? WORKSPACE_PLAN_BUSINESS_PLUS_AI
      : videoWorkspacePlan;

  analyticsClient?.sendOperationalEvent({
    source: 'shaka',
    actionSubject: 'videoPlayback',
    action: eventName,
    attributes: {
      osName: getCleanedOSName(deviceDetails.os.name),
      browserName: getCleanedBrowserName(deviceDetails.browser.name),
      page: getCurrentPageName(),
      videoId,
      videoWorkspacePlan,
      videoWorkspaceSiteId,
      videoWorkspaceLoomOrgId,
      ...playerContext,
      ...extras,
    },
  });

  loggerx.info('sent sla event to atlassian analytics', {
    event: 'videoPlayback',
    action: eventName,
    videoId,
    workspaceId: videoWorkspaceLoomOrgId,
    workspaceSiteId: videoWorkspaceSiteId,
    workspacePlan: videoWorkspacePlan,
    clientOS: getCleanedOSName(deviceDetails.os.name),
    clientBrowser: getCleanedBrowserName(deviceDetails.browser.name),
    playerContext,
    extras,
  });
};
