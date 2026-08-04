import React from 'react';

import { Arrange, Button, Container, Popover, Text } from '@loomhq/lens';
import { SvgSettings } from '@loomhq/lens/icons/settings';

import {
  POPOVER_TRANSITION_DELAY,
  POPOVER_TRANSITION_DURATION,
} from './constants';

type AutoContextContentProps = {
  title: string;
  subtitle: React.ReactNode;
  onPrimaryClick: () => void;
};

const AutoContextContent = ({
  title,
  subtitle,
  onPrimaryClick,
}: AutoContextContentProps): JSX.Element => (
  <Container
    contentColor="body"
    backgroundColor="background"
    radius="large"
    shadow="medium"
    padding="medium"
    width={40}
    borderSide="all"
    borderWidth=".2rem"
    position="relative"
    zIndex={2}
    style={{
      backgroundOrigin: 'padding-box, border-box',
      backgroundClip: 'padding-box, border-box',
    }}
    borderColor="transparent"
    backgroundImage="linear-gradient(white, white), linear-gradient(to right, #565ADD, #9F92EC, #DC43BE);"
  >
    <Arrange rows="true" gap="small">
      <Text variant="title">{title}</Text>
      {subtitle ? subtitle : null}

      <Container paddingTop="small">
        <Arrange justifyContent="space-between">
          <Arrange gap="small">
            <Button
              onClick={onPrimaryClick}
              icon={<SvgSettings />}
              iconPosition="right"
              size="small"
            >
              Manage
            </Button>
          </Arrange>
        </Arrange>
      </Container>
    </Arrange>
  </Container>
);

type AutoContextPopoverProps = {
  onPrimaryClick: () => void;
  isOpen: boolean;
  placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'; // TODO(wap): Replace with exported lens types when available
  subtitle: string;
  title: string;
};

export const AutoContextPopover = ({
  onPrimaryClick,
  isOpen,
  placement,
  subtitle,
  title,
}: AutoContextPopoverProps): JSX.Element => {
  return (
    <Popover
      isOpen={isOpen}
      placement={placement}
      transitionDuration={POPOVER_TRANSITION_DURATION}
      transitionDelay={POPOVER_TRANSITION_DELAY}
      content={
        <AutoContextContent
          title={title}
          subtitle={subtitle}
          onPrimaryClick={onPrimaryClick}
        />
      }
    />
  );
};
