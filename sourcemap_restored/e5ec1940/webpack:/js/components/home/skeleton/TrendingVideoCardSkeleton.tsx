import React from 'react';

import { Arrange, Container, Spacer } from '@loomhq/lens';

import styles from './styles.module.less';

const TrendingVideoCardSkeleton = (): JSX.Element => (
  <div className={styles.cardShadow}>
    <Container radius="medium" overflow="hidden">
      <div className={styles.thumbnailLoading}>
        <Container backgroundColor="disabledBackground" height="100%" />
      </div>
      <Container height="150px" padding="medium">
        <Arrange gap="small" justifyContent="space-between">
          <Arrange gap="small">
            <div className={styles.avatarLoading}>
              <Container
                height={4}
                width={4}
                backgroundColor="disabledBackground"
              />
            </div>
            <Arrange gap="small" rows="auto">
              <Container
                height="small"
                backgroundColor="disabledBackground"
                radius="medium"
                width="100px"
              />
              <Container
                height="small"
                backgroundColor="disabledBackground"
                radius="medium"
                width="100px"
              />
            </Arrange>
          </Arrange>
          <div>
            <Arrange gap="medium">
              <Container
                height="medium"
                width="medium"
                backgroundColor="disabledBackground"
                radius="medium"
              />
              <Container
                height="medium"
                width="medium"
                backgroundColor="disabledBackground"
                radius="medium"
              />
              <Container
                height="medium"
                width="medium"
                backgroundColor="disabledBackground"
                radius="medium"
              />
            </Arrange>
          </div>
        </Arrange>
        <Spacer top="large">
          <Arrange gap="large" columns="1fr">
            <Container
              height="small"
              backgroundColor="disabledBackground"
              radius="medium"
              width="400px"
            />
            <Arrange gap="small">
              <Container
                height="small"
                backgroundColor="disabledBackground"
                radius="medium"
                width="100px"
              />
              <Container
                height="small"
                backgroundColor="disabledBackground"
                radius="medium"
                width="100px"
              />
              <Container
                height="small"
                backgroundColor="disabledBackground"
                radius="medium"
                width="100px"
              />
            </Arrange>
          </Arrange>
        </Spacer>
      </Container>
    </Container>
  </div>
);

// eslint-disable-next-line import/no-default-export
export default TrendingVideoCardSkeleton;
