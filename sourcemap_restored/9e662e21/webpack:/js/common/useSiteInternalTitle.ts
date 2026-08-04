import { useEffect } from 'react';

export const useSiteTitleInternal = (
  title: string,
  globalTitle: string,
  defaultTitle: string
): void => {
  useEffect(() => {
    if (title) {
      document.title = `${title.trim()} | ${globalTitle}`;
    } else {
      document.title = defaultTitle;
    }

    return () => {
      document.title = defaultTitle;
    };
  }, [title, globalTitle, defaultTitle]);
};
