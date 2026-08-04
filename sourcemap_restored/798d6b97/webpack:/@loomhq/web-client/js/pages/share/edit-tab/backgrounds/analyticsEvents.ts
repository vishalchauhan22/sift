import * as analytics from '@js/utilities/analytics';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

export const SHARE_BACKGROUND_TOGGLED = 'Share Background Toggled';
export const SHARE_BACKGROUND_HEX_CHANGED = 'Share Background Hex Changed';
export const SHARE_BACKGROUND_PRESET_CHANGED =
  'Share Background Preset Changed';
export const SHARE_BACKGROUND_SEEMORE_CLICKED =
  'Share Background See More Clicked';

export const fireShareBackgroundToggledEvent = ({
  videoId,
  enabled,
}: {
  videoId: string;
  enabled: boolean;
}): void => {
  analytics.track(SHARE_BACKGROUND_TOGGLED, {
    ...withIdentifiers(
      SHARE_BACKGROUND_TOGGLED,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    enabled,
  });
};

export const fireShareBackgroundHexChangedEvent = ({
  videoId,
  color,
}: {
  videoId: string;
  color: string;
}): void => {
  analytics.track(SHARE_BACKGROUND_HEX_CHANGED, {
    ...withIdentifiers(
      SHARE_BACKGROUND_HEX_CHANGED,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    color,
  });
};

export const fireShareBackgroundPresetChangedEvent = ({
  videoId,
  name,
}: {
  videoId: string;
  name: string;
}): void => {
  analytics.track(SHARE_BACKGROUND_PRESET_CHANGED, {
    ...withIdentifiers(
      SHARE_BACKGROUND_PRESET_CHANGED,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    name,
  });
};

export const fireShareBackgroundSeeMoreClickedEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(SHARE_BACKGROUND_SEEMORE_CLICKED, {
    ...withIdentifiers(
      SHARE_BACKGROUND_SEEMORE_CLICKED,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
  });
};
