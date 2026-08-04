// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { Arrange, Logo, Text } from '@loomhq/lens';

import { colors } from '../variables';

type PoweredByLoomProps = {
  onClick?: () => void;
};

export const PoweredByLoomWrapper = styled.div<PoweredByLoomProps>`
  ${props => props.onClick && 'cursor: pointer;'}
`;

export const PoweredByLoomTitle = (props: PoweredByLoomProps): JSX.Element => {
  return (
    <PoweredByLoomWrapper {...props}>
      <Arrange gap="small">
        <Text color="body" fontWeight="bold">
          Powered by
        </Text>
        <Logo maxWidth={6} />
      </Arrange>
    </PoweredByLoomWrapper>
  );
};

export const PoweredByLoomTitleWrapper = styled.div`
  border-radius: var(--lns-radius-medium);
  background: ${colors.videoOverlay};
  display: grid;
  width: max-content;
  padding: var(--lns-space-xsmall) var(--lns-space-small);
  position: absolute;
  top: calc(100% + var(--lns-space-small));
  left: 50%;
  transform: translateX(-50%);
`;
