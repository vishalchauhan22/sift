import { useIsCurrentUserLoggedIn } from '@js/common/current-user';

import {
  AI,
  AI_DEFAULT_LIMIT,
} from '@loomhq/shared-utilities/constants/limits';
import { AI_AUTO_TITLE_ACCESS } from '@loomhq/shared-utilities/constants/scopes';

import { useHasScope } from './useHasScopes';
import {
  useGetSelectedWorkspace,
  useGetSelectedWorkspaceWithFetchingStatus,
} from './workspace';

export function useHasAIFeatureAccess(scope = AI_AUTO_TITLE_ACCESS): boolean {
  const hasAiScope = useHasScope(scope);

  const workspace = useGetSelectedWorkspace();

  // if tries is null, probably has never been set and should start at 5
  const memberLimits = workspace?.memberLimits ?? {};
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const AITriesLeft = memberLimits[AI] ?? AI_DEFAULT_LIMIT;
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const hasAIAccess = hasAiScope || AITriesLeft > 0;

  return hasAIAccess;
}

export function useHasAiFeatureAccessWithFetchingStatus(): boolean | undefined {
  const isLoggedIn = useIsCurrentUserLoggedIn();

  // Sourced from preloaded GraphQL query, so no need to check for loading state
  // See useCurrentUser in:
  // projects/webapp-client/js/common/current-user/hooks/internal/useCurrentUser.ts
  const hasAiScope = useHasScope(AI_AUTO_TITLE_ACCESS);

  const { selectedWorkspace: workspace, isFetching } =
    useGetSelectedWorkspaceWithFetchingStatus();

  // if tries is null, probably has never been set and should start at 5
  const memberLimits = workspace?.memberLimits ?? {};
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const AITriesLeft = memberLimits[AI] ?? AI_DEFAULT_LIMIT;
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const hasAIAccess = hasAiScope || AITriesLeft > 0;

  return isFetching ? undefined : isLoggedIn && hasAIAccess;
}
