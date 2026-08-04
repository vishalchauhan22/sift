import { ApolloLink, type Operation, type NextLink } from '@apollo/client';
import { buildShardingContext } from './utils';
import type { EntityLookupMetadata } from '@loomhq/shared-utilities/constants/siteEntities';

interface GraphQLContext {
  headers?: Record<string, string>;
  sharding?: EntityLookupMetadata;
  [key: string]: unknown;
}

/**
 * Apollo Link that automatically processes sharding context from operation context.
 *
 * This link checks for `context.sharding` in GraphQL operations and automatically
 * applies the appropriate routing headers.
 */
export const createShardingContextLink = (): ApolloLink => {
  return new ApolloLink((operation: Operation, forward: NextLink) => {
    const context = operation.getContext() as GraphQLContext;

    if (context.sharding) {
      const { sharding, ...rest } = context;
      const newContext = buildShardingContext(sharding, rest);
      operation.setContext(newContext);
    }

    return forward(operation);
  });
};
