import { GetCurrentUserSsrQuery } from '@loomhq/graphql-preload';

import { CurrentUserError } from '../errors/current-user-error';
import { normalizeCurrentUser } from './normalizeCurrentUser';
import { CurrentUserOrLoggedOut } from './types';
import { memoizeLast } from '@loomhq/shared-utilities/utilities/memoization/memoizeLast';

type ExtractedLoggedInUser = Extract<
  GetCurrentUserSsrQuery['getCurrentUser'],
  { __typename: 'GetCurrentUserPayload' }
>;
type ValidLoggedInUser = ExtractedLoggedInUser & {
  user: NonNullable<ExtractedLoggedInUser['user']>;
};

const isValidLoggedInUser = (
  currentUserResponse: NonNullable<GetCurrentUserSsrQuery['getCurrentUser']>
): currentUserResponse is ValidLoggedInUser => {
  return (
    currentUserResponse.__typename === 'GetCurrentUserPayload' &&
    currentUserResponse.user !== null
  );
};

/**
 * Used to narrow the type returned from useGetCurrentUserSsrQuery to a CurrentUser.
 * @param data The data returned from useGetCurrentUserSsrQuery
 * @throws CurrentUserError if the data is missing or contains unexpected errors
 * @returns The current user.
 */
const invariantGetCurrentUserSsrQuery = (
  data: GetCurrentUserSsrQuery | undefined
): CurrentUserOrLoggedOut => {
  if (!data || !data.getCurrentUser) {
    throw new CurrentUserError('No data returned for user');
  }

  const currentUserResponse = data.getCurrentUser;

  if (currentUserResponse.__typename === 'GenericError') {
    throw new CurrentUserError('GenericError received for user');
  }

  if (currentUserResponse.__typename === 'UserNotLoggedIn') {
    return currentUserResponse;
  }

  if (!isValidLoggedInUser(currentUserResponse)) {
    throw new CurrentUserError('User is null for logged in user');
  }

  return normalizeCurrentUser(currentUserResponse.user);
};

/**
 * Returns a memoized version of invariantGetCurrentUserSsrQuery.
 * @returns {typeof invariantGetCurrentUserSsrQuery}
 */
export const getMemoizedInvariantGetCurrentUserSsrQuery =
  (): typeof invariantGetCurrentUserSsrQuery =>
    memoizeLast(invariantGetCurrentUserSsrQuery);
