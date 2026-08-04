import {
  ControlType,
  EXPERIMENTS,
  FlagReturnValues,
} from '@loomhq/shared-utilities/constants/statsig';

import { useHasAIFeatureAccess } from '@js/hooks/useHasAIFeatureAccess';
import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { useWorkspaceAllowsAi } from '@js/hooks/useWorkspaceAllowsAi';
import { useCurrentUserCanEdit } from './useCurrentUserCanEdit';

/**
 * Determines if the current user can access the async workflows create tab.
 * Also used to hide elements of the EditTab.
 *
 * Returns true only when ALL conditions are met:
 * - User has AI feature access (scopes or trial usage remaining)
 * - Workapace has any AI features available
 * - User can edit the current video (owner or has edit permissions)
 * - User is in the 'variant' population for the "loom-ai-workflows-tab-revamp" experiment flag
 * - Workspace has AI features enabled
 */
export const useHasCreateTabAccess = (): boolean => {
  const hasAiFeatureAccess = useHasAIFeatureAccess();
  const workspaceAllowsAi = useWorkspaceAllowsAi();

  // Check if user can edit the video (includes ownership and ACL permissions)
  const canEditVideo = useCurrentUserCanEdit();

  // Check if user is in the experiment population
  const isInExperimentPopulation = useFlagIsActivated({
    flag: EXPERIMENTS.LOOM_ASYNC_WORKFLOWS_WORKFLOWS_TAB_REVAMP,
    controlType: ControlType.STATSIG_EXPERIMENT,
    activationValues: [FlagReturnValues.VARIANT],
    defaultValue: false,
  });

  return Boolean(
    hasAiFeatureAccess &&
      canEditVideo &&
      isInExperimentPopulation &&
      workspaceAllowsAi
  );
};
