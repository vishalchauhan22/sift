import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { isMobile } from '@js/utilities/device';

import {
  EXPERIMENTS,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';

export function useExpMWebCommentingV2(): {
  isExpMWebCommentingV2: boolean;
  expMWebCommentingV2Variant: string;
} {
  const [isExpMWebCommentingV2, expMWebCommentingV2Variant] =
    useFlagIsActivated({
      flag: EXPERIMENTS.EXP_MWEB_COMMENTING_V2,
      controlType: ControlType.STATSIG_EXPERIMENT,
      activationValues: ['variant-1'],
      returnAssignmentName: true,
      eligibilityPreCheckFunction: () => {
        if (!isMobile) {
          return {
            pass: false,
            failReason: 'Not eligible for the MWeb Commenting V2 experiment',
          };
        }

        return {
          pass: true,
        };
      },
    });

  return { isExpMWebCommentingV2, expMWebCommentingV2Variant };
}
