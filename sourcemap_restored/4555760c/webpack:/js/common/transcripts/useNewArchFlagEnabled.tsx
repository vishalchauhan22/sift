import { useFlagIsActivated } from '@js/hooks/featureFlag';

import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';

export const useNewArchFlagEnabled = (): boolean => {
  return useFlagIsActivated({
    flag: FEATURE_GATES.TRANSCRIPTS_REARCHITECTURE_2025,
    controlType: ControlType.STATSIG_FEATURE_GATE,
    activationValues: [true],
  });
};
