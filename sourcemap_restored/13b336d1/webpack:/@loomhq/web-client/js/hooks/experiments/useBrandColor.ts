import { useFlagIsActivated } from '@js/hooks/featureFlag';

import {
  EXPERIMENTS,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';

export function useBrandColor(): boolean {
  const isFlagOn = useFlagIsActivated({
    flag: EXPERIMENTS.ROLLOUT_BRAND_BLUEIFY,
    controlType: ControlType.STATSIG_EXPERIMENT,
    activationValues: [true],
  });

  return isFlagOn;
}
