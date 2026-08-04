import { useMemo } from 'react';

import { isLoggedInUser } from '../schema/isLoggedInUser';
import { LoggedInUser } from '../schema/types';
import { useCurrentUser } from './internal/useCurrentUser';

/**
 * For accessing properties on the current user when you aren't sure if they are logged in or not.
 *
 * If your component is only available for logged in users then LoggedInOnly is likely a better fit.
 *
 * @param loggedInSelectorFn - A selector function that takes a LoggedInUser and returns a specific property or value.
 * Ensure referential equality of this function between renders for optimal performance.
 * @param defaultWhenLoggedOut - A value to return if the current user is logged out.
 * @returns The result of loggedInSelectorFn when the user is logged in else defaultWhenLoggedOut when logged out.
 *
 * @example
 * // Get the user's first name or "Anonymous" if they are logged out.
 * const name = useCurrentUserSelector(user => user.firstName, "Anonymous")
 *
 * @example
 * // user.hasWebPushSubcription could be undefined so we handle that in the selector function to ensure a boolean is always returned.
 * const hasWebPushSubcription: boolean = useCurrentUserSelector(user => user.hasWebPushSubcription ?? false, false)
 *
 */
export const useCurrentUserSelector = <Output>(
  loggedInSelectorFn: (loggedInUser: LoggedInUser) => Output,
  defaultWhenLoggedOut: Output
): Output => {
  const currentUser = useCurrentUser();

  return useMemo(() => {
    if (!isLoggedInUser(currentUser)) {
      return defaultWhenLoggedOut;
    }

    return loggedInSelectorFn(currentUser);
  }, [currentUser, defaultWhenLoggedOut, loggedInSelectorFn]);
};
