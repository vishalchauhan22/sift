import { ShakaInstance, VideoStreamingMimeTypeCopy } from '@js/common/shaka';
import { PartCredentialType } from '@js/common/video-player';
import { removeQueryParams } from '@js/utilities/url';

import { setupCloudfrontQueryParamFilter } from './setup-cloudfront-query-param-filter';

// NOTE(tatiana): We may want to consider making this an async function instead
export const loadUrl = ({
  player,
  manifestUrl,
  partCredentials,
  mimeType,
  startTimeSeconds,
}: {
  player: ShakaInstance;
  manifestUrl: string;
  partCredentials: Partial<PartCredentialType>;
  mimeType: VideoStreamingMimeTypeCopy;
  startTimeSeconds?: number;
}): Promise<ShakaInstance> => {
  // setup Cloudfront query parameter filter
  setupCloudfrontQueryParamFilter(player, partCredentials, mimeType);

  // remove credentials from URL, if any, before loading the player.
  // The new ones will be applied by shaka-player thanks to callback passed
  // to registerRequestFilter.
  const urlWithoutCredentials = removeQueryParams(
    manifestUrl,
    Object.keys(partCredentials)
  );

  return player.load(urlWithoutCredentials, startTimeSeconds);
};
