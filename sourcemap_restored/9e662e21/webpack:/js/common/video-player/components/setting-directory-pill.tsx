import React from 'react';

import { Text } from '@loomhq/lens';
import styles from './styles.module.css';
import classNames from 'classnames';

export const SettingDirectoryPill = ({
  children,
  isActive,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: React.ReactEventHandler;
}): JSX.Element => {
  return (
    <button
      className={classNames(styles.scrollableElement, {
        [styles.activeScrollableElement]: isActive,
      })}
      onClick={onClick}
    >
      <Text
        size="body-sm"
        fontWeight="regular"
        color={isActive ? 'white' : 'grey3'}
      >
        {children}
      </Text>
    </button>
  );
};
