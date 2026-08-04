import { useEffect, useRef, useState } from 'react';

import create from 'zustand';

import { INTELLIGENCE_CONTENT } from '@loomhq/shared-utilities/constants/intelligence';
import { isUnsuccessfulTranscriptionStatus } from '@loomhq/shared-utilities/utilities/transcriptionUtils';
import { useCurrentUserSelector } from '@js/common/current-user';
import { useVideoContext } from '@js/common/video-player';
import { VIDEO_TITLE_LOGGER_PREFIX } from '@js/common/video-title/constants';
import { useUpdateVideoTitleInContextAndUserFacingStates } from '@js/common/video-title/useUpdateVideoTitleInContextAndUserFacingStates';
import { VIDEO_TITLE_UPDATED } from '@js/constants/events';
import { useIsOwnerAfterRecording } from '@js/hooks/useIsOwnerAfterRecording';
import { useTitleBar } from '@js/pages/share/common';
import { useVideoPasswordContext } from '@js/common/video-password';

import { IntelligenceStatusType } from '@js/globalTypes.generated';
import { track } from '@js/utilities/analytics';
import * as loggerx from '@js/utilities/loggerx';

import {
  AutoTitleStatusChangedDocument,
  AutoTitleStatusChangedSubscription,
} from './AutoTitleStatusChanged.generated';
import {
  GetAutoTitleQuery,
  useGetAutoTitleQuery,
} from './GetAutoTitle.generated';
import { useGetVideoTitleQuery } from './GetVideoTitle.generated';
import {
  INTELLIGENCE_TIMEOUT_MS,
  isTerminalStatus,
  resolveIntelligenceStatus,
} from '@js/common/ai/utils';
import { useTranscriptStatus } from '@js/common/transcripts';

const AUTO_TITLE_TIMEOUT_MS = 35 * 1000;

type AutoTitleReturnType = {
  isAutoTitleExpected: boolean;
  shouldShowAutoTitleAnimations: boolean;
  setIsAutoTitleAnimationsCompleted: (
    isAutoTitleAnimationsCompleted: boolean
  ) => void;
  autoTitle: string;
  isAutoTitleGenerated: boolean;
  isUserEditedTitle: boolean;
};

const selectAutoTitleAndStatus = (
  data: GetAutoTitleQuery | undefined,
  loading: boolean,
  error: Error | undefined,
  hasTimedOut: boolean
): {
  autoTitle: string | null;
  autoTitleStatus: IntelligenceStatusType | null;
} => {
  if (
    !data ||
    loading ||
    error ||
    data?.getAutoFeatureStatuses?.__typename !== 'AutoFeatureStatuses'
  ) {
    return {
      autoTitle: null,
      autoTitleStatus: null,
    };
  }

  const returnData = data.getAutoFeatureStatuses;

  return {
    autoTitle: returnData.autoTitle,
    autoTitleStatus: resolveIntelligenceStatus(
      returnData.autoTitleStatus,
      hasTimedOut,
      IntelligenceStatusType.User
    ),
  };
};

