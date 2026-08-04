import {
  isTerminalStatus,
  resolveIntelligenceStatus,
} from '@js/common/ai/utils';
import { useCurrentUserSelector } from '@js/common/current-user';

import { useVideoPasswordContext } from '@js/common/video-password';
import { useVideoContext } from '@js/common/video-player';
import { useEffect, useRef, useState } from 'react';

import { IntelligenceStatusType } from '@js/globalTypes.generated';

import {
  AutoTasksStatusChangedDocument,
  AutoTasksStatusChangedSubscription,
} from './autoTasksStatusChanged.generated';
import {
  GetAutoTasksStatusQuery,
  useGetAutoTasksStatusQuery,
} from './getAutoTasksStatus.generated';

const selectAutoTasksStatus = (
  data: GetAutoTasksStatusQuery | undefined,
  loading: boolean,
  error: Error | undefined,
  hasTimedOut: boolean
) => {
  if (
    !data ||
    loading ||
    error ||
    data?.getAutoFeatureStatuses?.__typename !== 'AutoFeatureStatuses'
  ) {
    return null;
  }

  const { autoTasksStatus } = data.getAutoFeatureStatuses;
  return resolveIntelligenceStatus(
    autoTasksStatus,
    hasTimedOut,
    IntelligenceStatusType.User
  );
};

const AUTO_TASKS_TIMEOUT_MS = 40_000;
export const useAutoTasksAi = ({
  isOwnerAfterRecording,
}: {
  isOwnerAfterRecording: boolean;
}): {
  status: IntelligenceStatusType | null;
  hasAccess: boolean;
  isExpected: boolean;
  isWaiting: boolean;
} => {
  const {
    video: { id: videoId },
  } = useVideoContext();
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const { password } = useVideoPasswordContext();

  const isAutoTasksSettingEnabled = useCurrentUserSelector(
    user => user.videoSettings?.auto_tasks !== false,
    false
  );

  const aiAccess = useCurrentUserSelector(user => user.aiAccess, null);
  const hasAccess = Boolean(aiAccess?.autoTasks);
  // this indicates if all the user-related settings and flags are allowing the auto tasks to be generated
  const isExpected = Boolean(isAutoTasksSettingEnabled && hasAccess);

  const unsubscribeRef = useRef<() => void>();

  const { data, subscribeToMore, loading, error } = useGetAutoTasksStatusQuery({
    variables: {
      videoId,
      password,
    },
    skip: !videoId || !hasAccess,
    onCompleted: completeData => {
      if (
        completeData.getAutoFeatureStatuses?.__typename ===
          'AutoFeatureStatuses' &&
        isTerminalStatus(completeData.getAutoFeatureStatuses.autoTasksStatus)
      ) {
        // if we receive a terminal status, then we no longer have an active subscription
        // so we mark this as undefined to avoid marking a timeout later
        unsubscribeRef.current = undefined;
      }
    },
  });

  useEffect(() => {
    unsubscribeRef.current =
      subscribeToMore<AutoTasksStatusChangedSubscription>({
        document: AutoTasksStatusChangedDocument,
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

          if (isTerminalStatus(autoFeatureStatuses.autoTasksStatus)) {
            // if we receive a terminal status, then we no longer have an active subscription
            // so we mark this as undefined to avoid marking a timeout later
            unsubscribeRef.current = undefined;
          }

          return Object.assign({}, prev, {
            getAutoFeatureStatuses: {
              ...prev.getAutoFeatureStatuses,
              ...autoFeatureStatuses,
            },
          });
        },
      });
  }, [subscribeToMore, videoId]);

  const status = selectAutoTasksStatus(data, loading, error, hasTimedOut);

  const isWaiting =
    isExpected &&
    isOwnerAfterRecording &&
    (!status || status === IntelligenceStatusType.Pending);

  // unsubscribe if it takes too long to receive data
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (unsubscribeRef.current) {
        setHasTimedOut(true);
        unsubscribeRef.current();
      }
    }, AUTO_TASKS_TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, []);

  const isWaitingAndNotTimedOut = isWaiting && !hasTimedOut;

  return {
    status,
    hasAccess,
    isExpected,
    isWaiting: isWaitingAndNotTimedOut,
  };
};
