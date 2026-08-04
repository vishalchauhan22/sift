import {
  applyTheme,
  applyColorTheme,
  LOCAL_THEME,
  THEME_DARK,
  BRAND_THEME,
  COLOR_BLUEIFY,
  applyBlueifyTheme,
} from '@js/common/themes';

import { getLocalStorageKey } from '@js/utilities/localStorage';

export function loadTheme(): void {
  const themeIsDark = getLocalStorageKey(LOCAL_THEME) === THEME_DARK;

  applyTheme(themeIsDark);

  applyColorTheme();

  const showColorBlueify = getLocalStorageKey(BRAND_THEME) === COLOR_BLUEIFY;

  applyBlueifyTheme(showColorBlueify);
}
