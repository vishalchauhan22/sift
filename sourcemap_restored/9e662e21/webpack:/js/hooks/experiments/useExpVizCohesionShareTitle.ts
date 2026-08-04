import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { isMobile } from '@js/utilities/device';
import { useCurrentUserSelector } from '@js/common/current-user/hooks';

import {
  ControlType,
  EXPERIMENTS,
} from '@loomhq/shared-utilities/constants/statsig';

export function useExpVizCohesionShareTitle(userCanEdit?: boolean): {
  isExpVizCohesionShareTitle: boolean;
  expVizCohesionShareTitleVariant: string;
} {
  const userId = useCurrentUserSelector(user => user.id, null);
  const [isExpVizCohesionShareTitle, expVizCohesionShareTitleVariant] =
    useFlagIsActivated({
      flag: EXPERIMENTS.EXP_VISUAL_COHESION_SHARE_PAGE_TITLE,
      controlType: ControlType.STATSIG_EXPERIMENT,
      activationValues: ['variant-1', 'variant-2'],
      returnAssignmentName: true,
      extraProperties: {
        userId,
        userCanEdit,
      },
      eligibilityPreCheckFunction: () => {
        if (isMobile) {
          return {
            pass: false,
            failReason: 'Not eligible on mobile',
          };
        }

        return {
          pass: true,
        };
      },
    });

  return {
    isExpVizCohesionShareTitle,
    expVizCohesionShareTitleVariant,
  };
}
