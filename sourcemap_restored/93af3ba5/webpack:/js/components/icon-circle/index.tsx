import classNames from 'classnames';

import React from 'react';

import { Container } from '@loomhq/lens';

import styles from './styles.module.css';

export const IconCircle = ({
  size = 4.5,
  backgroundColor = '',
  removeBorder,
  children,
  padding,
}: {
  size?: number | string;
  backgroundColor?: string;
  children?: JSX.Element;
  padding?: string;
  removeBorder?: boolean;
}): JSX.Element => {
  return (
    <Container
      className={classNames(styles.iconCircleContainer, {
        [styles.withBorder]: !removeBorder,
      })}
      backgroundColor={backgroundColor}
      radius="100"
      width={size}
      height={size}
      padding={padding}
    >
      {children}
    </Container>
  );
};
