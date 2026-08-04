import { useFlagIsActivated } from '@js/hooks/featureFlag';

import { useCurrentUserSelector } from '@js/common/current-user/hooks';
import {
  ControlType,
  EXPERIMENTS,
  FlagReturnValues,
} from '@loomhq/shared-utilities/constants/statsig';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
export function useExpIntegratedChecklistWithUseCases(): {
  isExpIntegratedChecklistWithUseCases: boolean;
} {
  const userCreatedAt = useCurrentUserSelector(
    user => user.createdAt,
    new Date()
  );
  const [isEnabled] = useFlagIsActivated({
    flag: EXPERIMENTS.EXP_INTEGRATED_CHECKLIST_WITH_USE_CASES,
    controlType: ControlType.STATSIG_EXPERIMENT,
    defaultValue: FlagReturnValues.CONTROL,
    activationValues: [FlagReturnValues.VARIANT],
    returnAssignmentName: true,
    extraProperties: {
      userAge: Math.floor((Date.now() - userCreatedAt.getTime()) / ONE_DAY_MS),
    },
  });

  return {
    isExpIntegratedChecklistWithUseCases: isEnabled,
  };
}
