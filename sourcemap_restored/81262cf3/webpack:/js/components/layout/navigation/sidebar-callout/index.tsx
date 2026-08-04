import { devToolsEnabled } from '@js/constants/devtools';
import {
  AUTO_JOIN_CALLOUT,
  GET_STARTED_CHECKLIST_CALLOUT,
  INVITE_CALLOUT,
  JOIN_TEAM_CALLOUT,
  SIDEBAR_CALLOUT_PARAM,
} from '@js/constants/devtools-params';
import { INVITE_CALLOUT_DISMISSED } from '@js/constants/localStorage';

import { ChecklistV2Controller } from '@js/common/ExpChecklistV2/';
import { useCurrentUserSelector } from '@js/common/current-user';
import { useHasSomeScopes } from '@js/hooks/useHasScopes';
import { useWorkspaceDestinationStateData } from '@js/hooks/useWorkspaceDestinationStateData';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';
import React, { Suspense, useMemo } from 'react';
import { platformDetails } from '@js/utilities/device';

import {
  INVITE_ADMIN_ACTION,
  INVITE_CREATOR_ACTION,
  INVITE_CREATOR_LITE_ACTION,
  INVITE_VIEWER_ACTION,
} from '@loomhq/shared-utilities/constants/scopes';
import { WorkspaceSetting } from '@loomhq/shared-utilities/constants/settings';
import { REQUEST_STATUSES } from '@loomhq/shared-utilities/constants/workspaceJoinRequests';
import { useSuggestedWorkspace } from '@js/components/layout/navigation/useSuggestedWorkspace';

import { useWorkspaceCounts } from '@js/hooks/useCounts';

import { useMatchMobileOnly } from '@js/hooks/useMatchMedia';

import { useWorkspaceSetting } from '@js/hooks/workspaceSettings';

import { useLocalWorkspaceState } from '@js/utilities/local-workspace-state';
import {
  useAutojoinBannerState,
  useAutojoinTimedDismissalState,
  useSuggestedWorkspaceBannerState,
  useSuggestedWorkspaceTimedDismissalState,
} from '@js/utilities/localStorage/suggestedWorkspace';
import { useTimedDismissal } from '@js/utilities/localStorage/utils';

import { reactLazyRetry } from '../../../../utilities/reactLazyRetry';
import { DevToolCallout } from '../devtool-callout';
import { getNavigationScopes } from './getNavigationScopes';
import { useChecklistVisibilityAndDismiss } from '@js/hooks/onboarding/checklist/utilities';
import { ChecklistLocationToRender } from '@js/hooks/onboarding/checklist/types';

const JoinTeamSidebarCallout = reactLazyRetry(
  () =>
    import(
      /* webpackChunkName: "JoinTeamsSidebarCallout" */ '../JoinTeamSidebarCallout'
    )
);
const AutojoinCallout = reactLazyRetry(
  () => import(/* webpackChunkName: "AutoJoinCallout" */ '../AutoJoinCallout')
);

const InviteCallout = reactLazyRetry(() =>
  import(/* webpackChunkName: "InviteCallout" */ '../invite-callout').then(
    module => ({ default: module.InviteCallout })
  )
);

export const CALLOUTS = {
  INVITE_CALLOUT,
  GET_STARTED_CHECKLIST_CALLOUT,
  JOIN_TEAM_CALLOUT,
  AUTO_JOIN_CALLOUT,
};

