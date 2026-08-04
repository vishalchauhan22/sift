import React from 'react';

import { Container } from '@loomhq/lens';

import { PlayerPopover } from '../player-popover';

export const SettingsPopover = ({
  children,
  zIndex,
  content,
  isOpen,
  padding = 'medium',
  paddingTop = 'medium',
  paddingBottom = 'medium',
  paddingLeft = 'medium',
  paddingRight = 'medium',
}: {
  children: React.ReactNode;
  zIndex?: number;
  content?: React.ReactNode;
  isOpen?: boolean;
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
}): JSX.Element => {
  return (
    <PlayerPopover
      zIndex={zIndex}
      content={
        <Container
          paddingTop={paddingTop ? paddingTop : padding}
          paddingBottom={paddingBottom ? paddingBottom : padding}
          paddingLeft={paddingLeft ? paddingLeft : padding}
          paddingRight={paddingRight ? paddingRight : padding}
          radius="medium"
          contentColor="body"
          backgroundColor="overlay"
          width="max-content"
          zIndex={1}
          marginBottom="xsmall"
        >
          {content}
        </Container>
      }
      isOpen={isOpen}
    >
      {children}
    </PlayerPopover>
  );
};
