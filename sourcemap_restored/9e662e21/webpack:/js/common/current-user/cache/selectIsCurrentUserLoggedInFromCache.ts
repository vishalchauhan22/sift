import { selectFromCurrentUserCache } from './selectFromCurrentUserCache';

/**
 * Determines if the current user is logged in
 *
 * @deprecated This is intended for backwards compatibility purposes. New code should use the hook based APIs
 *
 * @returns boolean - `true` if the user is logged in, else `false`.
 */
export const selectIsCurrentUserLoggedInFromCache = (): boolean => {
  return selectFromCurrentUserCache(() => true, false);
};
