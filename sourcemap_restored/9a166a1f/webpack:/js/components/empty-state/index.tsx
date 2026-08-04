import { LOOMS_PAGE } from '@js/constants/routes';

import { ExtensionEmptyState } from '@js/components/empty-state/extension-empty-state';
import { useExtensionInstalled } from '@js/hooks/devices';
import { useFeatureFlagValue, useFlagIsActivated } from '@js/hooks/featureFlag';
import { useWorkspaceDestinationStateData } from '@js/hooks/useWorkspaceDestinationStateData';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { workspaceDestinationStateUtils } from '@loomhq/shared-utilities';

import {
  ROLLOUT_COMMUNITY_LOOMS,
  ROLLOUT_COMMUNITY_LOOMS_VARIANTS,
} from '@loomhq/shared-utilities/constants/featureFlag';

import {
  ControlType,
  DYNAMIC_CONFIGS,
} from '@loomhq/shared-utilities/constants/statsig';

import CommunityEmptyState from './community-empty-state';
import { EmptyStateType } from './constants';
import DestinationEmptyState from './destination-empty-state';
const { WorkspaceDestinationState } = workspaceDestinationStateUtils;

const EmptyState = ({ type }: { type: EmptyStateType }): JSX.Element | null => {
  const location = useLocation();
  const currentPath = location.pathname;

  const communityLoomData = useFeatureFlagValue<any>(
    DYNAMIC_CONFIGS.CONFIG_COMMUNITY_EMPTY_STATE_LOOM_IDS,
    ControlType.DYNAMIC_CONFIG
  );

  const shouldShowCommunityLooms = useFlagIsActivated({
    flag: ROLLOUT_COMMUNITY_LOOMS,
    activationValues: ROLLOUT_COMMUNITY_LOOMS_VARIANTS,
  });

  const communityVideos = communityLoomData?.length ? communityLoomData : [];

  const hasExtensionInstalled = useExtensionInstalled();

  const showCommunityEmptyState =
    shouldShowCommunityLooms && communityVideos?.length > 0;

  const workspaceDestinationStateData = useWorkspaceDestinationStateData();

  if (
    shouldShowCommunityLooms === undefined ||
    communityLoomData === undefined
  ) {
    return null;
  }

  // We only want to show the extension onboarding tutorial
  // if user has the chrome extension installed and an empty
  // WorkspaceDestinationState and is on the empty library page.

  const workspaceDestinationState =
    workspaceDestinationStateData?.workspace_state;

  if (
    workspaceDestinationState === WorkspaceDestinationState.EMPTY &&
    currentPath.startsWith(LOOMS_PAGE) &&
    hasExtensionInstalled
  ) {
    return <ExtensionEmptyState />;
  }

  if (showCommunityEmptyState) {
    return <CommunityEmptyState type={type} />;
  }

  return <DestinationEmptyState type={type} />;
};

export { EmptyStateType } from './constants';

// eslint-disable-next-line import/no-default-export
export default EmptyState;
