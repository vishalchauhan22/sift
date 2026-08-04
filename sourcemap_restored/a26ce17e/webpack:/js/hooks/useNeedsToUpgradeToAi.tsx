import { useHasAIFeatureAccess } from '@js/hooks/useHasAIFeatureAccess';
import { useIsTrialingAIAddOn } from '@js/hooks/useIsTrialingAIAddOn';

export const useNeedsToUpgradeToAi = (): boolean => {
  const workspaceHasAiAccess = useHasAIFeatureAccess();
  const workspaceIsTrialingAi = useIsTrialingAIAddOn();

  return !workspaceHasAiAccess || workspaceIsTrialingAi;
};
