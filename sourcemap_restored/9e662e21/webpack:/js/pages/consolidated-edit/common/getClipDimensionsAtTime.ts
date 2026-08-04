import { ClipDimensions } from './types';

export const getClipDimensionsAtTime = ({
  clipsDimensions,
  timeMs,
}: {
  clipsDimensions: ClipDimensions[];
  timeMs: number;
}): ClipDimensions | null => {
  for (const clipDimensions of clipsDimensions) {
    if (
      timeMs >= clipDimensions.clipStartTimeMs &&
      timeMs < clipDimensions.clipEndTimeMs
    ) {
      return clipDimensions;
    }
  }

  return null;
};
