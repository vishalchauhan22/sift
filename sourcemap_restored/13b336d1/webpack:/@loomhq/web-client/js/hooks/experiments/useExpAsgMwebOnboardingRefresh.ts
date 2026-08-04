import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { isMobile } from '@js/utilities/device';

import {
  ControlType,
  EXPERIMENTS,
  FlagReturnValues,
} from '@loomhq/shared-utilities/constants/statsig';

export function useExpAsgMwebOnboardingRefresh(): {
  isControl: boolean;
  isExpAsgMwebOnboardingRefreshVariant1: boolean;
  isExpAsgMwebOnboardingRefreshVariant2: boolean;
} {
  const [isEnabled, result] = useFlagIsActivated({
    flag: EXPERIMENTS.EXP_ASG_MWEB_ONBOARDING_REFRESH,
    controlType: ControlType.STATSIG_EXPERIMENT,
    defaultValue: 'control',
    activationValues: [FlagReturnValues.VARIANT_1, FlagReturnValues.VARIANT_2],
    returnAssignmentName: true,
    eligibilityPreCheckFunction: () => {
      if (isMobile) {
        return {
          pass: true,
        };
      }

      return {
        pass: false,
        failReason: 'Ineligible: not on mobile.',
      };
    },
  });

  return {
    isControl: result === FlagReturnValues.CONTROL,
    isExpAsgMwebOnboardingRefreshVariant1:
      result === FlagReturnValues.VARIANT_1,
    isExpAsgMwebOnboardingRefreshVariant2:
      result === FlagReturnValues.VARIANT_2,
  };
}
