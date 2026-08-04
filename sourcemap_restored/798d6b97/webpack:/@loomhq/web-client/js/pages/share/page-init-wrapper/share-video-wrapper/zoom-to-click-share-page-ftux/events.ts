import * as analytics from '@js/utilities/analytics';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

export const EDIT_ZOOM_INSTRUCTIONS_FTUX_SHOWN =
  'Edit Zoom Instructions FTUX Shown';

export const fireFtuxShownEvent = ({ videoId }: { videoId: string }): void => {
  analytics.track(EDIT_ZOOM_INSTRUCTIONS_FTUX_SHOWN, {
    ...withIdentifiers(
      EDIT_ZOOM_INSTRUCTIONS_FTUX_SHOWN,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
  });
};

export const EDIT_ZOOM_INSTRUCTIONS_FTUX_DISMISSED =
  'Edit Zooms FTUX Dismissed';

export const fireFtuxDismissedEvent = ({
  videoId,
}: {
  videoId: string;
}): void => {
  analytics.track(EDIT_ZOOM_INSTRUCTIONS_FTUX_DISMISSED, {
    ...withIdentifiers(
      EDIT_ZOOM_INSTRUCTIONS_FTUX_DISMISSED,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
  });
};
