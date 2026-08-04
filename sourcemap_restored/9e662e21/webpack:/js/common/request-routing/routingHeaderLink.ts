import { ApolloLink } from '@apollo/client';

import { EntityRoutingHeader } from '@loomhq/shared-utilities/constants/siteEntities';

import { useRoutingHeaderStore } from './routingHeaderStore';

export const getRoutingHeaderLink = (): ApolloLink =>
  new ApolloLink((operation, forward) => {
    const globalEntityRoutingHeader =
      useRoutingHeaderStore.getState().entityRoutingHeader;
    const operationEntityRoutingHeader =
      operation.getContext()?.headers?.[EntityRoutingHeader];
    // The more specific value coming from the operation itself takes precedence
    const resolvedEntityRoutingHeader =
      operationEntityRoutingHeader ?? globalEntityRoutingHeader;
    if (resolvedEntityRoutingHeader) {
      operation.setContext(({ headers }) => {
        return {
          headers: {
            ...headers,
            [EntityRoutingHeader]: resolvedEntityRoutingHeader,
          },
        };
      });
    }

    return forward(operation);
  });
