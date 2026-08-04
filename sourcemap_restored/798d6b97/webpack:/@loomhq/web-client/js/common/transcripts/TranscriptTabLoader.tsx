import React from 'react';

import { Align, Arrange, Container, Loader } from '@loomhq/lens';

export const TranscriptTabLoader = (): JSX.Element => {
  return (
    <Container height="100vh">
      <Align alignment="center">
        <Arrange gap="small" autoFlow="row" justifyItems="center">
          <Loader size="large" />
        </Arrange>
      </Align>
    </Container>
  );
};
