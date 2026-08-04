import {
  CREATION_METHOD_RECORD_REPLY_ENGAGEMENT_BAR,
  CREATION_METHOD_RECORD_REPLY_END_SCREEN,
  CREATION_METHOD_RECORD_REPLY_SIDEBAR,
} from '@js/constants/comments';
import {
  SDK_RECORDING_CANCELED_V2,
  SDK_RECORDING_COMPLETED_V2,
  SDK_RECORD_BUTTON_CLICKED_V2,
  VIDEO_COMMENT_CREATED,
} from '@js/constants/events';
import { RECORD_REPLY_SOURCE } from '@js/constants/sdk';

import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { SHARE_RECORD_REPLY_SIGNUP_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { useAnonUserName } from '@js/common/useAnonUserName';
import { useVideoContext } from '@js/common/video-player';
import { useCreateComment } from '@js/pages/share/common/comments/useCreateComment';
import { RecordReplyEventProps } from '@js/pages/share/common/record-reply/types';
import { getSdkInstance } from '@js/pages/share/common/sdk/use-cases/recordReply';
import { useCallback } from 'react';
import { incrementMetric } from '@js/utilities/metrics';

import * as analytics from '@js/utilities/analytics';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { AUTHENTICATED_USER_ACCESS } from '@loomhq/shared-utilities/constants/scopes';
import { useHasScope } from '@js/hooks/useHasScopes';

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const SDKSourceToCreationMethodMap = (source: string) => {
  switch (source) {
    case RECORD_REPLY_SOURCE.ENGAGEMENT_BAR:
      return CREATION_METHOD_RECORD_REPLY_ENGAGEMENT_BAR;
    case RECORD_REPLY_SOURCE.VIDEO_END_SCREEN:
      return CREATION_METHOD_RECORD_REPLY_END_SCREEN;
    case RECORD_REPLY_SOURCE.SIDEBAR_ENTRY_POINT:
      return CREATION_METHOD_RECORD_REPLY_SIDEBAR;
    default:
      return null;
  }
};

export const useRecordReply = (
  eventProps: RecordReplyEventProps
): (() => void) => {
  const { anonUserName } = useAnonUserName();
  const { openModal } = useModals();

  const hasAuthenticatedAccess = useHasScope(AUTHENTICATED_USER_ACCESS);
  const isLoggedIn = useIsCurrentUserLoggedIn();

  const {
    video: { id: videoId },
  } = useVideoContext();
  const { createComment } = useCreateComment();

  const initiateRecording = useCallback(async () => {
    const loomSdk = await getSdkInstance().waitOnInstance();

    const sdkButton = loomSdk.configureButton({
      hooks: {
        onRecordingComplete: () => undefined,
        onUploadComplete: () => undefined,
        onInsertClicked: oembed => {
          if (isLoggedIn && hasAuthenticatedAccess) {
            const commentContent = oembed.sharedUrl;

            createComment({
              content: commentContent,
              addReplyId: null,
              anonUserName,
            });

            analytics.track(VIDEO_COMMENT_CREATED, {
              ...withIdentifiers(
                VIDEO_COMMENT_CREATED,
                AnalyticsEntityId.video(videoId, 'video_id')
              ),
              creation_method: SDKSourceToCreationMethodMap(eventProps.source),
              comment_length: commentContent?.length,
              freshPlayer: true,
              video_ended: true,
            });
          } else {
            openModal({
              modalType: SHARE_RECORD_REPLY_SIGNUP_MODAL,
              options: {
                videoId: oembed.id,
                comment: oembed.sharedUrl,
                addReplyId: null,
              },
            });
          }

          incrementMetric('recorder.insert_recording', {
            source: eventProps.source,
            isLoggedIn,
          });
        },
        onStart: () => {
          analytics.track(SDK_RECORD_BUTTON_CLICKED_V2, eventProps);
          incrementMetric('recorder.start_recording', {
            source: eventProps.source,
            isLoggedIn,
          });
        },
        onCancel: () => {
          analytics.track(SDK_RECORDING_CANCELED_V2, eventProps);
          incrementMetric('recorder.cancel_recording', {
            source: eventProps.source,
            isLoggedIn,
          });
        },
        onComplete: () => {
          analytics.track(SDK_RECORDING_COMPLETED_V2, eventProps);
          incrementMetric('recorder.recording_complete', {
            source: eventProps.source,
            isLoggedIn,
          });
        },
      },
    });

    sdkButton.openPreRecordPanel();
  }, [
    anonUserName,
    createComment,
    eventProps,
    hasAuthenticatedAccess,
    isLoggedIn,
    openModal,
    videoId,
  ]);

  return initiateRecording;
};
