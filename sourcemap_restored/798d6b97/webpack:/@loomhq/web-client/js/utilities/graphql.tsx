import { LOOM_URI, LOOM_WS_URI } from '@js/constants/routes';
import { LOOM_WEB_REQUEST_SOURCE } from '@js/constants/runtimeConfig';
import { LOOM_VERSION } from '@js/constants/versions';

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { SentryLink } from 'apollo-link-sentry';
import { END_USER_SESSION_MODAL } from '@js/common/modal-container/modal-components/constants';
import { useModals } from '@js/common/modal-container/useModals';
import { getRoutingHeaderLink } from '@js/common/request-routing/routingHeaderLink';
import { useRoutingHeaderStore } from '@js/common/request-routing/routingHeaderStore';
import { createShardingContextLink } from '@js/common/request-routing/shardingContextLink';
import { createClient } from 'graphql-ws';
import { TrimDisfluenciesDocument } from '@js/pages/consolidated-edit/right-nav-bar/TrimDisfluencies.generated';
import { EditTabRemoveFillerWordsPlusDocument } from '@js/pages/share/edit-tab/editTabRemoveFillerWordsPlus.generated';
import * as logger from '@js/utilities/loggerx';

import { dataIdFromObject, typePolicies } from '@loomhq/graphql-preload';
import { HEADER_X_LOOM_REQUEST_SOURCE } from '@loomhq/shared-utilities/constants/http';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { EntityLookupMetadata } from '@loomhq/shared-utilities/constants/siteEntities';

import { getAtlassianIdHeader } from './atlassianId';
import { isDevOrTest, isLocal } from '../constants/environment';

import type { NormalizedCacheObject, Operation } from '@apollo/client';

declare global {
  interface Window {
    __APOLLO_STATE__?: NormalizedCacheObject;
  }
}

let client: ApolloClient<NormalizedCacheObject> | null = null;
let clientInsights: ApolloClient<NormalizedCacheObject> | null = null;
let cache: InMemoryCache | null = null;
let link: ApolloLink | null = null;

const commonHeaders: {
  [HEADER_X_LOOM_REQUEST_SOURCE]: string;
  'x-atlassian-auth-aaid'?: string;
} = {
  [HEADER_X_LOOM_REQUEST_SOURCE]: LOOM_WEB_REQUEST_SOURCE,
  ...getAtlassianIdHeader(),
};

