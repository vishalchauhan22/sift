import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useFlagIsActivated } from '@js/hooks/featureFlag';

import {
  EXPERIMENTS,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';

export function useExpAnonSharePageGateRefresh(): {
  isExpAnonSharePageGateRefresh: boolean;
  expAnonSharePageGateRefreshVariant: string;
  isExpAnonSharePageGateRefreshVariant1: boolean;
  isExpAnonSharePageGateRefreshVariant2: boolean;
  isExpAnonSharePageGateRefreshVariant3: boolean;
} {
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const [isExpAnonSharePageGateRefresh, expAnonSharePageGateRefreshVariant] =
    useFlagIsActivated({
      flag: EXPERIMENTS.EXP_VISUAL_REFRESH_ON_ANON_SHARE_PAGE_GATE,
      eligibilityPreCheckFunction: () => {
        if (isLoggedIn) {
          return {
            pass: false,
            failReason: 'User is logged in',
          };
        }
        return {
          pass: true,
        };
      },
      controlType: ControlType.STATSIG_EXPERIMENT,
      activationValues: ['variant-1', 'variant-2', 'variant-3'],
      returnAssignmentName: true,
    });

  const isExpAnonSharePageGateRefreshVariant1 =
    expAnonSharePageGateRefreshVariant === 'variant-1';
  const isExpAnonSharePageGateRefreshVariant2 =
    expAnonSharePageGateRefreshVariant === 'variant-2';
  const isExpAnonSharePageGateRefreshVariant3 =
    expAnonSharePageGateRefreshVariant === 'variant-3';

  return {
    isExpAnonSharePageGateRefresh,
    isExpAnonSharePageGateRefreshVariant1,
    isExpAnonSharePageGateRefreshVariant2,
    isExpAnonSharePageGateRefreshVariant3,
    expAnonSharePageGateRefreshVariant,
  };
}