export function SidebarCallout({
  displayMode,
  setShowInviteToolTip,
}: {
  displayMode: 'COLLAPSED' | 'LARGE' | 'COMPACT';
  setShowInviteToolTip: (show: boolean) => void;
}): JSX.Element | null {
  const suggestedWorkspace = useSuggestedWorkspace();
  const callout = useSidebarCallout();

  const suggestion = suggestedWorkspace?.result?.data?.result;
  const isSuggestionReady =
    suggestedWorkspace?.result?.called && !suggestedWorkspace?.result?.loading;

  const workspaceDestinationStateData = useWorkspaceDestinationStateData();
  const workspaceDestinationState =
    workspaceDestinationStateData?.workspace_state;
  const counts = useWorkspaceCounts();
  const totalPersonalActiveVideos =
    counts?.videos?.total_personal_active_videos;

  switch (callout) {
    case CALLOUTS.INVITE_CALLOUT:
      return (
        <Suspense fallback={null}>
          <InviteCallout
            displayMode={displayMode}
            setShowInviteToolTip={setShowInviteToolTip}
          />
        </Suspense>
      );

    case CALLOUTS.GET_STARTED_CHECKLIST_CALLOUT:
      // We only want to show the extension onboarding tutorial
      // if user has the chrome extension installed and an empty
      // WorkspaceDestinationState and is on the empty library page
      // and has no videos.
      if (
        workspaceDestinationState === undefined ||
        totalPersonalActiveVideos === undefined
      ) {
        return null;
      }

      return (
        <Suspense fallback={null}>
          <ChecklistV2Controller
            inSidebar={true}
            isCollapsed={displayMode === 'COLLAPSED'}
          />
        </Suspense>
      );

    case CALLOUTS.JOIN_TEAM_CALLOUT: {
      if (devToolsEnabled) {
        if (!isSuggestionReady) {
          return null;
        }

        if (!suggestion) {
          return (
            <DevToolCallout displayMode={displayMode}>
              Cannot display join team callout because there is no suggested
              workspace
            </DevToolCallout>
          );
        }
      }

      return (
        <Suspense fallback={null}>
          <JoinTeamSidebarCallout
            displayMode={displayMode}
            requestPending={
              (suggestion as any).requestStatus === REQUEST_STATUSES.PENDING
            }
            autoJoin={(suggestion as any).autoJoin}
            workspace={(suggestion as any).workspace}
          />
        </Suspense>
      );
    }
    case CALLOUTS.AUTO_JOIN_CALLOUT: {
      if (devToolsEnabled) {
        if (!isSuggestionReady) {
          return null;
        }

        if (!suggestion) {
          return (
            <DevToolCallout displayMode={displayMode}>
              Cannot display autojoin callout because there is no suggested
              workspace
            </DevToolCallout>
          );
        }
      }

      return (
        <Suspense fallback={null}>
          <AutojoinCallout
            displayMode={displayMode}
            workspace={(suggestion as any).workspace}
          />
        </Suspense>
      );
    }
    default:
      return null;
  }
}

const urlParams = new URLSearchParams(window.location.search);

function shouldShowJoinTeamBanner(suggestion) {
  return (
    suggestion?.workspace &&
    !suggestion.hasPendingInvitation &&
    !suggestion.isCurrentUserMember &&
    suggestion.requestStatus !== REQUEST_STATUSES.APPROVED
  );
}

function useShouldJoinTeamBannerBeTimeDismissed() {
  const [manualDismissed] = useSuggestedWorkspaceBannerState();

  const [timeDismissal, setTimedDismissal] =
    useSuggestedWorkspaceTimedDismissalState();

  return useTimedDismissal({
    manualDismissed,
    timeDismissal,
    setTimedDismissal,
  });
}

function useHasAutojoin() {
  const { value: domainSettings = {} } = useWorkspaceSetting(
    WorkspaceSetting.WORKSPACE_DOMAIN_JOIN_INFO
  );
  const hasAutoJoin = useMemo(
    () =>
      Object.values(domainSettings).some(
        ({ autoJoin }: any) => autoJoin ?? false
      ),
    [domainSettings]
  );

  return hasAutoJoin;
}

function useShouldAutojoinBannerBeTimeDismissed() {
  const [manualDismissed] = useAutojoinBannerState();
  const [timeDismissal, setTimedDismissal] = useAutojoinTimedDismissalState();

  return useTimedDismissal({
    manualDismissed,
    timeDismissal,
    setTimedDismissal,
  });
}

