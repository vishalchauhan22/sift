import { ReactElement, useCallback, useContext, useLayoutEffect } from 'react';

import { RUMContext } from './context';
import { MarkerName } from './types';

export function useMarkRUMSuccess(): (markerName: string) => void {
  const { markSuccess } = useContext(RUMContext);

  return useCallback(
    (markerName: MarkerName) => {
      markSuccess({ name: markerName, markedAt: window.performance.now() });
    },
    [markSuccess]
  );
}

export function useMarkRUMError(): (markerName: string, error?: Error) => void {
  const { markError } = useContext(RUMContext);

  return useCallback(
    (markerName: MarkerName, error?: Error) => {
      markError(
        { name: markerName, markedAt: window.performance.now() },
        error
      );
    },
    [markError]
  );
}

export function SuccessMarker({ name }: { name: string }): ReactElement | null {
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const markRUMSuccess = useMarkRUMSuccess();

  useLayoutEffect(() => {
    markRUMSuccess(name);
  }, [markRUMSuccess, name]);

  return null;
}

export function ErrorMarker({
  name,
  error,
}: {
  name: string;
  error?: Error;
}): ReactElement | null {
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const markRUMError = useMarkRUMError();

  useLayoutEffect(() => {
    markRUMError(name, error);
  }, [error, markRUMError, name]);

  return null;
}
