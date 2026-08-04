// Modals is a weird exception to the below rule because it's a collection of modals that are used in the share page. Long-term we will streamline our modal loading approach
// making this exception obsolete
import {
  LoggedInOnly,
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { SeasonalLaunchSharePageModal as SeasonalLaunchSharePageVariantsModal } from '@js/common/seasonal-launch-modal';
import { FtuxEnabledVariants } from '@js/common/seasonal-launch-modal/common/types';
import { useVideoContext } from '@js/common/video-player';
import ProcessErrorModal from '@js/components/share-video/process-error-modal';
import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { useCurrentUserIsOwner } from '@js/hooks/useCurrentUserIsOwner';
import { useUserProperty } from '@js/hooks/user/useUserProperty';
import { useGetSelectedWorkspaceWithFetchingStatus } from '@js/hooks/workspace';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { AnonymousShareGateDesktopModalAsync as AnonymousShareGateDesktopModal } from '@js/pages/share/anonymous-share-gate-modal/desktop/async';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { useHasAsgDesktopAssignment } from '@js/pages/share/anonymous-share-gate-modal/desktop/common/useHasAsgDesktopAssignment';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { AnonymousShareGateMobileModalAsync as AnonymousShareGateMobileModal } from '@js/pages/share/anonymous-share-gate-modal/mobile/async';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { useHasAsgMobileAssignment } from '@js/pages/share/anonymous-share-gate-modal/mobile/common/hooks';
import { Gates } from '@js/pages/share/common/constants/gates';

import { CalendlyModal } from '@js/pages/share/modals/calendly';
import { RecordingTimerPaywallGate } from '@js/pages/share/modals/recording-timer-paywall';
import React from 'react';
import { isMobile } from '@js/utilities/device';

import { hasParam } from '@js/utilities/url';

import { SEASONAL_LAUNCH_MODAL_VARIANTS } from '@loomhq/shared-utilities/constants/featureFlag';

import { WorkspaceSetting } from '@loomhq/shared-utilities/constants/settings';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';
import {
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_EDUCATION,
  WORKSPACE_PLAN_STARTER_FREE,
} from '@loomhq/shared-utilities/constants/workspacePlans';

import { useWorkspaceSetting } from '@js/hooks/workspaceSettings';

import { useGetIsFirstRecordingQuery } from './GetIsFirstRecording.generated';

import { SharePageProps } from '@js/pages/share/common/types';

export const Modals = ({
  fromRecorderParam,
  recordingLimitParam,
}: Pick<
  SharePageProps,
  'fromRecorderParam' | 'recordingLimitParam'
>): React.ReactElement => {
  const {
    video: {
      hasLoomBranding = true,
      videoWorkspacePlan: videoWorkspace,
      id: videoId,
    },
  } = useVideoContext();

  const currentUserIsOwner = useCurrentUserIsOwner({ videoId });

  const seasonalLaunchModalVariantsFlagIsEnabled = useFlagIsActivated({
    flag: SEASONAL_LAUNCH_MODAL_VARIANTS,
    activationValues: FtuxEnabledVariants,
  });

  const { loading: isFirstRecordingLoading, data: firstRecordingData } =
    useGetIsFirstRecordingQuery({
      variables: {
        fromRecorder: fromRecorderParam,
        videoId,
      },
    });
  const isFirstRecording =
    (!isFirstRecordingLoading &&
      firstRecordingData?.getCurrentUser?.__typename ===
        'GetCurrentUserPayload' &&
      firstRecordingData?.getCurrentUser?.user?.isFirstRecording) ??
    false;

  const { selectedWorkspace: workspace, isFetching: isWorkspaceLoading } =
    useGetSelectedWorkspaceWithFetchingStatus();

  const isLoggedIn = useIsCurrentUserLoggedIn();
  const isEducation = workspace?.type === WORKSPACE_PLAN_EDUCATION;
  const isOnboarding = hasParam('resume-anon-signup');

  const isPureTrial = useCurrentUserSelector(
    user => user.memberships?.[0]?.organization.is_pure_trial ?? false,
    false
  );

  const { loading: workspaceAllowsAiLoading, value: workspaceAllowsAi } =
    useWorkspaceSetting(WorkspaceSetting.ALLOWS_AI);

  const userManuallyOptOutOfAi = !workspaceAllowsAi;

  const isOnBusinessTrailWithoutAi =
    workspace?.type === WORKSPACE_PLAN_BUSINESS && isPureTrial;

  const {
    value: hasSeenSeasonalVariantsFtux,
    loading: loadingSeasonalModalVariantsFtux,
  } = useUserProperty(UserPropertyEnum.SEASONAL_LAUNCH_MODAL_VARIANTS);

  const isSeasonalVariantsLaunchEnabled =
    isLoggedIn &&
    currentUserIsOwner &&
    !isFirstRecordingLoading &&
    !isFirstRecording &&
    !isOnboarding &&
    !isWorkspaceLoading &&
    !isEducation &&
    workspace !== undefined &&
    !isOnBusinessTrailWithoutAi &&
    !workspaceAllowsAiLoading &&
    !userManuallyOptOutOfAi;

  const showSeasonalLaunchModalVariantsFtux =
    isSeasonalVariantsLaunchEnabled &&
    seasonalLaunchModalVariantsFlagIsEnabled &&
    !hasSeenSeasonalVariantsFtux &&
    !loadingSeasonalModalVariantsFtux;

  const showSeasonalLaunchTourVariantsFtux = false;

  const correctPlan =
    videoWorkspace === WORKSPACE_PLAN_STARTER_FREE ||
    videoWorkspace === WORKSPACE_PLAN_EDUCATION ||
    videoWorkspace === WORKSPACE_PLAN_BUSINESS;

  // TODO(WAP): Use LoggedOutOnly component when ready
  const meetsAsgMobilePrecheck =
    isMobile && !isLoggedIn && correctPlan && hasLoomBranding;
  const meetsAsgDesktopPrecheck =
    !isMobile && !isLoggedIn && correctPlan && hasLoomBranding;

  const hasAsgMobileAssignment = useHasAsgMobileAssignment({
    meetsAsgMobilePrecheck,
  });

  const hasAsgDesktopAssignment = useHasAsgDesktopAssignment({
    meetsAsgDesktopPrecheck,
  });

  return (
    <>
      <CalendlyModal />
      <ProcessErrorModal />

      {currentUserIsOwner ? (
        <RecordingTimerPaywallGate
          fromRecorderParam={fromRecorderParam}
          recordingLimitParam={recordingLimitParam}
        />
      ) : null}

      {hasAsgMobileAssignment ? (
        <AnonymousShareGateMobileModal showModal={true} />
      ) : null}
      {hasAsgDesktopAssignment ? (
        <AnonymousShareGateDesktopModal showModal={true} gate={Gates.ASG} />
      ) : null}

      {showSeasonalLaunchModalVariantsFtux ||
      showSeasonalLaunchTourVariantsFtux ? (
        <LoggedInOnly>
          <SeasonalLaunchSharePageVariantsModal
            workspace={workspace}
            skipModal={
              !showSeasonalLaunchModalVariantsFtux &&
              showSeasonalLaunchTourVariantsFtux
            }
          />
        </LoggedInOnly>
      ) : null}
    </>
  );
};
