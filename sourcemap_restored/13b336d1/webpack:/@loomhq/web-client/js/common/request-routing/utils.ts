import {
  EntityRoutingHeader,
  type EntityLookupMetadata,
} from '@loomhq/shared-utilities/constants/siteEntities';
import { routingUtils } from '@loomhq/shared-utilities';

interface GraphQLContext {
  headers?: Record<string, string>;
  [key: string]: unknown;
}

export function buildShardingContext(
  shardingContext: EntityLookupMetadata,
  existingContext?: GraphQLContext
): GraphQLContext {
  const queryContext = existingContext ?? {};
  const contextHeaders = queryContext.headers || {};

  return {
    ...queryContext,
    headers: {
      ...contextHeaders,
      [EntityRoutingHeader]:
        routingUtils.encodeEntityRoutingMetadata(shardingContext),
    },
  };
}
