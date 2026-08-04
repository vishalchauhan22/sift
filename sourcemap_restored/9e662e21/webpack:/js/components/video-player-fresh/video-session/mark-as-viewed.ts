import { PLAYBACK_RATE } from '@js/constants/localStorage';

import { getAppSource } from '@js/utilities/device';

import { getViewerSessionIdAndUpdateTimestamp } from '@js/utilities/localStorage/viewerSession';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import * as analytics from '@js/utilities/analytics';
import { getLocalStorageKey } from '@js/utilities/localStorage';

import { getGraphQlClientInsights } from '../../../utilities/graphql';
import * as loggerx from '../../../utilities/loggerx';
import { isFromPublicSharePage } from '../../../utilities/url';
import VideoView from '../../../utilities/video-session/engagementInsightsView.graphql';

import { getAnalyticsProps } from '../utils/analytics';

import type { VideoSessionData } from './video-session';

interface Event {
  sessionId: string;
  videoId: string;
  appSource?: string;
  viewerSessionId: string;
  speed?: string | undefined;
  segmentAnonId: string;
  parentLocation: string | null;
  embeddedOn: string | null;
  resolution: string | null;
  initialPlaybackRate?: string;
  anonName?: string;
  product: string | null;
}

type markAsViewedParams = {
  sessionData?: VideoSessionData;
  password?: string;
  speed?: number;
  anonUserName?: string;
};

export async function markAsViewed({
  sessionData,
  password,
  speed,
  anonUserName,
}: markAsViewedParams): Promise<unknown> {
  if (!sessionData) {
    return;
  }

  const { anonID } = analytics.getAnalyticsIds();
  const { parentLocation = '' } = isFromPublicSharePage();
  const initialPlaybackRate = getLocalStorageKey(PLAYBACK_RATE);
  const viewerSessionId = getViewerSessionIdAndUpdateTimestamp();
  const { product } = getAnalyticsProps();

  const event: Event = {
    sessionId: sessionData.id,
    videoId: sessionData.videoId,
    appSource: getAppSource(),
    speed: typeof speed !== 'undefined' ? speed?.toString() : undefined,
    segmentAnonId: anonID,
    parentLocation,
    embeddedOn: document.referrer == '' ? null : document.referrer,
    resolution: `${window.innerWidth}x${window.innerHeight}`,
    initialPlaybackRate:
      initialPlaybackRate != null ? initialPlaybackRate?.toString() : undefined,
    viewerSessionId,
    anonName: anonUserName,
    product,
  };

  loggerx.addCrumb({
    message: 'video view',
  });

  try {
    const data = await sendMutation(event, password);

    const { embeddedOn: _embeddedOn, ...rest } = event;
    loggerx.debug('video view response', { event: rest });

    return data;
  } catch (err) {
    loggerx.error(
      err,
      {
        videoId: sessionData.videoId,
        variables: event,
        message:
          'ViewCountTracking: Network error when marking video as viewed',
      },
      { feature: Feature.VideoPlayer }
    );
  }
}

function sendMutation(event: Event, password?: string) {
  const client = getGraphQlClientInsights();

  return client.mutate({
    mutation: VideoView,
    variables: { event, password },
  });
}
