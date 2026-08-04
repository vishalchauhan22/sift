import React from 'react';

import { Container } from '@loomhq/lens';

import CtaButton from '../cta-button';

export const CtaPreview = (): JSX.Element => {
  return (
    <Container
      position="absolute"
      top={0}
      width="100%"
      height="100%"
      backgroundColor="backdropDark"
      zIndex={2}
    >
      <CtaButton />
    </Container>
  );
};
