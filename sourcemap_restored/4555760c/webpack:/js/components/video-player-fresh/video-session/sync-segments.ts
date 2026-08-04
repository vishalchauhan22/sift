import { Segment } from '@js/common/video-player/api/insights';
import { getGraphQlClientInsights } from '@js/utilities/graphql';
import * as loggerx from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import PlaySegments from '@js/utilities/video-session/playSegments.graphql';
type SyncableSegment = Segment & Required<Pick<Segment, 'start' | 'end'>>;

interface SyncRequest {
  videoId: string;
  sessionId?: string;
  segment: SyncableSegment;
  speed: number;
}

export function isSyncable(segment: Segment): segment is SyncableSegment {
  return segment.end !== undefined && segment.start !== undefined;
}

// This is a map of maps. For each videoId it keeps a mapping between the
// client side segment ID and the server side segment ID.
// E.g.:  { "video-id-1": {"abcd-1234": "9876", "bcbc-7676": "9877", ... }, "video-id:2": { ... }  }
const segmentMapsForVideos = new Map<string, Map<string, string>>();

export function createSegmentSyncer(
  videoId: string
): (options: SyncRequest) => Promise<void> {
  if (!segmentMapsForVideos.has(videoId)) {
    segmentMapsForVideos.set(videoId, new Map<string, string>());
  }

  const map = segmentMapsForVideos.get(videoId);

  if (!map) {
    // this should really never happen but this check keeps the TS checker happy
    throw new Error('Could not create map');
  }

  return async (options: SyncRequest) => {
    const segmentId = options.segment.id || '';
    const serverId = map.get(segmentId);

    try {
      const data = await syncSegments({
        ...options,
        serverId,
      });

      if (data && data.id) {
        // map the current segment ID from the client side to the ID created on the server side.
        map.set(segmentId, data.id);
      }
    } catch (e) {
      if (e.networkError) {
        return;
      }

      loggerx.error(
        e,
        {
          currentSegment: options.segment,
          videoId: options.videoId,
          sessionId: options.sessionId,
        },
        { feature: Feature.EngagementInsights }
      );
    }
  };
}

type SegmentOptions = SyncRequest & {
  serverId?: string;
};

interface SyncResponse {
  id: string;
}

async function syncSegments(
  options: SegmentOptions
): Promise<SyncResponse | null> {
  loggerx.addCrumb({
    message: 'sending segment',
    context: options.segment,
  });

  const { data } = await sendMutation(options);
  const payload = data?.updateVideoPlaySegmentV2;

  if (!payload) {
    throw Error('payload is undefined');
  }

  if (payload.__typename === 'GenericError') {
    throw Error(payload.message);
  }

  if (payload.__typename === 'InvalidRequestWarning') {
    loggerx.warning(`Failed to sync segments: ${payload.message}`, null);
  }

  return payload;
}

function sendMutation(options: SegmentOptions) {
  const {
    videoId,
    sessionId,
    serverId: sid,
    segment: { start, end },
    speed,
  } = options;
  const client = getGraphQlClientInsights();

  return client.mutate({
    mutation: PlaySegments,
    variables: {
      segment: {
        videoId,
        sessionId,
        sid,
        speed,
        start,
        end,
      },
    },
  });
}
