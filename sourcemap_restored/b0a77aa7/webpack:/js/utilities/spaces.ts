import { VIDEO_SPACE_VISIBILITY_UPDATED } from '@js/constants/events';

import * as analytics from '@js/utilities/analytics';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

export const trackVideoSpaceVisibilityUpdate = ({
  videoIds,
  currentSpaceIds,
  previousSpaceIds,
  source,
}: {
  videoIds: string[];
  currentSpaceIds: string[];
  previousSpaceIds: string[];
  source: string;
}): void => {
  for (const videoId of videoIds) {
    trackShareForVideo({ videoId, currentSpaceIds, previousSpaceIds, source });

    trackUnshareForVideo({
      videoId,
      currentSpaceIds,
      previousSpaceIds,
      source,
    });
  }
};

export const trackShareForVideo = ({
  videoId,
  currentSpaceIds,
  previousSpaceIds,
  source,
}: {
  videoId: string;
  currentSpaceIds: string[];
  previousSpaceIds: string[];
  source: string;
}): void => {
  // Track all new shares
  for (const spaceId of currentSpaceIds) {
    if (!previousSpaceIds.includes(spaceId)) {
      analytics.track(VIDEO_SPACE_VISIBILITY_UPDATED, {
        ...withIdentifiers(
          VIDEO_SPACE_VISIBILITY_UPDATED,
          AnalyticsEntityId.video(videoId, 'video_id'),
          AnalyticsEntityId.space(spaceId, 'string', 'space_id')
        ),
        is_shared: true,
        source,
      });
    }
  }
};

export const trackUnshareForVideo = ({
  videoId,
  currentSpaceIds,
  previousSpaceIds,
  source,
}: {
  videoId: string;
  currentSpaceIds: string[];
  previousSpaceIds: string[];
  source: string;
}): void => {
  // Track all new unshares
  for (const spaceId of previousSpaceIds) {
    if (!currentSpaceIds.includes(spaceId)) {
      analytics.track(VIDEO_SPACE_VISIBILITY_UPDATED, {
        ...withIdentifiers(
          VIDEO_SPACE_VISIBILITY_UPDATED,
          AnalyticsEntityId.video(videoId, 'video_id'),
          AnalyticsEntityId.space(spaceId, 'string', 'space_id')
        ),
        is_shared: false,
        source,
      });
    }
  }
};
