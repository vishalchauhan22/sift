/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { Arrange, Container, Text, TooltipBox } from '@loomhq/lens';

import { PlayerPopover } from '../../player-popover';

const TooltipWrapper = styled.div`
  white-space: nowrap;
`;

export const PlayerButtonTooltip: React.FC<
  React.PropsWithChildren<{
    label: string;
    shortcut?: string;
  }>
> = ({ children, label, shortcut }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <PlayerPopover
      isOpen={isOpen}
      hasTransition
      content={
        <>
          {label && (
            <TooltipWrapper data-lens-theme="light">
              <TooltipBox>
                <WithHotKey label={label} shortcut={shortcut} />
              </TooltipBox>
            </TooltipWrapper>
          )}
        </>
      }
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */}
      <div
        onMouseEnter={() => setIsOpen(true)}
        onTouchStart={() => setIsOpen(true)}
        onTouchMove={() => setIsOpen(false)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(false)}
      >
        {children}
      </div>
    </PlayerPopover>
  );
};

export const WithHotKey = ({
  label,
  shortcut,
}: {
  label: string;
  shortcut?: string;
}): JSX.Element => (
  <Arrange gap="small">
    <Text size="body-sm" fontWeight="bold">
      {label}
    </Text>
    {shortcut && (
      <Container
        paddingX="xsmall"
        paddingY="0"
        backgroundColor="var(--lns-color-backgroundActive)"
        style={{ borderRadius: '3px' }}
      >
        <Text size="body-sm" color="var(--lns-color-grey3)" fontWeight="bold">
          {shortcut}
        </Text>
      </Container>
    )}
  </Arrange>
);
