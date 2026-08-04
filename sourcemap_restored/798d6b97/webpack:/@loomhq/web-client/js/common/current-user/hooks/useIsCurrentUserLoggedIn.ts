import { isLoggedInUser } from '../schema/isLoggedInUser';
import { useCurrentUser } from './internal/useCurrentUser';

/**
 * Determines if the current user is logged in by checking for the correct response type from RegularUser.
 *
 * @returns boolean - `true` if the user is logged in, else `false`.
 */
export const useIsCurrentUserLoggedIn = (): boolean => {
  const currentUserResponse = useCurrentUser();

  return isLoggedInUser(currentUserResponse);
};
