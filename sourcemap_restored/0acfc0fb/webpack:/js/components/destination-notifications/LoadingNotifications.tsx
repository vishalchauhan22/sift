import React from 'react';

import { Arrange, Container, Spacer, Split, SplitSection } from '@loomhq/lens';

import styles from './styles.module.css';

const DEFAULT_GRID_SIZE = 3;

const LoadingNotifications = ({
  gridSize = DEFAULT_GRID_SIZE,
}: {
  gridSize?: number;
}): JSX.Element => {
  return (
    // Wrapping Container so that only two loading rows are shown at any device width
    <Container
      className="mt:large"
      overflow="hidden"
      width="100%"
      data-testid="destination-notifications-loading"
    >
      <Arrange autoFlow="row" gap="large" justifyContent="stretch">
        {Array(gridSize)
          .fill(0)
          .map((_, i) => (
            <Container
              key={i}
              borderSide="bottom"
              borderColor="disabledBackground"
              paddingBottom="large"
              width="100%"
            >
              <Split
                justifyContent="space-between"
                direction="row"
                gap="medium"
              >
                <SplitSection grow={1}>
                  <Container
                    height="small"
                    backgroundColor="disabledBackground"
                    radius="medium"
                    width="142px"
                  />

                  <Spacer top="medium" />

                  <Arrange gap="small" columns="min-content 260px">
                    <div className={styles.avatarLoading}>
                      <Container
                        height={4}
                        width={4}
                        backgroundColor="disabledBackground"
                      />
                    </div>
                    <div>
                      <Spacer y="7px">
                        <Container
                          height="small"
                          backgroundColor="disabledBackground"
                          radius="medium"
                          width="30%"
                        />
                      </Spacer>
                      <Spacer y="xsmall">
                        <Container
                          height="small"
                          backgroundColor="disabledBackground"
                          radius="medium"
                        />
                      </Spacer>
                    </div>
                  </Arrange>

                  <Spacer top="medium" />

                  <Arrange
                    gap="small"
                    columns="min-content minmax(100px, 430px)"
                  >
                    <div className={styles.avatarLoading}>
                      <Container
                        height={4}
                        width={4}
                        backgroundColor="disabledBackground"
                      />
                    </div>
                    <Container
                      height={4}
                      radius="medium"
                      borderSide="all"
                      borderColor="disabledBackground"
                    />
                  </Arrange>
                </SplitSection>

                <SplitSection>
                  <Container
                    height="150px"
                    width="250px"
                    radius="medium"
                    backgroundColor="disabledBackground"
                  />
                </SplitSection>
              </Split>
            </Container>
          ))}
      </Arrange>
    </Container>
  );
};

// eslint-disable-next-line import/no-default-export
export default LoadingNotifications;
