import React from 'react';

import { REDUCED_MOTION_QUERY, checkPreferReducedMotion } from '.';

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(
    checkPreferReducedMotion()
  );

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);

    if (!mediaQueryList?.addEventListener) {
      return;
    }

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  return prefersReducedMotion;
}
