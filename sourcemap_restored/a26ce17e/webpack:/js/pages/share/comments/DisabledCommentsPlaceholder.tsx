import React from 'react';

import { Container, Spacer, Text } from '@loomhq/lens';

export const DisabledCommentsPlaceholder = (): JSX.Element => {
  return (
    <Container paddingY="30vh">
      <Text fontWeight="bold" alignment="center" size="body-lg">
        Comments disabled
      </Text>
      <Spacer top={1} bottom={2} left={5} right={5}>
        <Text fontWeight="book" alignment="center" color="bodyDimmed">
          The creator of this video has turned off comments.
        </Text>
      </Spacer>
    </Container>
  );
};
