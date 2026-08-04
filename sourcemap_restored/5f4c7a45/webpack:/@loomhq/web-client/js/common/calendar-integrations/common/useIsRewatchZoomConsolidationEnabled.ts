import { useFeatureFlagValue } from '@js/hooks/featureFlag';

import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';

type ReturnProps = {
  isRewatchZoomConsolidationEnabled: boolean;
  isRewatchZoomConsolidationLoading: boolean;
};

export const useIsRewatchZoomConsolidationEnabled = (): ReturnProps => {
  const featureFlagValue: boolean | undefined = useFeatureFlagValue(
    FEATURE_GATES.REWATCH_MEETINGS_ZOOM_CONSOLIDATION,
    ControlType.STATSIG_FEATURE_GATE
  );
  const isRewatchZoomConsolidationLoading = featureFlagValue === undefined;
  const isRewatchZoomConsolidationEnabled = featureFlagValue === true;

  return {
    isRewatchZoomConsolidationEnabled,
    isRewatchZoomConsolidationLoading,
  };
};
