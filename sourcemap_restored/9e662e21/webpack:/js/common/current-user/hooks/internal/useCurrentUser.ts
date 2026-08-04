import { useGetCurrentUserSsrQuery } from '@loomhq/graphql-preload';

import { getMemoizedInvariantGetCurrentUserSsrQuery } from '../../schema/invariantGetCurrentUserSsrQuery';
import { CurrentUserOrLoggedOut } from '../../schema/types';

const invariantGetCurrentUserSsrQuery =
  getMemoizedInvariantGetCurrentUserSsrQuery();

/**
 * @internal FOR INTERNAL USE ONLY, do not import this
 *
 * Used to retrieve the current user. Makes assumptions that the user has been preloaded. Preloading is handled
 * server-side, and then guaranteed in LoomProviders by RequireCurrentUserLoaded.
 *
 * @throws CurrentUserError if assumptions about the user being loaded correctly are not met.
 * @returns The current user. The result will have a __typename of 'GetCurrentUserPayload' (for logged in users) or 'UserNotAuthorizedError' (for logged out users).
 */
export const useCurrentUser = (): CurrentUserOrLoggedOut => {
  // Purposely ignore ApolloErrors here, as we might have partial data
  const { data } = useGetCurrentUserSsrQuery({
    fetchPolicy: 'cache-only',
    errorPolicy: 'all',
  });

  return invariantGetCurrentUserSsrQuery(data);
};
