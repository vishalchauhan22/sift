import copy from 'copy-to-clipboard';
import * as logger from '@js/utilities/loggerx';
import { v4 as uuidv4 } from 'uuid';

import { validateUtils as validate } from '@loomhq/shared-utilities';
import {
  ATLASSIAN_OIDC_INITIATION_ROUTE,
  LOOM_URI,
} from '@js/constants/routes';
import { VALIDATE_URL_ORIGIN } from '@js/constants/metrics';
import * as metrics from '@js/utilities/metrics';
// http://stackoverflow.com/a/901144/696130
export function getParam(name: string, altLocation?: string): string {
  const filteredName = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const urlParams = new URLSearchParams(altLocation || location.search);
  const result = urlParams.get(filteredName);

  return String(result ? result : '');
}

export function hasParam(
  name: string,
  source: string | undefined = location.search
): boolean {
  const filteredName = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');

  return new URLSearchParams(source).has(filteredName);
}

/**
 * Starts download in same tab from a given string
 * @param {String} download - file name
 * @param {String} href - full link
 */
export function downloadLinkFromString(download: string, href: string): void {
  const link = document.createElement('a');

  link.download = download;
  link.href = href;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function isFromAnyUGCPage(): boolean {
  return (
    isFromUGCPage(validate.LOOM_SHARE_PAGE_REGEX_STR).fromPublicSharePage ||
    isFromUGCPage(validate.LOOM_SCREENSHOT_PAGE_REGEX_STR)
      .fromPublicSharePage ||
    isFromUGCPage(validate.LOOM_EDIT_PAGE_REGEX_STR).fromPublicSharePage ||
    isFromUGCPage(validate.LOOM_FOLDER_PAGE_REGEX_STR).fromPublicSharePage ||
    isFromUGCPage(validate.LOOM_SPACE_PAGE_REGEX_STR).fromPublicSharePage ||
    isFromUGCPage(validate.LOOM_PROFILE_PAGE_REGEX_STR).fromPublicSharePage
  );
}

export function isFromPublicSharePage(): IsFromUGCPageResult {
  return isFromUGCPage(validate.LOOM_SHARE_PAGE_REGEX_STR);
}

type IsFromUGCPageResult = {
  fromPublicSharePage: boolean;
  parentLocation: null | string;
};

function isFromUGCPage(regexExp: string): IsFromUGCPageResult {
  const result: IsFromUGCPageResult = {
    fromPublicSharePage: false,
    parentLocation: null,
  };

  try {
    if (
      window.parent != null &&
      window.parent.location != null &&
      window.parent.location.pathname != null
    ) {
      result.fromPublicSharePage = new RegExp(regexExp).test(
        window.parent.location.href
      );
      result.parentLocation = window.parent.location.href;
    }
  } catch (err) {
    const crossOriginError =
      err instanceof window.DOMException ||
      (err as Error).message.toLowerCase().indexOf('permission') > -1;

    if (!crossOriginError) {
      logger.warning(err, {
        message: 'error in fromPublicSharePage util',
      });
    }
  } finally {
    if (result.parentLocation == null) {
      result.parentLocation = document.referrer;
    }
  }

  return result;
}

export function isAliasPage(): boolean {
  if (
    window.parent != null &&
    window.parent.location != null &&
    window.parent.location.pathname != null
  ) {
    return new RegExp(validate.LOOM_ALIAS_PAGE_REGEX_STR).test(
      window.parent.location.href
    );
  }

  return false;
}

export function getFilteredPathnames(path: string): string[] {
  const pathnamesUnfiltered = path.split('/');
  const pathnames = pathnamesUnfiltered.filter(pathname => pathname !== '');

  return pathnames;
}

export function goToNewTab(url: string): void {
  const win = window.open(url, '_blank');

  win?.focus();
}

export function withHttps(url: string): string {
  let urlWithHttps = url;

  if (!/^https?:\/\//i.test(url)) {
    urlWithHttps = 'https://' + url;
  }

  return urlWithHttps;
}

export function inEmbedPlayer(): boolean {
  return validate.EMBED_VIDEO_ROUTE_PATHNAME_REGEX.test(
    window.location.pathname
  );
}

export const removeParam =
  (window: Window) =>
  (key: string): void => {
    const { pathname, search } = window.location;
    const url = pathname + removeParamsFromQueryString([key], search);

    window.history.replaceState('', '', url);
  };

/**
 * Remove specified param key, value pairs from a query string
 * @param keysToRemove Param keys to be removed from query string (values will also be removed)
 * @param search The query string being updated
 * @returns New query string with params removed
 */
export const removeParamsFromQueryString = (
  keysToRemove: string[],
  search: string
): string => {
  if (search.length === 0 || keysToRemove.length < 1) {
    return search;
  }

  const filteredParams = search
    .replace('?', '')
    .split('&')
    .filter(
      param =>
        !keysToRemove.some(keyToRemove => param.startsWith(`${keyToRemove}=`))
    )
    .join('&');

  if (!filteredParams) {
    return '';
  }

  return `?${filteredParams}`;
};

/**
 * Remove param key/value pairs from a url
 * @param url The url that may include query params
 * @param params The query keys to be removed
 * @returns New url with query params removed
 */
export function removeQueryParams(url: string, params: string[]): string {
  let newUrl = url;
  let urlObject: URL;

  try {
    urlObject = new URL(newUrl);
  } catch (_) {
    return url;
  }

  params.forEach(key => {
    urlObject.searchParams.delete(key);
  });
  newUrl = urlObject.href;

  return newUrl;
}

/**
 * Update a specific URL parameter with a new value
 * @param url The URL to update
 * @param paramName The parameter name to update
 * @param paramValue The new value for the parameter
 * @returns New query string with the parameter updated
 */
export function updateQueryParam(
  url: string,
  paramName: string,
  paramValue: string
): string {
  let urlObject: URL;

  try {
    urlObject = new URL(url);
  } catch (_) {
    // If URL parsing fails, try to work with query string directly
    const queryStart = url.indexOf('?');
    if (queryStart === -1) {
      // No existing query string, return new one
      return `?${paramName}=${encodeURIComponent(paramValue)}`;
    }

    const search = url.substring(queryStart);
    const searchParams = new URLSearchParams(search);
    searchParams.set(paramName, paramValue);
    return `?${searchParams.toString()}`;
  }

  urlObject.searchParams.set(paramName, paramValue);

  return urlObject.search;
}

const URL_TRAILING_PUNCTUATION = /[.,;?!:)\]}]+$/;

