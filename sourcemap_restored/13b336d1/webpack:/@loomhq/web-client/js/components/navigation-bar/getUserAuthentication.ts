import { selectFromCurrentUserCache } from '@js/common/current-user/cache/selectFromCurrentUserCache';

import { AUTHENTICATED_USER_ACCESS } from '@loomhq/shared-utilities/constants/scopes';

export function getUserAuthentication(): boolean {
  const userScopes = selectFromCurrentUserCache(user => user.scopes, []);

  // NOTE: this relies on user being injected in window. should prefer to use the hook for scope here.
  if (userScopes.includes(AUTHENTICATED_USER_ACCESS)) {
    return false;
  }

  return true;
}
