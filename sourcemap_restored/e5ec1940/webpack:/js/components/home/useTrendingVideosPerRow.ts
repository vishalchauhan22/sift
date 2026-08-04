import { LARGE_TABLET_MIN_WIDTH } from '@js/constants/breakpoints';

import { useMedia } from '@loomhq/lens';

// eslint-disable-next-line import/no-default-export
export default function useTrendingVideosPerRow(): number {
  return useMedia(
    [
      `(max-width: ${LARGE_TABLET_MIN_WIDTH}px)`,
      `(min-width: ${LARGE_TABLET_MIN_WIDTH}px)`,
    ],
    [1, 2],
    2
  );
}
