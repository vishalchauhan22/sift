import {
  INTELLIGENCE_TIMEOUT_MS,
  isTerminalStatus,
  resolveIntelligenceStatus,
} from '@js/common/ai/utils';
import { useCurrentUserSelector } from '@js/common/current-user';

import { useVideoPasswordContext } from '@js/common/video-password';
import { useVideoContext } from '@js/common/video-player';
import { useEffect, useRef, useState } from 'react';

import { IntelligenceStatusType } from '@js/globalTypes.generated';

import {
  AutoSummaryStatusChangedDocument,
  AutoSummaryStatusChangedSubscription,
} from './autoSummaryStatusChanged.generated';
import {
  GetAutoSummaryStatusQuery,
  useGetAutoSummaryStatusQuery,
} from './getAutoSummaryStatus.generated';
import { useGetVideoDescriptionQuery } from './getVideoDescription.generated';

const selectAutoSummaryAndStatus = (
  data: GetAutoSummaryStatusQuery | undefined,
  loading: boolean,
  error: Error | undefined,
  hasTimedOut: boolean
): {
  autoSummary: string | null;
  autoSummaryStatus: IntelligenceStatusType | null;
} => {
  if (
    !data ||
    loading ||
    error ||
    data?.getAutoFeatureStatuses?.__typename !== 'AutoFeatureStatuses'
  ) {
    return {
      autoSummary: null,
      autoSummaryStatus: null,
    };
  }

  const { autoDescription, autoDescriptionStatus } =
    data.getAutoFeatureStatuses;
  return {
    autoSummary: autoDescription,
    autoSummaryStatus: resolveIntelligenceStatus(
      autoDescriptionStatus,
      hasTimedOut,
      IntelligenceStatusType.User
    ),
  };
};

export const useAutoSummaryAi = ({
  isOwnerAfterRecording,
}: {
  isOwnerAfterRecording: boolean;
}): {
  autoSummary: string | null;
  autoSummaryStatus: IntelligenceStatusType | null;
  hasAccess: boolean;
  isExpected: boolean;
  isWaiting: boolean;
} => {
  const {
    video: { id: videoId },
  } = useVideoContext();
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const { password } = useVideoPasswordContext();

  const isAutoSummarySettingEnabled = useCurrentUserSelector(
    user => user.videoSettings?.auto_summary !== false,
    false
  );

  const aiAccess = useCurrentUserSelector(user => user.aiAccess, null);
  const hasAccess = Boolean(aiAccess?.autoSummaries);

  // this indicates if all the user-related settings and flags are allowing the auto summary to be generated
  const isExpected = Boolean(isAutoSummarySettingEnabled && hasAccess);

  const unsubscribeRef = useRef<() => void>();

  const { data, subscribeToMore, loading, error } =
    useGetAutoSummaryStatusQuery({
      variables: {
        videoId,
        password,
      },
      skip: !videoId || !hasAccess,
      onCompleted: completeData => {
        if (
          completeData.getAutoFeatureStatuses?.__typename ===
            'AutoFeatureStatuses' &&
          isTerminalStatus(
            completeData.getAutoFeatureStatuses.autoDescriptionStatus
          )
        ) {
          // if we receive a terminal status, then we no longer have an active subscription
          // so we mark this as undefined to avoid marking a timeout later
          unsubscribeRef.current = undefined;
        }
      },
    });

  const { refetch: refetchVideoDescription } = useGetVideoDescriptionQuery({
    variables: {
      videoId,
      password,
    },
    skip: !videoId,
  });

  useEffect(() => {
    unsubscribeRef.current =
      subscribeToMore<AutoSummaryStatusChangedSubscription>({
        document: AutoSummaryStatusChangedDocument,
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

          if (isTerminalStatus(autoFeatureStatuses.autoDescriptionStatus)) {
            // if we receive a terminal status, then we no longer have an active subscription
            // so we mark this as undefined to avoid marking a timeout later
            unsubscribeRef.current = undefined;
          }

          // ensures that the video description in the apollo cache is updated when new data is received
          refetchVideoDescription();

          return Object.assign({}, prev, {
            getAutoFeatureStatuses: {
              ...prev.getAutoFeatureStatuses,
              ...autoFeatureStatuses,
            },
          });
        },
      });
  }, [subscribeToMore, videoId, refetchVideoDescription]);

  const { autoSummary, autoSummaryStatus } = selectAutoSummaryAndStatus(
    data,
    loading,
    error,
    hasTimedOut
  );

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

  const isWaiting =
    isExpected &&
    isOwnerAfterRecording &&
    (!autoSummaryStatus ||
      autoSummaryStatus === IntelligenceStatusType.Pending);

  return {
    autoSummary,
    autoSummaryStatus,
    hasAccess,
    isExpected,
    isWaiting,
  };
};