/**
 * Finds common punctuation characters at the end of a URL and strips them out.
 * @param {String} url - The URL to be inspected.
 * @returns {[string, string]} [trimmedUrl, trail] - A pair with the URL after
 * removing any trailing characters and the trailing characters themselves.
 */
export const splitTrailingPunctuation = (url: string): [string, string] => {
  const matches = url.match(URL_TRAILING_PUNCTUATION);
  const trailing = matches !== null ? matches[0] : '';
  const trimmedUrl = trailing.length
    ? url.substring(0, url.length - trailing.length)
    : url;

  return [trimmedUrl, trailing];
};

export const parseUrlTime = (time: string): number => {
  const defaultTime = [0, 0, 0, 0, 0];
  const [, , min, , sec] = time.match(/((\d+)m)?((\d+)s?)$/) || defaultTime;

  return Number(min || 0) * 60 + Number(sec || 0);
};

export function createUrlWithParams(
  url: string,
  params: Record<string, string | undefined>
): string {
  const link = new URL(url);
  const safeParams: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      safeParams[key] = value;
    }
  });

  link.search = new URLSearchParams(safeParams).toString();

  return link.toString();
}

export const getPathnameForMetrics = (): string => {
  // Remove video IDs since they introduce high cardinality for metrics
  if (inEmbedPlayer() || isFromAnyUGCPage()) {
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);

    // Handle special cases for folder and space paths
    switch (segments[0]) {
      case 'looms':
        return '/looms';
      case 'spaces':
        return '/spaces';
      case 'profile':
        return '/profile';
      default:
        // For other cases, remove the last segment
        return pathname.slice(0, pathname.lastIndexOf('/'));
    }
  }

  return window.location.pathname;
};

export const copyVideoUrlWithShareId = ({
  videoUrl,
  copyToClipboard = true,
}: {
  videoUrl?: string;
  copyToClipboard?: boolean;
  isFlagEnabled?: boolean;
}): [string, string | null] => {
  const shareId = uuidv4();

  if (!videoUrl) {
    return ['', null];
  }

  try {
    const url = new URL(videoUrl);

    const urlWithShareId = url.search.length
      ? `${videoUrl}&sid=${shareId}`
      : `${videoUrl}?sid=${shareId}`;

    if (copyToClipboard) {
      copy(urlWithShareId, { format: 'text/plain' });
    }

    return [urlWithShareId, shareId];
  } catch (_) {
    return [videoUrl, null];
  }
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);

    return true;
  } catch (_) {
    return false;
  }
};

export const isLoomOrAtlassianRedirect = (url: string): boolean => {
  try {
    const redirectUrl = new URL(url);
    const origin = redirectUrl.origin;

    const isValidOrigin = [ATLASSIAN_OIDC_INITIATION_ROUTE, LOOM_URI].includes(
      origin
    );

    metrics.incrementMetric(VALIDATE_URL_ORIGIN, {
      status: 'success',
    });

    return isValidOrigin;
  } catch (e) {
    metrics.incrementMetric(VALIDATE_URL_ORIGIN, {
      status: 'error',
    });

    return false;
  }
};
