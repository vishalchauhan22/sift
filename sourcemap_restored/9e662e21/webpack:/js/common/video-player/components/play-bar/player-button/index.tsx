import React from 'react';

import { Container, IconButton } from '@loomhq/lens';

import { PlayerButtonTooltip } from './player-button-tooltip';

export const PlayerButton: React.FC<
  React.PropsWithChildren<{
    icon: React.ReactNode;
    label: string;
    shortcut?: string;
    onClick?: () => void;
    size?: 'small' | 'medium';
    isDisabled?: boolean;
    'data-name'?: string;
    backgroundColor?: string;
    isOpen?: boolean;
  }>
> = ({ icon, label, shortcut, size, backgroundColor, isOpen, ...props }) => {
  if (props.isDisabled) {
    return (
      <IconButton
        size={size}
        altText={label}
        icon={icon}
        aria-expanded={isOpen}
        {...props}
      />
    );
  }

  if (backgroundColor) {
    return (
      <Container radius="full" backgroundColor={backgroundColor}>
        <PlayerButtonTooltip label={label} shortcut={shortcut}>
          <IconButton
            size={size}
            altText={label}
            icon={icon}
            aria-expanded={isOpen}
            {...props}
          />
        </PlayerButtonTooltip>
      </Container>
    );
  }

  return (
    <PlayerButtonTooltip label={label} shortcut={shortcut}>
      <IconButton
        id={label}
        size={size}
        altText={label}
        icon={icon}
        aria-expanded={isOpen}
        {...props}
      />
    </PlayerButtonTooltip>
  );
};
