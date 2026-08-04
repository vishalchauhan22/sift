import {
  THEME_DARK,
  LOCAL_THEME,
  COLOR_THEME,
  COLOR_REFRESHED,
} from '@js/common/themes';

import {
  clearLocalStorageKey,
  setLocalStorageKey,
} from '@js/utilities/localStorage';

export const applyTheme = (darkMode: boolean): void => {
  if (darkMode) {
    setLocalStorageKey(LOCAL_THEME, THEME_DARK);
    document.body.classList.add(THEME_DARK);
    document.documentElement.style.colorScheme = 'dark';
    document.documentElement.setAttribute('data-color-mode', 'dark');
  } else {
    clearLocalStorageKey(LOCAL_THEME);
    document.body.classList.remove(THEME_DARK);
    document.documentElement.style.colorScheme = 'normal';
    document.documentElement.setAttribute('data-color-mode', 'light');
  }
};

export const applyColorTheme = (): void => {
  setLocalStorageKey(COLOR_THEME, COLOR_REFRESHED);
  document.documentElement.dataset.theme = 'light:light dark:dark';
};
