import React, { useEffect } from 'react';
import classNames from 'classnames';

import { Arrange, LogoLoader, Icon, Container } from '@loomhq/lens';

import { SvgCheckCircle } from '@loomhq/lens/icons/check-circle';

import styles from './styles.module.css';

export const LoomLogoCheckAnimation = ({
  callback = () => null,
  timeout = 3000,
}: {
  callback?: () => void;
  timeout?: number;
}): JSX.Element => {
  useEffect(() => {
    const animation = setTimeout(() => {
      callback();
    }, timeout);

    return () => clearTimeout(animation);
  }, [callback, timeout]);
  return (
    <Arrange justifyContent="center">
      <div id="myid" className={styles.loomLogoCheckContainer}>
        <div className={styles.logoSpinnerContainer}>
          <LogoLoader animation="spin 2s 0.2s steps(49) forwards" />
        </div>
        <Container
          width="80px"
          height="80px"
          className={classNames(
            styles.checkCircle,
            'flex items:center justify:center'
          )}
        >
          <Icon
            icon={<SvgCheckCircle />}
            size="80px"
            color="var(--lns-color-blurple)"
          />
        </Container>
      </div>
    </Arrange>
  );
};