export const useAutoTitle = (): AutoTitleReturnType => {
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const { isAutoTitleAnimationsCompleted, setIsAutoTitleAnimationsCompleted } =
    useAutoTitleStore();

  const { isInEditMode } = useTitleBar();

  const { password } = useVideoPasswordContext();

  const {
    video: { id: videoId },
  } = useVideoContext();

  const unsubscribeRef = useRef<() => void>();

  const {
    data: autoTitleData,
    subscribeToMore,
    loading,
    error,
  } = useGetAutoTitleQuery({
    variables: {
      videoId,
      password,
    },
    skip: !videoId,
    onCompleted: completeData => {
      if (
        completeData.getAutoFeatureStatuses?.__typename ===
          'AutoFeatureStatuses' &&
        isTerminalStatus(completeData.getAutoFeatureStatuses.autoTitleStatus)
      ) {
        // if we receive a terminal status, then we no longer have an active subscription
        // so we mark this as undefined to avoid marking a timeout later
        unsubscribeRef.current = undefined;
      }
    },
  });

  const { refetch: refetchVideoTitle } = useGetVideoTitleQuery({
    variables: {
      videoId,
      password,
    },
    skip: !videoId,
  });

  useEffect(() => {
    unsubscribeRef.current =
      subscribeToMore<AutoTitleStatusChangedSubscription>({
        document: AutoTitleStatusChangedDocument,
        variables: { videoId },
        updateQuery: (prev, { subscriptionData }) => {
          const autoFeatureStatuses =
            subscriptionData.data?.autoFeatureStatusChanged
              ?.autoFeatureStatuses;
          if (
            prev.getAutoFeatureStatuses?.__typename !== 'AutoFeatureStatuses' ||
            !autoFeatureStatuses
          ) {
            return prev;
          }

          if (isTerminalStatus(autoFeatureStatuses.autoTitleStatus)) {
            // if we receive a terminal status, then we no longer have an active subscription
            // so we mark this as undefined to avoid marking a timeout later
            unsubscribeRef.current = undefined;
          }

          // ensures that the video title in the apollo cache is updated when new data is received
          refetchVideoTitle();

          return Object.assign({}, prev, {
            statuses: {
              ...prev.getAutoFeatureStatuses,
              ...autoFeatureStatuses,
            },
          });
        },
      });
  }, [subscribeToMore, videoId, refetchVideoTitle]);

  // unsubscribe if it takes too long to receive data
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (unsubscribeRef.current) {
        setHasTimedOut(true);
        unsubscribeRef.current();
      }
    }, INTELLIGENCE_TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, []);

  const { autoTitle, autoTitleStatus } = selectAutoTitleAndStatus(
    autoTitleData,
    loading,
    error,
    hasTimedOut
  );

  const { transcriptStatus } = useTranscriptStatus();

  const isOwnerAfterRecording = useIsOwnerAfterRecording({ videoId });

  const aiAccess = useCurrentUserSelector(user => user.aiAccess, null);
  const hasAutoTitleScope = Boolean(aiAccess?.autoTitles);
  const isAutoTitleSettingEnabled = useCurrentUserSelector(
    user => user.videoSettings?.auto_title !== false,
    false
  );

  const isAutoTitleGenerated = autoTitleStatus === IntelligenceStatusType.Auto;
  const isUserEditedTitle = autoTitleStatus === IntelligenceStatusType.User;
  const isAutoTitleInvalid = autoTitleStatus === IntelligenceStatusType.Invalid;
  const isTranscriptUnavailable =
    isUnsuccessfulTranscriptionStatus(transcriptStatus);

  const isAutoTitleExpected =
    isAutoTitleSettingEnabled &&
    hasAutoTitleScope &&
    !isTranscriptUnavailable &&
    !isAutoTitleInvalid;

  const updateTitleStates = useUpdateVideoTitleInContextAndUserFacingStates();

  useEffect(() => {
    const isWaitingForAutoTitle =
      loading &&
      isAutoTitleExpected &&
      isOwnerAfterRecording &&
      (!autoTitleStatus || autoTitleStatus === IntelligenceStatusType.Pending);
    const timeout = isWaitingForAutoTitle ? AUTO_TITLE_TIMEOUT_MS : 0;

    const timeoutFn = setTimeout(() => {
      // if the status is still pending, then we can assume that the auto title
      // is not going to come in, so we can mark the animations as completed
      if (isWaitingForAutoTitle) {
        setIsAutoTitleAnimationsCompleted(true);
        track(VIDEO_TITLE_UPDATED, {
          title_content: INTELLIGENCE_CONTENT.ATTEMPTED_AUTO_GENERATION,
          video_id: videoId,
        });
        loggerx.info(
          `${VIDEO_TITLE_LOGGER_PREFIX} Auto title timed out after ${AUTO_TITLE_TIMEOUT_MS}ms`,
          {
            videoId,
          }
        );
      }
    }, timeout);

    return () => {
      clearTimeout(timeoutFn);
    };
  }, [
    loading,
    autoTitleStatus,
    isAutoTitleExpected,
    isOwnerAfterRecording,
    videoId,
    setIsAutoTitleAnimationsCompleted,
  ]);

  useEffect(() => {
    // also checking if the user is in edit mode, because we don't want to
    // interrupt if the user is attempting to update the title
    if (
      isAutoTitleExpected &&
      autoTitleStatus &&
      !isAutoTitleAnimationsCompleted &&
      !isInEditMode
    ) {
      if (autoTitleStatus === IntelligenceStatusType.Auto) {
        track(VIDEO_TITLE_UPDATED, {
          title_content: INTELLIGENCE_CONTENT.AUTO_GENERATED,
          video_id: videoId,
        });

        // once auto title comes in, then we can update
        // the frontend title states (video context, etc)
        if (autoTitle && autoTitle !== '') {
          loggerx.info(
            `${VIDEO_TITLE_LOGGER_PREFIX} Updating video context title to auto title`,
            {
              videoId,
            }
          );
          updateTitleStates(autoTitle);
        }
      }
    }
  }, [
    isAutoTitleExpected,
    autoTitleStatus,
    videoId,
    setIsAutoTitleAnimationsCompleted,
    autoTitle,
    isUserEditedTitle,
    updateTitleStates,
    isInEditMode,
    isAutoTitleAnimationsCompleted,
  ]);

  // After the user has come from the recorder and AI is expected,
  // we show the auto title animations until the user has edited the title
  // or the animations have completed
  const shouldShowAutoTitleAnimations =
    isOwnerAfterRecording &&
    isAutoTitleExpected &&
    !isUserEditedTitle &&
    !isAutoTitleAnimationsCompleted;

  return {
    isAutoTitleExpected,
    shouldShowAutoTitleAnimations,
    setIsAutoTitleAnimationsCompleted,
    autoTitle: autoTitle ?? '',
    isAutoTitleGenerated,
    isUserEditedTitle,
  };
};

type AutoTitleStoreType = {
  isAutoTitleAnimationsCompleted: boolean;
  setIsAutoTitleAnimationsCompleted: (
    isAutoTitleAnimationsCompleted: boolean
  ) => void;
};

const useAutoTitleStore = create<AutoTitleStoreType>(set => ({
  isAutoTitleAnimationsCompleted: false,
  setIsAutoTitleAnimationsCompleted: (
    isAutoTitleAnimationsCompleted: boolean
  ) => set({ isAutoTitleAnimationsCompleted }),
}));
