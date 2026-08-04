import traceUFOTransition from '@atlaskit/react-ufo/trace-transition';
import React, { useEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';

import { normalizePathname } from './helpers';

export const UfoTransitionListener: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const location = useLocation();
  const isFirstPageLoad = useRef(true);

  useEffect(() => {
    if (isFirstPageLoad.current) {
      isFirstPageLoad.current = false;
    } else {
      const normalizedPathname = normalizePathname(location.pathname);

      traceUFOTransition(normalizedPathname);
    }
  }, [location.pathname]);

  return <>{children}</>;
};
