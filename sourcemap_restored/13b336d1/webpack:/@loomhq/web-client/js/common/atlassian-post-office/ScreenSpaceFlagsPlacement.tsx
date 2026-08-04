import React from 'react';
import { Placement } from '@atlassian/post-office-placement-remote';
import { useFlagIsActivated } from '@js/hooks/featureFlag';
import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';

export const ScreenSpaceFlagsPlacement = (): JSX.Element | null => {
  const selectedWorkspace = useGetSelectedWorkspace();
  const workspaceSiteId = selectedWorkspace?.site_id;

  const flagValue = useFlagIsActivated({
    flag: FEATURE_GATES.SCREEN_SPACE_FLAG_PLACEMENT,
    controlType: ControlType.STATSIG_FEATURE_GATE,
    activationValues: [true],
  });

  // Since Placements only work for Atlassian-managed sites, render nothing for legacy sites
  if (!workspaceSiteId) {
    return null;
  }

  // Jest does not have a window object, so we need to check if it is undefined
  const isAllowedUrl =
    typeof window !== 'undefined' &&
    window.location &&
    !window.location.pathname?.includes('/embed');

  if (!flagValue || !isAllowedUrl) {
    return null;
  }

  return <Placement placementId="screen-space-flags" />;
};
