import React from 'react';

import { Container } from '@loomhq/lens';

import styles from './AiLoadingContainerStyles.module.css';

export const AiLoaderContainer = ({
  content,
}: {
  content: React.JSX.Element;
}): JSX.Element => {
  return (
    <Container width="100%" height="100%">
      <Container className={styles.assistant} position="relative">
        <Container className={styles.gradient} />
        <Container className={styles.mask}>
          <Container
            width="100%"
            height="100%"
            paddingX="medium"
            paddingY="medium"
          >
            {content}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
