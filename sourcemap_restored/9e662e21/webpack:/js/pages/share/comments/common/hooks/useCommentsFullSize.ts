import { useViewportContext } from '@js/common/video-player';
import { LARGE_TABLET_MIN_WIDTH } from '@js/constants/breakpoints';

export function useCommentsFullSize(): boolean {
  const { width } = useViewportContext();

  return width >= LARGE_TABLET_MIN_WIDTH;
}
