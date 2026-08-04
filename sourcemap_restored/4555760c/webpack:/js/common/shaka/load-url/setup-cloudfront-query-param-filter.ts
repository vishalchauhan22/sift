import { ShakaInstance } from '@js/common/shaka';
import { PartCredentialType } from '@js/common/video-player';
import { M3u8Adapter } from '@js/utilities/m3u8adapter';
import { getCredentialParamsString } from '@js/utilities/part-credentials';
import { removeQueryParams } from '@js/utilities/url';

import { DASH, M3U8 } from '@loomhq/shared-utilities/constants/mimes';

/* If native HLS is supported, we use a base64-encoded playlist to allow for passing in
 * query params into the individual playlists' filepath contents. This is because
 * we can only use native HLS decoding on those browsers, which removes our ability to
 * inject query params into each URL via this registerRequestFilter call.
 * See getHlsPlaylistEncodedWithCredentials in `utilities/playlistCredentialUtils.ts` for details
 * and https://github.com/shaka-project/shaka-player/issues/4129 for more context.
 */
export const setupCloudfrontQueryParamFilter = (
  player: ShakaInstance,
  partCredentials: Partial<PartCredentialType>,
  mimeType: string
): void => {
  // So if this platform supports native HLS, assume that it's base64-encoded and skip.
  if (M3u8Adapter.currentPlatformSupportsNativeHls() && mimeType === M3U8) {
    return;
  }

  const queryParameters = `?${getCredentialParamsString(partCredentials)}`;

  player.getNetworkingEngine().clearAllRequestFilters();

  // Intercept requests to segments and append the query parameters to authorize the request.
  player.getNetworkingEngine().registerRequestFilter((_type, request) => {
    if (request.uris.length == 0) {
      return;
    }

    const requestUrl = new URL(request.uris[0]);
    const hasValidReplaceParams = requestUrl.searchParams.get('S3BP') === '1';

    // If request url has S3BP=1, it means that the url has already been signed
    // and we should not replace the query params.
    if (mimeType === DASH && hasValidReplaceParams) {
      return;
    }

    // Strip potentially outdated or duplicate query params
    const strippedUri = removeQueryParams(
      request.uris[0],
      Object.keys(partCredentials)
    );

    // Attach fresh signature && replace a sequence of ? with a single char
    request.uris[0] = (strippedUri + queryParameters).replace(/\?+/, '?');
  });
};
