import React from 'react';

import { Container, Logo, Text } from '@loomhq/lens';

export const TitleSlot: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <Text size="heading-md" fontWeight="bold" className="inline">
    {children}
  </Text>
);

export const LogoText: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <div className="inlineFlex relative" style={{ flexWrap: 'nowrap' }}>
    {children}
    <Container marginX="xsmall" height="1.7rem">
      <Logo variant="symbol" maxWidth="20px" brand="ai" />
    </Container>
  </div>
);

export const SubtitleSlot: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <Text color="bodyDimmed" size="body-lg">
    {children}
  </Text>
);

export const CenteredSubtitleSlot: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => (
  <Container maxWidth={'616px'}>
    <Text color="bodyDimmed" size="body-lg" alignment="center">
      {children}
    </Text>
  </Container>
);
