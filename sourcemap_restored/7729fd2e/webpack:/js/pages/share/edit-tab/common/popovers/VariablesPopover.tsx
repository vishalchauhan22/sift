import React from 'react';

import { Container } from '@loomhq/lens';

import VariablesTooltip from '@assets/img/audio-variables-tooltip-1.png';

import { EditSidebarTooltip } from './EditSidebarTooltip';

export const VariablesPopover = (): JSX.Element => {
  return (
    <Container>
      <EditSidebarTooltip
        isClosable={false}
        img={VariablesTooltip}
        altText="Variables introduction"
        betaPillVariant={null}
        title="Add an audio variable"
        text="Generate unique video messages for multiple recipients with just one video."
      />
    </Container>
  );
};
