import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships/use-get-workspace-memberships';
import { useMemo } from 'react';

type TypeOfCounts = 'folders' | 'screenshots' | 'spaces' | 'users' | 'videos';

export const useWorkspaceCounts = (type?: TypeOfCounts): any => {
  const { selectedWorkspace } = useGetWorkspaceMemberships();
  const allCounts = useMemo(
    () => selectedWorkspace?.counts,
    [selectedWorkspace]
  );

  return type ? allCounts?.[type] : allCounts;
};
