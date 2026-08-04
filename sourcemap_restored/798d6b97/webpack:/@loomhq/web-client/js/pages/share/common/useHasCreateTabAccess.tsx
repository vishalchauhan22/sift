import {
  ControlType,
  EXPERIMENTS,
  FlagReturnValues,
} from '@loomhq/shared-utilities/constants/statsig';

import { useHasAIFeatureAccess } from '@js/hooks/useHasAIFeatureAccess';
import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { useWorkspaceAllowsAi } from '@js/hooks/useWorkspaceAllowsAi';

import { useVideoContext } from '@js/common/video-player';
import { useHasViewerAccessibleWorkflowContent } from './useHasViewerAccessibleWorkflowContent';
import { useCurrentUserCanEdit } from './useCurrentUserCanEdit';

interface CreateTabAccess {
  hasCreateTabEditorExperience: boolean;
  hasCreateTabViewerExperience: boolean;
}

/**
 * Determines if the current user can access the async workflows create tab.
 * Access can be granted in two ways:
 * 1. As an editor when ALL conditions are met:
 *    - User has AI feature access (scopes or trial usage remaining)
 *    - Workspace has any AI features available
 *    - User can edit the video (using useCurrentUserCanEdit hook)
 *    - User is in the 'variant' population for the "loom-ai-workflows-tab-revamp" experiment flag
 *    - Workspace has AI features enabled
 * 2. As a viewer when:
 *    - User has access to the video (video.noAccess is false)
 *    - There is public workflow content available
 */
export const useHasCreateTabAccess = (): CreateTabAccess => {
  const hasAiFeatureAccess = useHasAIFeatureAccess();
  const workspaceAllowsAi = useWorkspaceAllowsAi();

  // Check if user is in the experiment population
  const isInExperimentPopulation = useFlagIsActivated({
    flag: EXPERIMENTS.LOOM_ASYNC_WORKFLOWS_WORKFLOWS_TAB_REVAMP,
    controlType: ControlType.STATSIG_EXPERIMENT,
    activationValues: [FlagReturnValues.VARIANT],
    defaultValue: false,
  });

  // Get video context and user edit permissions
  const {
    video: { noAccess },
  } = useVideoContext();
  const currentUserCanEdit = useCurrentUserCanEdit();

  // Check if user has editor access to Create tab
  const hasCreateTabEditorExperience = Boolean(
    hasAiFeatureAccess &&
      currentUserCanEdit &&
      isInExperimentPopulation &&
      workspaceAllowsAi
  );

  // This should be skipped for editor users
  const { hasPublicContent, loading: publicWorkflowContentLoading } =
    useHasViewerAccessibleWorkflowContent();

  // User must not have edit access
  // User must have access to the video
  const hasCreateTabViewerExperience = Boolean(
    !currentUserCanEdit &&
      !noAccess &&
      hasPublicContent &&
      !publicWorkflowContentLoading
  );

  return {
    hasCreateTabEditorExperience,
    hasCreateTabViewerExperience,
  };
};
