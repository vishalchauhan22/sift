import React, { FC, ReactNode } from 'react';

import * as loggerx from '@js/utilities/loggerx';

import { useGetCurrentUserSsrQuery } from '@loomhq/graphql-preload';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import { CurrentUserError } from '../errors/current-user-error';
import { getMemoizedInvariantGetCurrentUserSsrQuery } from '../schema/invariantGetCurrentUserSsrQuery';

const invariantGetCurrentUserSsrQuery =
  getMemoizedInvariantGetCurrentUserSsrQuery();

/**
 * Asserts that the current user has been loaded before rendering children.
 * @throws CurrentUserError if the current user is not as expected.
 * @returns null or children
 */
export const RequireCurrentUserLoaded: FC<
  React.PropsWithChildren<{ children: ReactNode }>
> = ({ children }) => {
  const { loading, data, error, networkStatus } = useGetCurrentUserSsrQuery({
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });

  if (loading && !data) {
    // We are still loading the current user, so it isn't safe to render children.
    // Degrade gracefully by not rendering anything until the current user is loaded.
    // This is unexpected and should have been handled on the server, so log an error.
    loggerx.error(
      new CurrentUserError('Current User not preloaded'),
      { apolloError: error, loading, networkStatus },
      { feature: Feature.UserApolloCache }
    );

    return null;
  }

  try {
    invariantGetCurrentUserSsrQuery(data);
  } catch (e) {
    loggerx.error(
      new CurrentUserError('Current User invariant failed', { cause: e }),
      { apolloError: error, loading, networkStatus },
      { feature: Feature.UserApolloCache }
    );

    throw e;
  }

  return <>{children}</>;
};
