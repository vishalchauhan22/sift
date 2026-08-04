import * as loggerx from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import { isLoggedInUser } from '../schema/isLoggedInUser';
import { LoggedInUser } from '../schema/types';
import { getCurrentUserFromCache } from './getCurrentUserFromCache';

/**
 * Runs a selector against the current user in the cache
 * @deprecated This is intended for backwards compatibility purposes. New code should use the hook based APIs
 * @param selectorFn - A selector function that runs against a LoggedInUser
 * @param defaultWhenLoggedOut - A value to return if the user is logged out or if an error occurs
 * @returns The result of selectorFn or `defaultWhenLoggedOut` if logged out
 */
export const selectFromCurrentUserCache = <Output>(
  selectorFn: (input: LoggedInUser) => Output,
  defaultWhenLoggedOut: Output
): Output => {
  try {
    const currentUser = getCurrentUserFromCache();

    if (!isLoggedInUser(currentUser)) {
      return defaultWhenLoggedOut;
    }

    return selectorFn(currentUser);
  } catch (e) {
    loggerx.error(e, {}, { feature: Feature.UserApolloCache });

    return defaultWhenLoggedOut;
  }
};
