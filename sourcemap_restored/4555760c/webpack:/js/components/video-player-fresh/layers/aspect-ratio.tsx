import cx from 'classnames';
import React from 'react';

import styles from './styles.module.css';

type AspectRatioProps = {
  children: JSX.Element;
  isDisabled?: boolean;
  aspectRatio?: number;
};

export const AspectRatio = ({
  children,
  isDisabled = false,
  aspectRatio = 16 / 9,
}: AspectRatioProps): JSX.Element => {
  return (
    <div
      style={isDisabled ? {} : { paddingTop: `calc(100% / ${aspectRatio})` }}
      className={cx({
        [styles.outerWrapper]: !isDisabled,
        [styles.outerWrapperLoose]: isDisabled,
      })}
    >
      <div className={styles.innerWrapper}>{children}</div>
    </div>
  );
};
