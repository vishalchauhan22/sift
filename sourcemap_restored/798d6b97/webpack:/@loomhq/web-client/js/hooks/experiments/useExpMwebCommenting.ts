import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { isMobile } from '@js/utilities/device';

import {
  EXPERIMENTS,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';

export function useExpMwebCommenting(): {
  isExpMwebCommenting: boolean;
  expMwebCommentingVariant: string;
} {
  const [isExpMwebCommenting, expMwebCommentingVariant] = useFlagIsActivated({
    flag: EXPERIMENTS.EXP_MWEB_COMMENTING,
    controlType: ControlType.STATSIG_EXPERIMENT,
    activationValues: ['variant-1'],
    returnAssignmentName: true,
    eligibilityPreCheckFunction: () => {
      if (!isMobile) {
        return {
          pass: false,
          failReason: 'Not eligible for the mweb commenting experiment',
        };
      }

      return {
        pass: true,
      };
    },
  });

  return { isExpMwebCommenting, expMwebCommentingVariant };
}
