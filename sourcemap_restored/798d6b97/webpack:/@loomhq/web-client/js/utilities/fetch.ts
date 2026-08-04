import { LOOM_WEB_REQUEST_SOURCE } from '@js/constants/runtimeConfig';

import { useRoutingHeaderStore } from '@js/common/request-routing/routingHeaderStore';
import isomorphicFetch from 'isomorphic-fetch';

import * as logger from '@js/utilities/loggerx';

import { store } from '@js/utilities/store-init';

import { HEADER_X_LOOM_REQUEST_SOURCE } from '@loomhq/shared-utilities/constants/http';

import { EntityRoutingHeader } from '@loomhq/shared-utilities/constants/siteEntities';

import { getAtlassianIdHeader } from './atlassianId';

const urlToString = (input: RequestInfo | URL): string => {
  if (typeof input === 'string') {
    return input;
  }
  if (input instanceof URL) {
    return input.toString();
  }
  return input.url;
};

const isRelative = (url: string): boolean => url.startsWith('/');

/**
 * @returns spreadable routing headers if the requested url is relative AND
 * there is a defined default entity routing, else returns an empty object
 */
const maybeGetRoutingHeaders = (
  input: RequestInfo | URL
): { [EntityRoutingHeader]?: string } => {
  const defaultEntityRoutingHeader =
    useRoutingHeaderStore.getState().entityRoutingHeader;

  if (isRelative(urlToString(input)) && defaultEntityRoutingHeader) {
    return { [EntityRoutingHeader]: defaultEntityRoutingHeader };
  }

  return {};
};

/**
 * Wraps the standard fetch API to ensure we have a chance to enforce
 * common options, like headers.
 */
// eslint-disable-next-line import/no-default-export
export default async function fetch(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<Response> {
  const headers = new Headers({
    [HEADER_X_LOOM_REQUEST_SOURCE]: LOOM_WEB_REQUEST_SOURCE,
    ...getAtlassianIdHeader(),
    ...maybeGetRoutingHeaders(input),
    ...init?.headers,
  });
  const options = {
    ...init,
    headers,
  };

  const response = await isomorphicFetch(input, options);

  if (
    response.status === 401 &&
    (await response.text()) === 'Unauthorized, SST mismatch'
  ) {
    logger.warning('fetch util received a 401', {
      response,
      storeExists: Boolean(store),
    });
  }

  return response;
}
