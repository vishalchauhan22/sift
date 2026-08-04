// To use user's active theme based on storage
import { useEffect } from 'react';

import { getLocalStorageKey } from '@js/utilities/localStorage';

import { LOCAL_THEME } from './constants';
import { loadTheme } from './loadTheme';

export const useTheme = (): string => {
  const activeTheme = getLocalStorageKey(LOCAL_THEME) || '';

  useEffect(() => {
    loadTheme();
  }, [activeTheme]);

  return activeTheme;
};
