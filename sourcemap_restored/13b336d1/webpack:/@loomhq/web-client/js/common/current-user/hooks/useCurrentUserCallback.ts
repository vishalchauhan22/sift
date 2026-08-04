import { useCallback } from 'react';

import { isLoggedInUser } from '../schema/isLoggedInUser';
import { LoggedInUser } from '../schema/types';
import { useCurrentUser } from './internal/useCurrentUser';

/**
 * Takes logged in and logged out callbacks and returns a new
 * callback that executes the correct input function based on user
 * log in status
 *
 * Please consider referential equality with the functions being provided
 *
 * @param fnWhenLoggedIn - The callback that is used when the current user is logged in
 * @param fnWhenLoggedOut - The callback that is used when the current user is logged out
 * @returns - A function that calls one of the input callbacks
 */
export const useCurrentUserCallback = <LoggedInResult, LoggedOutResult>(
  fnWhenLoggedIn: (user: LoggedInUser) => LoggedInResult,
  fnWhenLoggedOut: () => LoggedOutResult
): (() => LoggedInResult | LoggedOutResult) => {
  const currentUser = useCurrentUser();

  return useCallback(() => {
    if (isLoggedInUser(currentUser)) {
      return fnWhenLoggedIn(currentUser);
    }

    return fnWhenLoggedOut();
  }, [currentUser, fnWhenLoggedIn, fnWhenLoggedOut]);
};
