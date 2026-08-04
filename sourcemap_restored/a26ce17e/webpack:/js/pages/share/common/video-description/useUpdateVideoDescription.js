/* eslint-disable @loomhq/loom/no-js-extension */
import { ErrorSeverities } from '@js/constants/error-severities';
import {
  SHARE_VIDEO_DESCRIPTION_UPDATED,
  SHARE_VIDEO_DESCRIPTION_DELETED,
} from '@js/constants/events';

import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useVideoContext } from '@js/common/video-player';
import React from 'react';
import * as urlRegexSafe from 'url-regex-safe';
import { detectTimestamps } from '@js/utilities/timestamps';

import * as analytics from '@js/utilities/analytics';

import { useUpdateVideoDescriptionMutation } from './UpdateVideoDescription.generated';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

export const useUpdateVideoDescription = () => {
  const { showErrorBar } = useErrorBar();
  const [updateDescription] = useUpdateVideoDescriptionMutation();
  const { setVideo } = useVideoContext();
  const [isUpdatingDescription, setIsUpdatingDescription] =
    React.useState(false);

  const updateDescriptionWithAnalytics = React.useCallback(
    async (id, oldDescription, description, videoLength, isFirstUpdate) => {
      const timestamps = detectTimestamps(description, videoLength);

      if (description === '') {
        analytics.track(
          SHARE_VIDEO_DESCRIPTION_DELETED,
          withIdentifiers(
            SHARE_VIDEO_DESCRIPTION_DELETED,
            AnalyticsEntityId.video(id, 'video_id')
          )
        );
      }

      if (oldDescription !== description) {
        analytics.track(SHARE_VIDEO_DESCRIPTION_UPDATED, {
          ...withIdentifiers(
            SHARE_VIDEO_DESCRIPTION_UPDATED,
            AnalyticsEntityId.video(id, 'video_id')
          ),
          length: description.length,
          includesTimestamp: timestamps.length !== 0,
          timestampCount: timestamps.length,
          isFirst: isFirstUpdate,
          hasLink: urlRegexSafe({
            apostrophes: true,
            strict: true,
            re2: false,
          }).test(description),
        });

        const { loading } = await updateDescription({
          variables: {
            id,
            description,
          },
          onError: () => {
            showErrorBar({
              message: 'Failed to update description.',
              severity: ErrorSeverities.ERROR,
            });
          },
          onCompleted: data => {
            if (data.updateVideoDescriptionV2.description) {
              setVideo({
                description: data.updateVideoDescriptionV2.description,
              });
            }
          },
        });

        setIsUpdatingDescription(loading);
      }
    },
    [setVideo, showErrorBar, updateDescription]
  );

  return {
    updateDescription: updateDescriptionWithAnalytics,
    isUpdatingDescription,
  };
};
