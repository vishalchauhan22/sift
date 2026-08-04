import { ApolloProvider } from '@apollo/client';

import React from 'react';

import { EntityLookupMetadata } from '@loomhq/shared-utilities/constants/siteEntities';
// Valid usage of GraphqL utility
// eslint-disable-next-line no-restricted-imports
import { getGraphQLClient } from '@js/utilities/graphql';

type GraphQlProviderProps = {
  children: React.ReactNode;
  entityLookupMetadata?: EntityLookupMetadata | undefined;
};

export const GraphQlProvider = ({
  children,
  entityLookupMetadata,
}: GraphQlProviderProps): JSX.Element => (
  <ApolloProvider client={getGraphQLClient(entityLookupMetadata)}>
    {children}
  </ApolloProvider>
);
