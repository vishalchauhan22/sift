import { WorkspaceSetting } from '@loomhq/shared-utilities/constants/settings';

import { useWorkspaceSetting } from './workspaceSettings';

export function useWorkspaceAllowsAi(): boolean {
  const { loading, error, value } = useWorkspaceSetting(
    WorkspaceSetting.ALLOWS_AI
  );

  if (error || loading) {
    return false;
  }

  return value;
}
