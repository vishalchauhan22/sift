import { useGetLatestVideoSubscription } from '@js/common/ExpChecklistV2/GetLatestVideo.generated';

import {
  GetMostRecentVideoV2Query,
  useGetMostRecentVideoV2Query,
} from '@js/common/ExpChecklistV2/GetMostRecentVideoV2.generated';
import { endDate } from '@js/common/ExpChecklistV2/common/date';
import { ChecklistV2DisplayContext } from '@js/common/ExpChecklistV2/types';
import {
  findNextActiveTask,
  createTasks,
} from '@js/common/ExpChecklistV2/utilities';
import {
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { useGetCheckListStatus } from '@js/hooks/getStartedChecklist';
import { useShouldShowTrigger } from '@js/hooks/triggers';
import { useInvitationCapabilities } from '@js/hooks/useInvitationCapabilities';

import { useEffect } from 'react';

import create from 'zustand';

import { SHOW_GET_STARTED_CHECKLIST } from '@loomhq/shared-utilities/constants/triggers';

import { AllChecklistTasks } from './types';

import type { ApolloError } from '@apollo/client';
import { useExpIntegratedChecklistWithUseCases } from '@js/common/ExpChecklistV4/useExpIntegratedChecklistWithUseCases';

type ChecklistTaskStore = {
  openTask: AllChecklistTasks | null;
  setOpenTask: (task: AllChecklistTasks | null) => void;
};

export const useChecklistTaskStore = create<ChecklistTaskStore>(set => ({
  openTask: null,
  setOpenTask: task => set({ openTask: task }),
}));

export function useCurrentChecklistTask(): AllChecklistTasks | null {
  // The checklist trigger is complete when we should NOT show the checklist
  const isChecklistTriggerComplete = !useShouldShowTrigger(
    SHOW_GET_STARTED_CHECKLIST
  );

  const checklistStatus = useGetCheckListStatus();
  const { showInviteButton, loading: isInvitationCapabilitiesLoading } =
    useInvitationCapabilities();

  const { isExpIntegratedChecklistWithUseCases } =
    useExpIntegratedChecklistWithUseCases();

  if (isChecklistTriggerComplete) {
    return null;
  }

  const currentTaskId: AllChecklistTasks | null =
    findNextActiveTask(
      createTasks({
        checklistStatus,
        displayContext: ChecklistV2DisplayContext.Full,
        isExpIntegratedChecklist: isExpIntegratedChecklistWithUseCases,
        hasInviteCapabilities:
          isInvitationCapabilitiesLoading || showInviteButton,
      })
    )?.id || null;

  return currentTaskId;
}

// Because of limitations of GQL subscriptions
// for fetching full video details (i.e. subscription resolver
// contexts do not have access to the aclContext, which is used
// sub-field resolvers), we still need to a standard GQL query
// to fetch the most recent video using a query.
export const useGetLatestVideo = (
  options: {
    skip?: boolean;
  } = { skip: false }
): {
  error: ApolloError | undefined;
  loading: boolean;
  latestVideo: NonNullable<GetMostRecentVideoV2Query['recentUserVideos']>[0];
} => {
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const userCreatedAt = useCurrentUserSelector(
    user => user.createdAt,
    new Date()
  ).toISOString();

  const skip = !isLoggedIn || options.skip;

  const {
    data: queryData,
    loading: isMostRecentVideoQueryLoading,
    error: mostRecentVideoQueryError,
    refetch: refetchMostRecentVideo,
  } = useGetMostRecentVideoV2Query({
    variables: {
      startDate: userCreatedAt,
      endDate: endDate.toISOString(),
      limit: 1,
      offset: 0,
    },
    // We want to fetch fresh data from the network
    // since we rely on the subscription to alert us
    // to a video being created.
    fetchPolicy: 'network-only',
    skip,
  });

  const {
    data: subscriptionData,
    loading: isGetLatestVideoSubscriptionLoading,
    error: getLatestVideoSubscriptionError,
  } = useGetLatestVideoSubscription({
    skip,
  });

  const hasReceivedVideoRecordedEvent = Boolean(
    subscriptionData?.getLatestVideoSubscription
  );

  // Latest video data is from the useGetMostRecentVideoQuery
  // because the subscription cannot return full RegularUserVideo data.
  // See function comment above.
  const latestVideo = queryData?.recentUserVideos
    ? queryData?.recentUserVideos[0]
    : null;

  useEffect(() => {
    if (hasReceivedVideoRecordedEvent && !latestVideo) {
      refetchMostRecentVideo();
    }
  }, [hasReceivedVideoRecordedEvent, latestVideo, refetchMostRecentVideo]);

  return {
    // TODO: For now, we only use errors as a condition; if
    // we want to handle specific errors, we should accommodate
    // both possible errors instead of using ||.
    error: getLatestVideoSubscriptionError || mostRecentVideoQueryError,
    loading:
      isGetLatestVideoSubscriptionLoading || isMostRecentVideoQueryLoading,
    latestVideo,
  };
};
