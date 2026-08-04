export function getRectSize(entry: ResizeObserverEntry): {
  width: number;
  height: number;
} {
  if (entry.contentRect) {
    return { width: entry.contentRect.width, height: entry.contentRect.height };
  }

  let cbox = entry.contentBoxSize as unknown as ResizeObserverSize;

  if (Array.isArray(cbox)) {
    [cbox] = cbox;
  }

  return { width: cbox.inlineSize, height: cbox.blockSize };
}

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: no-preference)';
export function checkPreferReducedMotion(): boolean {
  return !window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Wraps the given function, `fn`, with a new function that only invokes `fn`
 * at most once per every `wait` milliseconds.
 */
export const throttle = (
  fn: (...args: unknown[]) => void,
  wait: number
): ((...args: unknown[]) => void) => {
  let last = performance.now();

  const throttled = (...args: unknown[]) => {
    const now = performance.now();

    if (now - last >= wait) {
      fn(...args);
      last = now;
    }
  };

  return throttled;
};

/**
 * Wraps the given function, `fn`, with a new function that only invokes `fn`
 * at most once per every user input.
 */
export function debounce<A extends Array<unknown> = Array<unknown>>(
  fn: (...args: A) => void,
  timeout = 300
): {
  (...args: A): void;
  cancel(): void;
} {
  let timer: number;

  function cb(...args: A) {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn(...args);
    }, timeout);
  }

  cb.cancel = () => clearTimeout(timer);

  return cb;
}
