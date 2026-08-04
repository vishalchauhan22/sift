import React from 'react';

import { Container, Spacer } from '@loomhq/lens';

export const InitialLoadingState = (): JSX.Element => {
  return (
    <Spacer top={1} bottom={1}>
      <Container
        height={4}
        width={60}
        backgroundColor="disabledBackground"
        radius="full"
      />
    </Spacer>
  );
};
