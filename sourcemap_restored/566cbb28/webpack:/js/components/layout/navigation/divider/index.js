/* eslint-disable @loomhq/loom/no-js-extension */
import React from 'react';

import { Container, Spacer } from '@loomhq/lens';

// eslint-disable-next-line import/no-default-export
export default function Divider() {
  return (
    <Spacer y="large">
      <Container borderColor="border" borderSide="bottom" />
    </Spacer>
  );
}
