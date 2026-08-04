import { AUTO_TITLE_GLYPH_HOVER } from '@js/constants/events';

import React from 'react';

import { AiFeatureMarkers } from '@js/utilities/rum/constants';
import { SuccessMarker } from '@js/utilities/rum/markers';

import { Container, Tooltip } from '@loomhq/lens';

import * as analytics from '@js/utilities/analytics';

import styles from './styles.module.css';

export const AiLoader = ({ onClick }: { onClick: () => void }): JSX.Element => {
  return (
    <>
      <SuccessMarker name={AiFeatureMarkers.AutoTitleLoading} />
      <Tooltip
        content="We are using AI to create a title tailored to your Loom."
        placement="bottomLeft"
      >
        <Container
          height="xlarge"
          marginY="xsmall"
          maxWidth="500px"
          onClick={onClick}
        >
          <Container width="100%" height="100%">
            <Container
              className={styles.assistant}
              onMouseEnter={() => analytics.track(AUTO_TITLE_GLYPH_HOVER)}
            >
              <Container className={styles.gradient} />
              <Container className={styles.mask} />
              <Container width="100%" height="100%" />
            </Container>
          </Container>
        </Container>
      </Tooltip>
    </>
  );
};
