import { useCurrentUserSelector } from '@js/common/current-user';
import { useFlagIsActivated } from '@js/hooks/featureFlag';

import {
  EXPERIMENTS,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';

export function useExpRoleQuestionMandatory(): boolean {
  const persona = useCurrentUserSelector(
    user => (user.persona as any)?.persona_v1?.use_case_plan_persona,
    null
  ) as string;

  const userHasRole = Boolean(persona);

  const isExpRoleQuestionMandatory = useFlagIsActivated({
    flag: EXPERIMENTS.EXPERIMENT_ROLE_QUESTION_MANDATORY_V2,
    controlType: ControlType.STATSIG_EXPERIMENT,
    activationValues: ['variant-1'],
    eligibilityPreCheckFunction: () => {
      if (userHasRole) {
        return {
          pass: false,
          failReason: 'Ineligible: user has a role defined already.',
        };
      }

      return {
        pass: true,
      };
    },
  });

  return isExpRoleQuestionMandatory;
}
