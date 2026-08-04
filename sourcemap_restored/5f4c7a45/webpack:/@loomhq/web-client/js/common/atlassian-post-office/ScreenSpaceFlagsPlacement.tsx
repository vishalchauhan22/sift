import React from 'react';
import { Placement } from '@atlassian/post-office-placement-remote';
import { useFlagIsActivated } from '@js/hooks/featureFlag';
import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';

export const ScreenSpaceFlagsPlacement = (): JSX.Element | null => {
  const flagValue = useFlagIsActivated({
    flag: FEATURE_GATES.SCREEN_SPACE_FLAG_PLACEMENT,
    controlType: ControlType.STATSIG_FEATURE_GATE,
    activationValues: [true],
  });

  if (!flagValue) {
    return null;
  }

  return <Placement placementId="screen-space-flags" />;
};
