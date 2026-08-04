import { keyframes } from '@emotion/react';
// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { Loader } from '@loomhq/lens';

import { zIndexes } from '../utils';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  display: grid;
  z-index: ${zIndexes.waitingScreen};
  place-items: center;
  pointer-events: none;
  animation: ${fadeIn} 1s;
`;

export const WaitingLayer = (): JSX.Element => (
  <Wrapper>
    <Loader size="large" color="body" />
  </Wrapper>
);
