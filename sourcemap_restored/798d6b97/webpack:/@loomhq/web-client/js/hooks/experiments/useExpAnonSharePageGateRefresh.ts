import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useFlagIsActivated } from '@js/hooks/featureFlag';

import {
  EXPERIMENTS,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';

export function useExpAnonSharePageGateRefresh(): {
  isExpAnonSharePageGateRefresh: boolean;
} {
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const isExpAnonSharePageGateRefresh = useFlagIsActivated({
    flag: EXPERIMENTS.EXP_VISUAL_REFRESH_ON_ANON_SHARE_PAGE_GATE_V2,
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
    activationValues: ['variant'],
  });

  return {
    isExpAnonSharePageGateRefresh,
  };
}
