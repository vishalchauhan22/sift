import React from 'react';

import { Text } from '@loomhq/lens';
import styles from './styles.module.css';
import classNames from 'classnames';

export const SettingDirectoryPill = ({
  children,
  isActive,
  isSpeedMenu,
  isSmallScreen,
  onClick,
}: {
  isActive: boolean;
  isSpeedMenu?: boolean;
  isSmallScreen?: boolean;
  children: React.ReactNode;
  onClick: React.ReactEventHandler;
}): JSX.Element => {
  return (
    <button
      className={classNames(styles.scrollableElement, {
        [styles.activeScrollableElement]: isActive,
        [styles.scrollableElementPlaybackSpeed]: isSpeedMenu,
        [styles.scrollableElementPlaybackSpeedSmallScreen]:
          isSpeedMenu && isSmallScreen,
      })}
      onClick={onClick}
    >
      <Text
        size="body-sm"
        fontWeight="bold"
        color={isActive ? 'white' : 'grey3'}
      >
        {children}
      </Text>
    </button>
  );
};
