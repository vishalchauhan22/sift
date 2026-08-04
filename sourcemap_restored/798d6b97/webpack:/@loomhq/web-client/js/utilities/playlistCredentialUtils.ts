import { HEADER_ACCEPT } from '@loomhq/shared-utilities/constants/http';
import { M3U8, PLAIN_TEXT } from '@loomhq/shared-utilities/constants/mimes';
import * as uBelt from '@loomhq/utility-belt';
import fetch from '@js/utilities/fetch';

import * as logger from '@js/utilities/loggerx';

import { M3u8Adapter } from './m3u8adapter';
import {
  getCredentialParamsString,
  PartCredentialType,
} from './part-credentials';

const getCdnPrefix = (playlistUrl: string | URL): string => {
  const url = new URL(playlistUrl);

  return `${url.protocol}//${url.host}`;
};

export const getAbsolutePath = (playlistUrl: string): string => {
  const a = document.createElement('a');

  a.href = playlistUrl;

  const cdnPrefix = getCdnPrefix(playlistUrl);
  const parentPath = a.pathname.split('/').slice(0, -1).join('/');

  // Prepend each URL with the path on CloudFront. By default, these part
  // URLs are relative, which works when we're referencing the playlist
  // directly off of CloudFront, but we're actually referencing
  // blob://loom.com in this case.
  return cdnPrefix + parentPath;
};

/**
 * We take the URL of the m3u8 and do the following:
 * - convert every URL to an absolute URL
 * - append the CF signature to every single URL
 * We do this iteratively with every playlist referenced in the master m3u8,
 * so in the end all the URIs have the CF signatures appended
 *
 * The reason to do this and not have the player do it:
 * hls.js can do this, but hls.js does not support iOS, so we have do it anyway
 * wherever native HLS is supported and preferred (we couldn't find a better way)
 *
 *  @returns A single string with base64 encoded playlists
 */
export const getHlsPlaylistEncodedWithCredentials = async (
  playlistUrl: string,
  partCredentials: Partial<PartCredentialType>
): Promise<string> => {
  const credentialParamsString = getCredentialParamsString(partCredentials);

  let attempts = 0;
  const fetchPlaylistAndIncrement = (): Promise<Response | Error> => {
    attempts++;
    return fetch(playlistUrl, {
      headers: {
        [HEADER_ACCEPT]: PLAIN_TEXT,
      },
    });
  };

  const { hadSuccess, result } = await uBelt.retry({
    fn: () => uBelt.errorBoundary(() => fetchPlaylistAndIncrement()),
    shouldRetry: r => r instanceof Error || r.status === 503,
    remainingAttempts: 4,
  });

  if (!hadSuccess || result instanceof Error || !result.ok) {
    const errorMessage = `Error when base64 encoding HLS playlist with credentials: ${
      result instanceof Error ? result.message : result.statusText
    }`;
    logger.warning(errorMessage, {
      errorName: result instanceof Error && result.name,
      statusCode: result instanceof Response && result.status,
    });

    throw new Error(errorMessage);
  }

  if (attempts > 1) {
    logger.info('Fetch error resolved from retry', {
      attempts,
    });
  }

  const respText = await result.text();

  const absolutePath = getAbsolutePath(playlistUrl);
  const finalPlaylist = M3u8Adapter.base64EncodeUrls(
    respText,
    absolutePath,
    credentialParamsString
  );
  const processor = (url: string): Promise<string> => {
    return getHlsPlaylistEncodedWithCredentials(url, partCredentials);
  };
  const processedPlaylist = await M3u8Adapter.applyProcessToPlaylists(
    finalPlaylist,
    processor
  );
  if (!M3u8Adapter.validateSubplaylist(processedPlaylist)) {
    throw new Error('Empty subplaylist found when base64 encoding manifest');
  }
  return `data:${M3U8};base64,${window.btoa(processedPlaylist)}`;
};

export const getDashPlaylistWithCredentials = (
  playlistUrl: string,
  partCredentials: Partial<PartCredentialType>
): string => {
  return playlistUrl.replace(
    /.mpd/,
    `.mpd?${getCredentialParamsString(partCredentials)}`
  );
};
