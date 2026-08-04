import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import { useHasAIFeatureAccess } from '@js/hooks/useHasAIFeatureAccess';
import { useWorkspaceAllowsAi } from '@js/hooks/useWorkspaceAllowsAi';
import { AI_EDIT_VIDEO_WITH_TTS_ACCESS } from '@loomhq/shared-utilities/constants/scopes';
import {
  ControlType,
  EXPERIMENTS,
} from '@loomhq/shared-utilities/constants/statsig';

export type EnabledStatus = 'hidden' | 'paywalled' | 'enabled';

type EditTtsExperimentValues =
  | 'control'
  | 'variant'
  | 'variant-excluded'
  | 'ineligible'
  | 'dummy-control'
  | 'dummy-variant';

export const useEditTtsEnabledStatus = (): EnabledStatus => {
  const ttsFlagValue = useFeatureFlagValue<EditTtsExperimentValues | undefined>(
    EXPERIMENTS.ROLLOUT_LOOM_EDIT_TTS,
    ControlType.STATSIG_EXPERIMENT
  );

  const isEditTtsEnabled =
    ttsFlagValue === 'variant' || ttsFlagValue === 'variant-excluded';

  const workspaceAllowsAi = useWorkspaceAllowsAi();
  const hasTtsAccess = useHasAIFeatureAccess(AI_EDIT_VIDEO_WITH_TTS_ACCESS);

  if (!workspaceAllowsAi || !isEditTtsEnabled) {
    return 'hidden';
  }

  if (!hasTtsAccess) {
    return 'paywalled';
  }

  return 'enabled';
};
