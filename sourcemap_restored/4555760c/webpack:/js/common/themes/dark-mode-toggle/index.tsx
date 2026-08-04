import {
  DARK_MODE_TOGGLE_CLICKED,
  LOCAL_THEME,
  THEME_DARK,
  applyTheme,
} from '@js/common/themes';
import React, { FC, useState } from 'react';

import { Arrange, Spacer, Switch } from '@loomhq/lens';
import * as analytics from '@js/utilities/analytics';
import { getLocalStorageKey } from '@js/utilities/localStorage';

export const DarkModeToggle: FC<React.PropsWithChildren<unknown>> = () => {
  const [darkMode, setDarkMode] = useState(
    getLocalStorageKey(LOCAL_THEME) === THEME_DARK
  );

  const handleDarkModeChange = (): void => {
    const newDarkMode = !darkMode;

    applyTheme(newDarkMode);
    setDarkMode(newDarkMode);
    analytics.track(DARK_MODE_TOGGLE_CLICKED, { dark_mode: newDarkMode });
  };

  return (
    <li>
      <Spacer x={1.5} y={0.5}>
        <Arrange justifyContent="space-between">
          <label htmlFor="darkMode">Dark mode</label>
          <Switch
            id="darkMode"
            isActive={darkMode}
            onChange={() => handleDarkModeChange()}
          />
        </Arrange>
      </Spacer>
    </li>
  );
};
