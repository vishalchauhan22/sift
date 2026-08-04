import { M3u8Adapter } from '@js/utilities/m3u8adapter';

import {
  DASH,
  M3U8,
  MP4,
  VIDEO_WEBM,
  VideoPlaybackMimeType,
} from '@loomhq/shared-utilities/constants/mimes';

import { PartCredentialType } from '../../../utilities/part-credentials';
import { getHlsPlaylistEncodedWithCredentials } from '../../../utilities/playlistCredentialUtils';

type VideoPlaybackMimeTypeCopy = VideoPlaybackMimeType;

const extensionToMimeMap = {
  mp4: MP4,
  webm: VIDEO_WEBM,
  m3u8: M3U8,
  mpd: DASH,
};
const getMimeTypeFromSourceUrl = (sourceUrl: string) => {
  const a = document.createElement('a');

  a.href = sourceUrl;
  const extension = a.pathname.split('.').pop();
  // @ts-expect-error ignore due to enabling strict null checks
  const mimeType = extensionToMimeMap[extension];

  if (!mimeType) {
    throw Error('Unrecognized extension: ' + extension);
  }

  return mimeType;
};

export const processVideoSource = async (
  plainSourceUrl: string,
  partCredentials: Partial<PartCredentialType>,
  isPlaylistValidationEnabled = false
): Promise<PlaylistInfo> => {
  const sourceMimeType = getMimeTypeFromSourceUrl(plainSourceUrl);
  const hasCredentials = Object.keys(partCredentials).length > 0;

  const supportsNativeHls = M3u8Adapter.currentPlatformSupportsNativeHls();
  const sourceUrlIsTranscoded = plainSourceUrl.includes(
    '/sessions/transcoded/'
  );

  let sourceUrl: string;

  if (hasCredentials && supportsNativeHls && sourceMimeType === M3U8) {
    sourceUrl = await getHlsPlaylistEncodedWithCredentials(
      plainSourceUrl,
      partCredentials,
      isPlaylistValidationEnabled
    );
  } else {
    sourceUrl = plainSourceUrl;
  }

  return {
    plainSourceUrl,
    sourceUrl,
    sourceMimeType,
    partCredentials,
    sourceUrlIsTranscoded,
  };
};

export type PlaylistInfo = {
  sourceUrl: string;
  plainSourceUrl: string;
  partCredentials: Partial<PartCredentialType>;
  sourceMimeType: VideoPlaybackMimeTypeCopy;
  sourceUrlIsTranscoded: boolean;
};
