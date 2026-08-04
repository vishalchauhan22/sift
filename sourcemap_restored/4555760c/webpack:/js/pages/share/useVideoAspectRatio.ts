import { useVideoContext } from '@js/common/video-player';
import clamp from 'lodash/clamp';

const MIN_ASPECT_RATIO = 4 / 3;
const MAX_ASPECT_RATIO = 2 / 1;

export const useVideoAspectRatio = (): number => {
  const {
    video: {
      videoProperties: { height, width },
    },
  } = useVideoContext();

  if (!height || !width) {
    return MAX_ASPECT_RATIO;
  }

  const aspectRatio = clamp(width / height, MIN_ASPECT_RATIO, MAX_ASPECT_RATIO);

  return aspectRatio;
};
