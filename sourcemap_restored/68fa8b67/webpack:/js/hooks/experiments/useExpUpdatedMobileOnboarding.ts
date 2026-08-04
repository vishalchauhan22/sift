import { useFlagIsActivated } from '@js/hooks/featureFlag';

import { isMobile } from '@js/utilities/device';

import { EXP_UPDATED_MOBILE_ONBOARDING } from '@loomhq/shared-utilities/constants/featureFlag';

export function useExpUpdatedMobileOnboarding(): {
  isExpUpdatedMobileOnboarding: boolean;
} {
  const [isExpUpdatedMobileOnboarding] = useFlagIsActivated({
    flag: EXP_UPDATED_MOBILE_ONBOARDING,
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
    isExpUpdatedMobileOnboarding,
  };
}
