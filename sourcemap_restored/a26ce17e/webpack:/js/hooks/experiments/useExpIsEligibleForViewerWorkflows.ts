import { useVideoContext } from '@js/common/video-player';

import { useFlagIsActivated } from '@js/hooks/featureFlag';

import { useHasAiFeatureAccessWithFetchingStatus } from '@js/hooks/useHasAIFeatureAccess';

import {
  DUMMY_VARIANT,
  VARIANT,
} from '@loomhq/shared-utilities/constants/featureFlag';

import {
  EXPERIMENTS,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';

//  🚩 EXP_AI_WORKFLOWS_FOR_VIEWERS_PHASE_2
export function useHasAiWorkflowsForViewersModalAccess(): boolean {
  const { video } = useVideoContext();

  const canUserEditVideo = video.currentUserCanEdit;

  const isEligibleForWorkflowsForViewersPhase2 = useFlagIsActivated({
    flag: EXPERIMENTS.EXP_AI_WORKFLOWS_FOR_VIEWERS_PHASE_2,
    controlType: ControlType.STATSIG_EXPERIMENT,
    activationValues: [DUMMY_VARIANT, VARIANT],
    eligibilityPreCheckFunction: () => {
      if (canUserEditVideo) {
        return {
          pass: false,
          failReason: 'Editors of videos cannot access this feature',
        };
      }

      return {
        pass: true,
      };
    },
  });

  return Boolean(isEligibleForWorkflowsForViewersPhase2);
}

export function useHasFullWorkflowsForViewersAccess(): boolean {
  const hasAiWorkflowsForViewersModalAccess =
    useHasAiWorkflowsForViewersModalAccess();

  const hasAiFeatureAccess = useHasAiFeatureAccessWithFetchingStatus();

  return hasAiWorkflowsForViewersModalAccess && hasAiFeatureAccess === true;
}
