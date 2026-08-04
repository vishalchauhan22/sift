import debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef } from 'react';

import ResizeObserver from 'resize-observer-polyfill';

/**
 * When AI Nudges are visible in right panel's comment input box,
 * we apply a gradient bg to comment input container to visually separate
 * nudges. This provides the grey bg to fill out the full bottom portion
 * of the comment input container.
 */
export function useGetGradientBreakpointForCustomBgStyle(
  containerRef: React.RefObject<HTMLDivElement>
): number {
  const bgGradientBreakpoint = useRef<number>(100);

  const handleResize = useMemo(
    () =>
      debounce((entries: ResizeObserverEntry[]): void => {
        for (const entry of entries) {
          const { borderBoxSize } = entry;

          borderBoxSize.forEach(size => {
            const breakpoint = calculateGradientBreakpoint(size.blockSize);

            bgGradientBreakpoint.current = breakpoint;
          });
        }
      }),
    []
  );

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;

      const resizeObserver = new ResizeObserver(handleResize);

      resizeObserver.observe(container);

      return () => {
        resizeObserver.unobserve(container);
        resizeObserver.disconnect();
      };
    }
  }, [containerRef, handleResize]);

  return bgGradientBreakpoint.current;
}

// TODO: OUT-1095
// This is a hacky solution, as it depends on the height of the comment container
// to be static.
function calculateGradientBreakpoint(
  outerCommentContainerHeight: number
): number {
  const HEIGHT_OF_NUDGES_PORTION_OF_COMMENT_CONTAINER_IN_PX = 135;

  const NUDGE_CONTAINER_PERCENTAGE_OF_COMMENT_CONTAINER =
    (HEIGHT_OF_NUDGES_PORTION_OF_COMMENT_CONTAINER_IN_PX /
      outerCommentContainerHeight) *
    100;
  const breakpoint = 100 - NUDGE_CONTAINER_PERCENTAGE_OF_COMMENT_CONTAINER;

  return breakpoint > 30 ? breakpoint : 100;
}
