import { WorkflowType } from '@js/common/workflows/common/types';

import { useHasAIFeatureAccess } from '@js/hooks/useHasAIFeatureAccess';
import { useIsTrialingAIAddOn } from '@js/hooks/useIsTrialingAIAddOn';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';

import { WORKSPACE_PLAN_EDUCATION } from '@loomhq/shared-utilities/constants/workspacePlans';

import { TourStepType } from '../types';
import { tourSteps } from './tour-steps';

export const useGetTourSteps = (
  // Special case we need to handle for Spring Launch
  userOpenedWorkflowType: WorkflowType | null
): TourStepType[] => {
  const hasAiAddOnAccess = useHasAIFeatureAccess();
  const isTrialingAi = useIsTrialingAIAddOn();

  const selectedWorkspace = useGetSelectedWorkspace();

  const isEducation = [WORKSPACE_PLAN_EDUCATION].includes(
    selectedWorkspace?.type
  );

  if (isEducation || (!hasAiAddOnAccess && !isTrialingAi)) {
    return [];
  }

  if (!userOpenedWorkflowType) {
    return tourSteps;
  }

  const firstWorkflowStepIndex = tourSteps.findIndex(
    tourStep => tourStep.workflowType === userOpenedWorkflowType
  );

  if (firstWorkflowStepIndex === -1) {
    return tourSteps;
  }

  const workflowTourSteps = [
    tourSteps[firstWorkflowStepIndex],
    ...tourSteps.slice(1, firstWorkflowStepIndex),
    ...tourSteps.slice(firstWorkflowStepIndex + 1),
  ];

  return [tourSteps[0], ...workflowTourSteps];
};
