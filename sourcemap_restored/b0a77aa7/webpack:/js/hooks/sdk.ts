import { useMemo } from 'react';

import { useMatchMobileOnly } from '@js/hooks/useMatchMedia';
import { isSafari } from '@js/utilities/device';

export const usePersistentRecordAllowed = (): boolean => {
  const isMobile = useMatchMobileOnly();

  const experimentIsAllowed = useMemo<boolean>(
    () => !(isMobile || isSafari),
    [isMobile]
  );

  return experimentIsAllowed;
};
