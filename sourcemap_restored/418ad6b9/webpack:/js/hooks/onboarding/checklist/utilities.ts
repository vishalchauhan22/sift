import { GET_STARTED_CHECKLIST_COMPLETED } from '@js/constants/events';

import { LOOMS_PAGE, SHARE_PAGE } from '@js/constants/routes';

import { GetMostRecentVideoV2Query } from '@js/common/ExpChecklistV2/GetMostRecentVideoV2.generated';

import { ChecklistV2DisplayContext } from '@js/common/ExpChecklistV2/types';

import {
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { useGetUserWorkspaceMembershipsCountsQuery } from '@js/components/looms/my-library/GetUserWorkspaceMembershipsCounts.generated';

import { useShouldShowTrigger } from '@js/hooks/triggers';
import { useCompleteTrigger } from '@js/hooks/useCompleteTrigger';
import { useMatchSmallDesktop } from '@js/hooks/useMatchMedia';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import * as analytics from '@js/utilities/analytics';
import { platformDetails } from '@js/utilities/device';

import {
  ADD_TEAMMATE,
  DOWNLOAD_RECORDER,
  FIRST_VIDEO_RECORDING,
  MAX_ACCOUNT_AGE,
} from '@loomhq/shared-utilities/constants/checklist';
import { ORG_ROLE_VIEWER } from '@loomhq/shared-utilities/constants/organizationRoles';
import { SHOW_GET_STARTED_CHECKLIST } from '@loomhq/shared-utilities/constants/triggers';

import { WorkspaceTotalCounts } from '@js/globalTypes.generated';

import { useCurrentChecklistTask, useGetLatestVideo } from './hooks';

import { AllChecklistTasks, ChecklistLocationToRender } from './types';
import { useExpIntegratedChecklistWithUseCases } from '@js/common/ExpChecklistV4/useExpIntegratedChecklistWithUseCases';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships/use-get-workspace-memberships';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const CHECKLIST_V3_MINIMIZED_IN_EMBEDDED_LIBRARY =
  'checklist_v3_minimized_in_embedded_library';

interface ChecklistDisplayState {
  checklistLocationToRender: ChecklistLocationToRender[];
  shouldShowOnboardingChecklist: boolean;
}

export function computeChecklistDisplayState({
  isSmallDesktop,
  latestVideo,
  totalMemberCreatedVideos,
  totalPersonalFolders,
  totalScreenshots,
  currentPath,
  shouldShowChecklistOrCompleteAnimation,
  isViewer,
  isExpIntegratedChecklist,
  currentTaskId,
  minimizedInEmbeddedLibrary,
}: {
  isSmallDesktop: boolean;
  latestVideo?: NonNullable<GetMostRecentVideoV2Query['recentUserVideos']>[0];
  totalMemberCreatedVideos: number;
  totalPersonalFolders: number;
  totalScreenshots: number;
  currentPath: string;
  shouldShowChecklistOrCompleteAnimation: boolean;
  isViewer: boolean;
  isExpIntegratedChecklist: boolean;
  currentTaskId: AllChecklistTasks | null;
  minimizedInEmbeddedLibrary: boolean;
}): ChecklistDisplayState {
  let checklistLocationToRender: ChecklistLocationToRender[] = [];
  let shouldShowOnboardingChecklist = false;
  const isOnSharePage = currentPath.startsWith(SHARE_PAGE);

  const preconditions =
    platformDetails.type === 'desktop' &&
    !isViewer &&
    shouldShowChecklistOrCompleteAnimation &&
    !isOnSharePage;

  if (!preconditions) {
    return {
      checklistLocationToRender: [],
      shouldShowOnboardingChecklist: false,
    };
  }

  const isInLibrary = currentPath.startsWith(LOOMS_PAGE);

  shouldShowOnboardingChecklist = preconditions;

  const hasContent =
    Boolean(latestVideo) ||
    totalMemberCreatedVideos > 0 ||
    totalPersonalFolders > 0 ||
    totalScreenshots > 0;

  if (isExpIntegratedChecklist) {
    // If the user has not downloaded the recorder or recorded their first video,
    // show the checklist in the embedded library, as these are the two screens that we have for
    // the integrated checklist
    if (
      isInLibrary &&
      (currentTaskId === DOWNLOAD_RECORDER ||
        currentTaskId === FIRST_VIDEO_RECORDING)
    ) {
      checklistLocationToRender = [
        ChecklistLocationToRender.EmptyState,
        ChecklistLocationToRender.Sidebar,
      ];
    } else if (isInLibrary && currentTaskId === ADD_TEAMMATE) {
      checklistLocationToRender = [
        ChecklistLocationToRender.TriggerLibraryInviteBanner,
        ChecklistLocationToRender.Sidebar,
      ];
    } else {
      // Otherwise, the share task is shown in the mini checklist on the side
      checklistLocationToRender = [ChecklistLocationToRender.Sidebar];
    }
  } else {
    if (isSmallDesktop || !isInLibrary) {
      checklistLocationToRender = [ChecklistLocationToRender.Sidebar];
    } else {
      // we must be in a large desktop, AND we are in library
      if (minimizedInEmbeddedLibrary) {
        checklistLocationToRender = [ChecklistLocationToRender.Sidebar];
      } else {
        if (hasContent) {
          checklistLocationToRender = [
            ChecklistLocationToRender.EmbeddedInLibrary,
          ];
        } else {
          checklistLocationToRender = [ChecklistLocationToRender.EmptyState];
        }
      }
    }
  }
  return {
    checklistLocationToRender,
    shouldShowOnboardingChecklist,
  };
}

export function useChecklistVisibilityAndDismiss(): {
  showChecklistCompleteAnimation: boolean;
  shouldShowOnboardingChecklist: boolean;
  dynamicCounts: any;
  checklistCallback: () => void;
  checklistLocationToRender: ChecklistLocationToRender[];
} {
  const { selectedWorkspace: workspace } = useGetWorkspaceMemberships();
  const { isExpIntegratedChecklistWithUseCases } =
    useExpIntegratedChecklistWithUseCases();
  const completeTrigger = useCompleteTrigger();
  const isLoggedIn = useIsCurrentUserLoggedIn();
  // The checklist trigger is complete when we should NOT show the checklist
  const isChecklistTriggerComplete = !useShouldShowTrigger(
    SHOW_GET_STARTED_CHECKLIST
  );
  const isSmallDesktop = useMatchSmallDesktop();
  const counts = workspace?.counts;

  const isViewer = workspace?.memberRole === ORG_ROLE_VIEWER;

  const userCreatedAt = useCurrentUserSelector(
    user => user.createdAt,
    new Date()
  );

  const currentTaskId = useCurrentChecklistTask();

  const [minimizedInEmbeddedLibrary, _] = useLocalStorageState(
    CHECKLIST_V3_MINIMIZED_IN_EMBEDDED_LIBRARY,
    {
      defaultValue: false,
    }
  );

  const [isLocalChecklistComplete, setIsLocalChecklistComplete] =
    useState<boolean>(false);

  const isChecklistComplete =
    isChecklistTriggerComplete || isLocalChecklistComplete;

  const { latestVideo } = useGetLatestVideo({
    skip: isChecklistComplete,
  });

  const location = useLocation();

  const shouldPlayCompleteAnimation = !isLocalChecklistComplete;
  const [didPlayAnimation, setDidPlayAnimation] = useState(false);
  const canPlayCompleteAnimation =
    !isChecklistComplete && currentTaskId === null;

  // The workspace memberships query is used to determine how many videos a
  // user has recorded in their workspace
  const { data: workspaceData, refetch: refetchWorkspaceData } =
    useGetUserWorkspaceMembershipsCountsQuery({
      fetchPolicy: 'no-cache',
    });

  const checklistCallback = () => {
    refetchWorkspaceData();
    setDidPlayAnimation(true);
    setIsLocalChecklistComplete(true);
    completeTrigger(SHOW_GET_STARTED_CHECKLIST);

    analytics.track(GET_STARTED_CHECKLIST_COMPLETED, {
      displayContext: ChecklistV2DisplayContext.Full,
    });
  };

  // check if the user is eligible for the checklist
  const currentDate = new Date();
  const daysSinceAccountCreation = Math.floor(
    (currentDate.getTime() - userCreatedAt.getTime()) / ONE_DAY_MS
  );

  useEffect(() => {
    if (
      isLoggedIn &&
      !isChecklistTriggerComplete &&
      daysSinceAccountCreation > MAX_ACCOUNT_AGE
    ) {
      completeTrigger(SHOW_GET_STARTED_CHECKLIST);
    }
  }, [
    isChecklistTriggerComplete,
    completeTrigger,
    daysSinceAccountCreation,
    isLoggedIn,
  ]);

  // See if the user has any content in their workspace
  const memberships = workspaceData?.userWorkspaceMemberships;
  const dynamicCounts: Partial<WorkspaceTotalCounts> | undefined =
    memberships?.find(ws => ws?.organization.id === workspace?.id)?.organization
      ?.counts;

  const totalMemberCreatedVideos = dynamicCounts
    ? dynamicCounts.videos?.total_member_created_videos || 0
    : (counts as any)?.videos?.total_member_created_videos || 0;

  const totalPersonalFolders =
    (counts as any)?.folders?.total_personal_folders || 0;
  const totalScreenshots =
    (counts as any)?.screenshots?.total_workspace_screenshots || 0;

  const { checklistLocationToRender, shouldShowOnboardingChecklist } =
    computeChecklistDisplayState({
      isSmallDesktop,
      latestVideo,
      totalMemberCreatedVideos,
      totalPersonalFolders,
      totalScreenshots,
      currentPath: location.pathname,
      shouldShowChecklistOrCompleteAnimation:
        !isChecklistComplete || (!didPlayAnimation && canPlayCompleteAnimation),
      isViewer,
      minimizedInEmbeddedLibrary,
      isExpIntegratedChecklist: isExpIntegratedChecklistWithUseCases,
      currentTaskId,
    });

  return {
    shouldShowOnboardingChecklist,
    showChecklistCompleteAnimation:
      canPlayCompleteAnimation && shouldPlayCompleteAnimation,
    dynamicCounts,
    checklistCallback,
    checklistLocationToRender,
  };
}
