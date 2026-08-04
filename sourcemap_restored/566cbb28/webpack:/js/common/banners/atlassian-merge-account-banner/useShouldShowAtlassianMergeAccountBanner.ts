import {
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { isAtlassianLinked } from '@js/utilities/user';

import { useCheckUserBelongsToEnterpriseWorkosWorkspaceQuery } from './CheckUserBelongsToEnterpriseWorkosWorkspace.generated';

export const useShowAtlassianMergeAccountBanner = (): {
  shouldShowMergeAccountBanner: boolean;
} => {
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const { data, loading } =
    useCheckUserBelongsToEnterpriseWorkosWorkspaceQuery();

  const isAtlassianLinkedUser = useCurrentUserSelector(
    isAtlassianLinked,
    false
  );

  if (
    !isLoggedIn ||
    loading ||
    data?.checkUserBelongsToEnterpriseWorkosWorkspace?.__typename !==
      'CheckUserBelongsToEnterpriseWorkosWorkspace'
  ) {
    return {
      shouldShowMergeAccountBanner: false,
    };
  }

  return {
    shouldShowMergeAccountBanner:
      isAtlassianLinkedUser &&
      Boolean(!data.checkUserBelongsToEnterpriseWorkosWorkspace.result),
  };
};
