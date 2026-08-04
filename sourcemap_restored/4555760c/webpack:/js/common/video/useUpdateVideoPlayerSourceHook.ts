import { SERVER_ERROR_PAGE } from '@js/constants/routes';

import { useVideoPasswordContext } from '@js/common/video-password/useVideoPasswordContext';
import { useCallback } from 'react';
import * as logger from '@js/utilities/loggerx';
import { getParam, removeParam } from '@js/utilities/url';

import { postSessionRawURL } from '@js/utilities/video-basic';
import { getLoomBrowserSupportedMimeTypes } from '@js/utilities/video-supported-mime';

import {
  DASH,
  M3U8,
  MP4,
  VIDEO_WEBM,
  FILE_EXTENSION_MP4,
  FILE_EXTENSION_WEBM,
  FILE_EXTENSION_M3U8,
  FILE_EXTENSION_MPD,
} from '@loomhq/shared-utilities/constants/mimes';

const sharedAppSource = getParam('sharedAppSource');
if (sharedAppSource) {
  removeParam(window)('sharedAppSource');
}

export const useUpdateVideoPlayerSourceHook = (): {
  updateVideoPlayerSourceHook: ({ videoId }: { videoId: string }) => void;
} => {
  const { password } = useVideoPasswordContext();

  const updateVideoPlayerSourceHook = useCallback(
    ({ videoId }: { videoId: string }) => {
      Promise.resolve(getLoomBrowserSupportedMimeTypes()).then(
        supportedMimeTypes => {
          return new Promise(resolve => {
            const forceOriginal = false;

            postSessionRawURL(
              videoId,
              password,
              (sourceUrl, partCredentials) => {
                const a = document.createElement('a');
                a.href = sourceUrl!;

                let sourceMimeType;
                if (a.pathname.endsWith(FILE_EXTENSION_MP4)) {
                  sourceMimeType = MP4;
                } else if (a.pathname.endsWith(FILE_EXTENSION_WEBM)) {
                  sourceMimeType = VIDEO_WEBM;
                } else if (a.pathname.endsWith(FILE_EXTENSION_M3U8)) {
                  sourceMimeType = M3U8;
                } else if (a.pathname.endsWith(FILE_EXTENSION_MPD)) {
                  sourceMimeType = DASH;
                }
                resolve({ partCredentials, sourceMimeType, sourceUrl });
              },
              forceOriginal,
              supportedMimeTypes
            );
          }).catch(error => {
            logger.warning('Error getting video sources', error);
            window.location.href = SERVER_ERROR_PAGE;
          });
        }
      );
    },
    [password]
  );

  return {
    updateVideoPlayerSourceHook,
  };
};
