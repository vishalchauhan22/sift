import {
  AI,
  AI_DEFAULT_LIMIT,
} from '@loomhq/shared-utilities/constants/limits';
import { AI_AUTO_TITLE_ACCESS } from '@loomhq/shared-utilities/constants/scopes';

import { useHasScope } from './useHasScopes';
import { useGetSelectedWorkspace } from './workspace';

export function useIsTrialingAIAddOn(): boolean {
  const hasAiScope = useHasScope(AI_AUTO_TITLE_ACCESS);
  const workspace = useGetSelectedWorkspace();

  const memberLimits = workspace?.memberLimits ?? {};
  // if tries is null, probably has never been set and should start at 5
  const AiTriesLeft = memberLimits[AI] ?? AI_DEFAULT_LIMIT;

  // Check soon to be deprecated individual AI limits
  if (!hasAiScope && AiTriesLeft > 0) {
    return true;
  }

  return false;
}
