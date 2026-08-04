import { useFlagIsActivated } from '@js/hooks/featureFlag';

import {
  ControlType,
  EXPERIMENTS,
} from '@loomhq/shared-utilities/constants/statsig';

export function useExpVizCohesionShell(): {
  isExpVizCohesionShell: boolean;
} {
  const [isExpVizCohesionShell] = useFlagIsActivated({
    flag: EXPERIMENTS.EXP_VISUAL_COHESION_SHELL,
    controlType: ControlType.STATSIG_EXPERIMENT,
    activationValues: ['dummy-variant'],
    returnAssignmentName: true,
  });

  return {
    isExpVizCohesionShell,
  };
}
