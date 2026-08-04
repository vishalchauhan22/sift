import React from 'react';

import { Container, Align, Icon } from '@loomhq/lens';
import { SvgBulb } from '@loomhq/lens/icons/bulb';

const InsightsHubIcon = ({
  size = 2,
}: {
  size?: number;
}): JSX.Element | null => {
  return (
    <>
      <Container backgroundColor="background" radius="full">
        <Container backgroundColor="highlight" radius="full" padding="xsmall">
          <Align alignment="center">
            <Icon color="#4B42AD" icon={<SvgBulb />} size={size} />
          </Align>
        </Container>
      </Container>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default InsightsHubIcon;