interface Definition {
  kind: string;
  operation?: string;
}

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const initiateGraphQLClient = () => {
  cache = new InMemoryCache({
    typePolicies,
    dataIdFromObject,
  }).restore(window.__APOLLO_STATE__ || {});

  const unbatchedHttpLink = new HttpLink({
    uri: (operation: Operation) => {
      return isLocal
        ? `${LOOM_URI}/graphql?operationName=${operation.operationName}`
        : `${LOOM_URI}/graphql`;
    },
    credentials: 'include',
    headers: commonHeaders,
  });

  // We'll use only 3 retries instead of 5

  const retryLink = new RetryLink({
    attempts: (count, operation, error) => {
      return (
        count < 4 &&
        error.statusCode === 504 &&
        (getMainDefinition(TrimDisfluenciesDocument).name?.value ===
          operation.operationName ||
          getMainDefinition(EditTabRemoveFillerWordsPlusDocument).name
            ?.value === operation.operationName)
      );
    },
    delay: count => {
      return count * 1000;
    },
  });

  const httpLink = unbatchedHttpLink;

  // Create a WebSocket link:
  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${LOOM_WS_URI}/graphql`,
      keepAlive: 60_000 * 20, // 20 minutes
      shouldRetry: () => true,
    })
  );

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  // https://www.apollographql.com/docs/link/composition.html#directional
  const partialLink = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation }: Definition = getMainDefinition(query);

      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const { openModal } = useModals.getState();

  const onErrorLink = onError(
    ({ response, graphQLErrors, networkError, operation }) => {
      if (graphQLErrors) {
        response?.errors?.map(err =>
          logger.warning(err, {
            message: 'Error while executing graphql operation',
            operation,
            graphQLErrors,
          })
        );
      }

      if (networkError) {
        if (
          networkError['statusCode'] === 401 &&
          networkError['result'] === 'Unauthorized, SST mismatch'
        ) {
          openModal({ modalType: END_USER_SESSION_MODAL });
          logger.warning('apollo received a 401', {
            operation,
          });
        }

        logger.warning(
          networkError,
          {
            operation: operation.operationName,
          },
          {
            feature: Feature.Network,
          }
        );
      }
    }
  );

  const sentryLink = new SentryLink({
    setTransaction: true,
    attachBreadcrumbs: {
      includeQuery: true,
      includeVariables: true,
      includeError: true,
    },
  });

  const routingHeaderLink = getRoutingHeaderLink();
  const shardingContextLink = createShardingContextLink();

  link = ApolloLink.from([
    routingHeaderLink,
    // Override the sharding context at a query level, if present
    shardingContextLink,
    onErrorLink,
    retryLink,
    sentryLink,
    partialLink,
  ]);

  client = new ApolloClient({
    link,
    cache,
    name: 'web',
    version: LOOM_VERSION,
    connectToDevTools: isDevOrTest,
    ssrForceFetchDelay: 100,
  });
};

/**
 * @deprecated Directly import the GraphQL hooks from generated files
 */
// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const getGraphQLClient = (
  entityLookupMetadata?: EntityLookupMetadata
): ApolloClient<NormalizedCacheObject> => {
  if (entityLookupMetadata) {
    useRoutingHeaderStore
      .getState()
      .setEntityRoutingHeader(entityLookupMetadata);
  }

  if (!client || !cache) {
    try {
      initiateGraphQLClient();
    } catch (err) {
      logger.error(
        err,
        {
          message: 'Failed to initialize graphql client',
        },
        { feature: Feature.ApolloServer }
      );
    }
  }

  if (!client) {
    throw new Error('Failed to initialize graphql client');
  }

  return client;
};

const initiateGraphQlClientInsights = () => {
  const insightsHttpLink = new HttpLink({
    uri: `${LOOM_URI}/insights-api/graphql`,
    credentials: 'include',
    headers: commonHeaders,
  });

  // We'll use only 3 retries instead of 5
  const retryLink = new RetryLink({ attempts: { max: 3 } });

  const onErrorLink = onError(
    ({ response, graphQLErrors, networkError, operation }) => {
      if (graphQLErrors) {
        response?.errors?.map(err =>
          logger.warning(err, {
            message: 'Error while executing insights graphql operation',
            operation,
            graphQLErrors,
          })
        );
      }

      if (networkError) {
        logger.warning(
          networkError,
          {
            message: 'Network Error while executing insights graphql operation',
            operation,
            networkError,
          },
          { feature: Feature.Network }
        );
      }
    }
  );

  const sentryLink = new SentryLink({
    setTransaction: true,
    attachBreadcrumbs: {
      includeQuery: true,
      includeVariables: true,
      includeError: true,
    },
  });

  const insightsLink = ApolloLink.from([
    onErrorLink,
    retryLink,
    sentryLink,
    insightsHttpLink,
  ]);

  clientInsights = new ApolloClient({
    link: insightsLink,
    cache: new InMemoryCache({
      typePolicies,
      dataIdFromObject,
    }),
    name: 'web-insights',
    version: LOOM_VERSION,
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      // introspectionfragmentmatcher
      // workaround to avoid an error/bug with apollo
      // https://useloom.slack.com/archives/C79LNU2UF/p1598455412086700
      mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
    },
  });
};

export const getGraphQlClientInsights =
  (): ApolloClient<NormalizedCacheObject> => {
    if (!clientInsights) {
      try {
        initiateGraphQlClientInsights();
      } catch (err) {
        logger.error(
          err,
          {
            message: 'Failed to initialize graphql client',
          },
          { feature: Feature.ApolloServer }
        );
      }
    }

    if (!clientInsights) {
      throw new Error('Failed to initialize graphql client');
    }

    return clientInsights;
  };

export function mockClient(
  mockClient: ApolloClient<NormalizedCacheObject>
): void {
  client = mockClient;
  clientInsights = mockClient;
  cache = new InMemoryCache();
}
