import { ErrorSeverities } from '@js/constants/error-severities';

import { SHARE_VIDEO_NAME_UPDATED } from '@js/constants/events';

import {
  useUpdateVideoNameMutation,
  UpdateVideoNameMutation,
} from '@js/common/UpdateVideoName.generated';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useVideoContext } from '@js/common/video-player';

import * as loggerx from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import * as analytics from '@js/utilities/analytics';

import { VIDEO_TITLE_LOGGER_PREFIX } from './constants';

import { useUpdateVideoTitleInContextAndUserFacingStates } from './useUpdateVideoTitleInContextAndUserFacingStates';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../utilities/analytics/attribute-transformer';

const BASIC_ERROR_MESSAGE = 'Oops! Error updating video title';

export type SaveVideoTitleHookReturnType = ({
  previousTitle,
  newTitle,
}: {
  previousTitle: string;
  newTitle: string;
}) => void;

/**
 * This hook returns a function that handles the logic for saving the video title to the frontend and backend.
 * First, it optimistically updates the frontend states (video context, document title, url slug).
 * Then, it calls the backend to update the video title.
 * If there is an error, it resets the frontend states to the previous title.
 * @returns {SaveVideoTitleHookReturnType}
 */
export const useSaveVideoTitle = (): SaveVideoTitleHookReturnType => {
  const { showErrorBar } = useErrorBar();
  const {
    video: { id: videoId },
  } = useVideoContext();
  const updateTitleStates = useUpdateVideoTitleInContextAndUserFacingStates();

  const handleError = (
    errMessageToShow: string,
    errorToLog: Error,
    previousTitle: string
  ) => {
    loggerx.error(
      errorToLog,
      {
        message: `${VIDEO_TITLE_LOGGER_PREFIX} error in useSaveVideoTitle`,
      },
      {
        feature: Feature.VideoPackaging,
      }
    );
    showErrorBar({
      message: errMessageToShow,
      severity: ErrorSeverities.ERROR,
    });
    // reset states to previous title
    loggerx.info(
      `${VIDEO_TITLE_LOGGER_PREFIX} Resetting video context title to previous title due to error`,
      {
        videoId,
      }
    );
    updateTitleStates(previousTitle);
  };

  const handleOnCompleted = ({
    data: { result },
    previousTitle,
  }: {
    data: UpdateVideoNameMutation;
    previousTitle: string;
  }) => {
    if (result?.__typename === 'UpdateVideoNamePayload') {
      analytics.track(SHARE_VIDEO_NAME_UPDATED, {
        ...withIdentifiers(
          SHARE_VIDEO_NAME_UPDATED,
          AnalyticsEntityId.video(videoId, 'video_id')
        ),
        oldLength: previousTitle.length,
        newLength: result.video?.name.length,
        source: 'video-share-page',
      });
      loggerx.info(
        `${VIDEO_TITLE_LOGGER_PREFIX} Video title updated successfully from UpdateVideoNameMutation`,
        {
          videoId,
        }
      );
    } else {
      let errMessage = BASIC_ERROR_MESSAGE;

      if (result && 'message' in result) {
        errMessage = result?.message;
      }

      // to help with debugging
      const messageToLog = `${result?.__typename}: ${errMessage}`;
      const errorToLog = new Error(messageToLog);

      handleError(errMessage, errorToLog, previousTitle);
    }
  };

  const [updateVideoNameMutation] = useUpdateVideoNameMutation();

  const saveVideoTitle = ({
    previousTitle,
    newTitle,
  }: {
    previousTitle: string;
    newTitle: string;
  }) => {
    // optimistically update frontend states
    loggerx.info(
      `${VIDEO_TITLE_LOGGER_PREFIX} Optimistically updating video context title to new title`,
      {
        videoId,
      }
    );
    updateTitleStates(newTitle);

    updateVideoNameMutation({
      variables: {
        force: true,
        id: videoId,
        name: newTitle,
      },
      onError: err => {
        handleError(BASIC_ERROR_MESSAGE, err, previousTitle);
      },
      onCompleted: data => handleOnCompleted({ data, previousTitle }),
      optimisticResponse: {
        __typename: 'Mutation',
        result: {
          __typename: 'UpdateVideoNamePayload',
          video: {
            __typename: 'RegularUserVideo',
            id: videoId,
            name: newTitle,
          },
        },
      },
    });
  };

  return saveVideoTitle;
};