function shouldShowAutojoinCallout(suggestion, currentWorkspace) {
  return (
    suggestion?.workspace &&
    suggestion.workspace.id === currentWorkspace?.id &&
    suggestion.isCurrentUserMember
  );
}

type SidebarCalloutType =
  | 'INVITE_CALLOUT'
  | 'GET_STARTED_CHECKLIST_CALLOUT'
  | 'JOIN_TEAM_CALLOUT'
  | 'AUTO_JOIN_CALLOUT'
  | null;

export function useSidebarCallout(): SidebarCalloutType {
  const isMobileScreenSize = useMatchMobileOnly();
  const suggestedWorkspace = useSuggestedWorkspace();
  const suggestedWorkspaceDismissed = useShouldJoinTeamBannerBeTimeDismissed();
  const autojoinDismissed = useShouldAutojoinBannerBeTimeDismissed();
  const selectedWorkspace = useGetSelectedWorkspace();
  const hasInviteCalloutScope = useHasSomeScopes([
    INVITE_VIEWER_ACTION,
    INVITE_CREATOR_ACTION,
    INVITE_ADMIN_ACTION,
    INVITE_CREATOR_LITE_ACTION,
  ]);
  const scopes: ReturnType<typeof getNavigationScopes> = useCurrentUserSelector(
    user => getNavigationScopes(user.scopes),
    {} as ReturnType<typeof getNavigationScopes>
  );
  const hasAutoJoin = useHasAutojoin();

  const { shouldShowOnboardingChecklist, checklistLocationToRender } =
    useChecklistVisibilityAndDismiss();
  const [inviteCalloutDisabled] = useLocalWorkspaceState(
    INVITE_CALLOUT_DISMISSED,
    false
  );

  const hasSuggestedWorkspaces = suggestedWorkspace.hasFlag;
  const suggestedWorkspaceResult = suggestedWorkspace.result;
  const suggestion = suggestedWorkspace?.result?.data?.result;

  const canShowInviteCallout = !inviteCalloutDisabled && hasInviteCalloutScope;

  if (devToolsEnabled) {
    const param = urlParams.get(SIDEBAR_CALLOUT_PARAM);

    if (param && CALLOUTS[param]) {
      return param as SidebarCalloutType;
    }
  }

  if (
    shouldShowOnboardingChecklist &&
    checklistLocationToRender.includes(ChecklistLocationToRender.Sidebar)
  ) {
    if (platformDetails.type === 'desktop') {
      return isMobileScreenSize ? null : CALLOUTS.GET_STARTED_CHECKLIST_CALLOUT;
    }
  }

  if (hasSuggestedWorkspaces) {
    if (
      hasSuggestedWorkspaces &&
      shouldShowJoinTeamBanner(suggestion) &&
      !suggestedWorkspaceDismissed &&
      scopes.hasSuggestedWorkspaceSidebarScope
    ) {
      return CALLOUTS.JOIN_TEAM_CALLOUT;
    }

    if (suggestedWorkspaceResult && !suggestedWorkspaceResult.loading) {
      const hasInviteScope =
        scopes.hasInviteViewerActionScope || scopes.hasInviteCreatorActionScope;

      if (
        scopes.hasWorkspaceJoinManageScope &&
        scopes.hasAutojoinSidebarScope &&
        hasInviteScope &&
        !hasAutoJoin &&
        shouldShowAutojoinCallout(suggestion, selectedWorkspace) &&
        !autojoinDismissed
      ) {
        return CALLOUTS.AUTO_JOIN_CALLOUT;
      }

      return canShowInviteCallout ? CALLOUTS.INVITE_CALLOUT : null;
    }
  }

  // These values will be nullish until the suggested workspace check completes
  if (hasSuggestedWorkspaces === undefined) {
    return null;
  }

  return canShowInviteCallout ? CALLOUTS.INVITE_CALLOUT : null;
}
