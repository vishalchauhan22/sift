import * as logger from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';

export type ClipVideoClip = [number, number];

// Sanitize the clip range to make sure we get a valid clip for the video player
export const sanitizeClip = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  video: any,
  clip: ClipVideoClip
): [number, number] => {
  if (!video) {
    return [0, 0];
  }

  const clipStart = Math.max(clip?.[0] ?? 0, 0);
  let clipEnd = clip?.[1] ?? video.videoProperties?.playableDuration;

  if (clipStart > clipEnd) {
    logger.error(
      Error('clip end is before clip start'),
      {
        clip,
        videoId: video.id,
      },
      { feature: Feature.VideoPlayer }
    );

    clipEnd = video.videoProperties?.playableDuration ?? 0;
  }

  return [Math.round(clipStart), Math.round(clipEnd)];
};
