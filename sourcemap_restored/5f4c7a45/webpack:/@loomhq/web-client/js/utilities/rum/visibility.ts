import { useCallback, useEffect, useState } from 'react';

export function usePageIsVisible(): boolean {
  const [pageIsVisible, setPageIsVisible] = useState<boolean>(
    document.visibilityState === 'visible'
  );

  const onVisibilityChange = useCallback(() => {
    setPageIsVisible(document.visibilityState === 'visible');
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [onVisibilityChange]);

  return pageIsVisible;
}

export function usePageWasEverHidden(): boolean {
  const pageIsVisible = usePageIsVisible();
  const [pageWasEverHidden, setPageWasEverHidden] =
    useState<boolean>(!pageIsVisible);

  useEffect(() => {
    if (!pageIsVisible) {
      setPageWasEverHidden(true);
    }
  }, [pageIsVisible]);

  return pageWasEverHidden;
}
