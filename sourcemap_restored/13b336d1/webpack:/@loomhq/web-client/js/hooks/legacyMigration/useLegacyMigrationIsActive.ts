import { useGetSelectedWorkspaceWithFetchingStatus } from '../workspace-basic';
import { useGetLegacyMigrationIsActiveQuery } from './getMigrationIsActive.generated';

export function useGetLegacyMigrationIsActive({
  workspaceIdOverride,
  forceSkip,
}: {
  workspaceIdOverride?: string;
  forceSkip?: boolean;
} = {}): boolean {
  const { selectedWorkspace } = useGetSelectedWorkspaceWithFetchingStatus();

  const workspaceId = workspaceIdOverride || selectedWorkspace?.id;
  const { data } = useGetLegacyMigrationIsActiveQuery({
    variables: {
      workspaceId,
    },
    skip: !workspaceId || forceSkip,
  });

  return data?.organization?.legacyMigrationIsActive ?? false;
}
