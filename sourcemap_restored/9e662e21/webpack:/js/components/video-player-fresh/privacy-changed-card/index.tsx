import React from 'react';

import { Align, Container, Text } from '@loomhq/lens';

export const PrivacyChangedCard = (): JSX.Element => {
  return (
    <Container
      className="theme-dark"
      width="100%"
      height="100%"
      backgroundColor="background"
    >
      <Align alignment="center">
        <Container maxWidth="180px">
          <Text alignment="center" color="body">
            This video&apos;s privacy setting has changed.
          </Text>
        </Container>
      </Align>
    </Container>
  );
};
