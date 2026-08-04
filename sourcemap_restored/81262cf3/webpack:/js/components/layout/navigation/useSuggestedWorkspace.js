/* eslint-disable @loomhq/loom/no-js-extension */
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';

import { useGetSuggestedWorkspaceForSidebarBannerQuery } from './GetSuggestedWorkspaceForSidebarBanner.generated';

export function useSuggestedWorkspace() {
  const userIsLoggedIn = useIsCurrentUserLoggedIn();

  const result = useGetSuggestedWorkspaceForSidebarBannerQuery({
    fetchPolicy: 'cache-first',
    skip: !userIsLoggedIn,
  });

  return {
    result,
  };
}
