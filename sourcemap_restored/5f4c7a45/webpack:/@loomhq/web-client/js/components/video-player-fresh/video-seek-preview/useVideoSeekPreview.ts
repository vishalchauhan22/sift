import { Feature } from '@loomhq/shared-utilities/constants/product';
import { useVideoPasswordContext } from '@js/common/video-password';

import { useVideoSeekPreviewUrl } from '@js/components/video-player-fresh/video-seek-preview/useVideoSeekPreviewUrl';
import * as logger from '@js/utilities/loggerx';

import { useGetVideoSeekPreviewQuery } from './GetVideoSeekPreview.generated';

export function useSeekPreviewUrl(
  videoId: string,
  trimId?: number | null
): void {
  const { password } = useVideoPasswordContext();
  const { setSeekPreviewUrl } = useVideoSeekPreviewUrl();

  useGetVideoSeekPreviewQuery({
    fetchPolicy: 'no-cache',
    variables: {
      videoId,
      trimId: trimId ? `${trimId}` : null,
      password,
    },
    skip: !videoId,
    onError: error => {
      if (error.networkError) {
        return;
      }

      logger.error(
        'Video seek preview url query errored',
        { error, videoId, trimId },
        { feature: Feature.VideoPlayer }
      );
    },
    onCompleted: data => {
      try {
        if (!data.getVideo || data.getVideo.__typename !== 'RegularUserVideo') {
          logger.error(
            new Error(
              'Error fetching video seek preview url - invalid response'
            ),
            { getVideoSeekPreviewData: JSON.stringify(data.getVideo), videoId },
            { feature: Feature.VideoPlayer }
          );
          throw new Error('Error fetching video seek preview url');
        }

        setSeekPreviewUrl(videoId, data.getVideo.seekPreviewCdnUrl);
      } catch (error) {
        logger.error(error, { videoId }, { feature: Feature.VideoPlayer });
      }
    },
  });
}
