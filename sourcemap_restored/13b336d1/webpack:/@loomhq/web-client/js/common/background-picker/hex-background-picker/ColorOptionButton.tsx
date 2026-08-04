import cx from 'classnames';
import React from 'react';

import styles from './styles.module.css';

type ColorOptionButtonProps = {
  color: string;
  name?: string;
  onClick?(): void;
  isSelected?: boolean;
  hasBorder?: boolean;
  size?: 'small' | 'medium';
};

export const ColorOptionButton = ({
  color,
  name,
  onClick,
  isSelected,
  hasBorder,
  size,
}: ColorOptionButtonProps): JSX.Element => {
  return (
    <button
      role="option"
      aria-label={`select ${name}`}
      aria-selected={isSelected}
      className={cx({
        [styles.colorBox]: size !== 'small',
        [styles.colorBoxSmall]: size === 'small',
        [styles.selected]: isSelected,
        [styles.withBorder]: hasBorder,
      })}
      onClick={onClick}
      style={{
        background: color,
      }}
      data-testid="color-box"
    />
  );
};
