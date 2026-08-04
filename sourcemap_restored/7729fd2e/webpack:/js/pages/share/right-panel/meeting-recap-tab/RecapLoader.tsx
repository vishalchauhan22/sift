import React, { useEffect, useState } from 'react';

import { Align, Arrange, Container, LogoLoader, Text } from '@loomhq/lens';
import { getRandomLoadingBlurb } from '@loomhq/shared-utilities/constants/loader';

import { AiFeatureMarkers } from '@js/utilities/rum/constants';
import { SuccessMarker } from '@js/utilities/rum/markers';

import styles from './styles.module.css';

export const RecapLoader = (): JSX.Element => {
  const [loadingBlurb, setLoadingBlurb] = useState<string>(
    getRandomLoadingBlurb()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let newBlurb = getRandomLoadingBlurb();
      while (newBlurb === loadingBlurb) {
        newBlurb = getRandomLoadingBlurb();
      }
      setLoadingBlurb(newBlurb);
    }, 10000);

    return () => clearInterval(interval);
  }, [loadingBlurb]);

  return (
    <>
      <Container
        height="60vh"
        width="100%"
        aria-label="Loom logo animation indicates content is loading"
      >
        <Align alignment="center">
          <Arrange autoFlow="row" justifyItems="center">
            <LogoLoader
              animation="spin 2s infinite steps(43) alternate"
              brand="ai"
            />
            <Text fontWeight="bold" className={styles.loadingBlurb}>
              {loadingBlurb}
            </Text>
          </Arrange>
        </Align>
      </Container>
      <SuccessMarker name={AiFeatureMarkers.AutoSummaryLoading} />
    </>
  );
};
