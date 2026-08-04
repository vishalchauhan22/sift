import { useFlagIsActivated } from '@js/hooks/featureFlag';

import { isMobile } from '@js/utilities/device';

import {
  ControlType,
  EXPERIMENTS,
} from '@loomhq/shared-utilities/constants/statsig';

export function useExpMobileWebOnboardingV2(): {
  isExpMobileWebOnboardingV2: boolean;
} {
  const [isExpMobileWebOnboardingV2] = useFlagIsActivated({
    flag: EXPERIMENTS.EXP_MOBILE_WEB_ONBOARDING_V2,
    controlType: ControlType.STATSIG_EXPERIMENT,
    activationValues: ['variant-1'],
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
    isExpMobileWebOnboardingV2,
  };
}
