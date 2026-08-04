import { useVideoPasswordContext } from '@js/common/video-password';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  AutoChapterStatusesType,
  IntelligenceStatusType,
} from '@js/globalTypes.generated';

import {
  INTELLIGENCE_TIMEOUT_MS,
  isTerminalStatus,
  resolveChapterStatus,
  resolveIntelligenceStatus,
} from '../utils';
import { useGetAutoFeatureStatusesQuery } from './GetAutoFeatureStatuses.generated';
import {
  AutoFeatureStatusChangedDocument,
  AutoFeatureStatusChangedSubscription,
} from './autoFeatureStatusesChanged.generated';

type AutoFeatureStatusesReturnType = {
  autoTitleStatus: IntelligenceStatusType | null;
  autoDescriptionStatus: IntelligenceStatusType | null;
  autoChaptersStatus: AutoChapterStatusesType | null;
  autoTasksStatus: IntelligenceStatusType | null;
  autoTasksCount: number;
  hasFillerWordRemovalEnabled: boolean;
  hasSilenceRemovalEnabled: boolean;
  numberOfFillerWordsTrimmed: number;
  numberOfFillerWordsPlusTrimmed: number;
  secondsOfSilenceTrimmed: number;
  isLoading: boolean;
  hasError: boolean;
};

const allFeaturesCompleted = ({
  autoTitleStatus,
  autoDescriptionStatus,
  autoChaptersStatus,
  autoTasksStatus,
}: {
  autoTitleStatus: IntelligenceStatusType | null;
  autoDescriptionStatus: IntelligenceStatusType | null;
  autoChaptersStatus: AutoChapterStatusesType | null;
  autoTasksStatus: IntelligenceStatusType | null;
}): boolean => {
  return (
    isTerminalStatus(autoTitleStatus) &&
    isTerminalStatus(autoDescriptionStatus) &&
    isTerminalStatus(autoChaptersStatus) &&
    isTerminalStatus(autoTasksStatus)
  );
};

export const useAutoFeatureStatuses = ({
  videoId,
  skip = false,
}: {
  videoId: string;
  skip?: boolean;
}): AutoFeatureStatusesReturnType => {
  const { password } = useVideoPasswordContext();
  const unsubscribeRef = useRef<() => void>();
  const [hasError, setHasError] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  const { data, subscribeToMore, loading } = useGetAutoFeatureStatusesQuery({
    variables: {
      videoId,
      password,
    },
    skip,
    onCompleted: completeData => {
      if (
        completeData.getAutoFeatureStatuses?.__typename ===
        'AutoFeatureStatuses'
      ) {
        if (allFeaturesCompleted(completeData.getAutoFeatureStatuses)) {
          // if all features are completed, then we no longer have an active subscription
          // so we mark this as undefined to avoid marking a timeout later
          unsubscribeRef.current = undefined;
        }
      } else {
        setHasError(true);
      }
    },
    onError: () => {
      setHasError(true);
    },
  });

  useEffect(() => {
    unsubscribeRef.current =
      subscribeToMore<AutoFeatureStatusChangedSubscription>({
        document: AutoFeatureStatusChangedDocument,
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

          if (allFeaturesCompleted(autoFeatureStatuses)) {
            // if all features are completed, then we no longer have an active subscription
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

  const returnStatuses = useMemo(() => {
    if (data?.getAutoFeatureStatuses?.__typename !== 'AutoFeatureStatuses') {
      return {
        autoTitleStatus: null,
        autoDescriptionStatus: null,
        autoChaptersStatus: null,
        autoTasksStatus: null,
        autoTasksCount: 0,
        hasFillerWordRemovalEnabled: false,
        hasSilenceRemovalEnabled: false,
        numberOfFillerWordsTrimmed: 0,
        numberOfFillerWordsPlusTrimmed: 0,
        secondsOfSilenceTrimmed: 0,
      };
    }

    const {
      autoTitleStatus,
      autoDescriptionStatus,
      autoChaptersStatus,
      autoTasksStatus,
      autoTasksCount,
      hasFillerWordRemovalEnabled,
      hasSilenceRemovalEnabled,
      numberOfFillerWordsTrimmed,
      numberOfFillerWordsPlusTrimmed,
      secondsOfSilenceTrimmed,
    } = data.getAutoFeatureStatuses;

    return {
      autoTitleStatus: resolveIntelligenceStatus(
        autoTitleStatus,
        hasTimedOut,
        IntelligenceStatusType.User
      ),
      autoDescriptionStatus: resolveIntelligenceStatus(
        autoDescriptionStatus,
        hasTimedOut,
        IntelligenceStatusType.User
      ),
      autoChaptersStatus: resolveChapterStatus(
        autoChaptersStatus,
        hasTimedOut,
        AutoChapterStatusesType.Failure
      ),
      autoTasksStatus: resolveIntelligenceStatus(
        autoTasksStatus,
        hasTimedOut,
        IntelligenceStatusType.User
      ),
      autoTasksCount: autoTasksCount ?? 0,
      hasFillerWordRemovalEnabled,
      hasSilenceRemovalEnabled,
      numberOfFillerWordsTrimmed: numberOfFillerWordsTrimmed ?? 0,
      numberOfFillerWordsPlusTrimmed: numberOfFillerWordsPlusTrimmed ?? 0,
      secondsOfSilenceTrimmed: secondsOfSilenceTrimmed ?? 0,
    };
  }, [data, hasTimedOut]);

  return {
    ...returnStatuses,
    isLoading: loading && !hasTimedOut,
    hasError,
  };
};
