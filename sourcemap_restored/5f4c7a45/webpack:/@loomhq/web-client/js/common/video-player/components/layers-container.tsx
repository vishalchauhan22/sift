/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { css } from '@emotion/react';
// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { Stack } from './stack';

const visuallyHiddenStyles = css`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const LayersContainerWrapper = styled(Stack)<{ isHidden?: boolean }>`
  width: 100%;
  height: 100%;
  background-color: black;
  color: var(--lns-color-body);
  grid-template-rows: minmax(0, 1fr);
  ${props => props.isHidden && visuallyHiddenStyles};
`;

export const LayersContainer: React.FC<
  React.PropsWithChildren<{
    isHidden?: boolean;
    isEmbed?: boolean;
    className?: string;
  }>
> = ({ isHidden, children, className }) => (
  <LayersContainerWrapper
    className={`LayersContainer ${className}`}
    data-lens-theme="dark"
    area="layersStack"
    isHidden={isHidden}
  >
    {children}
  </LayersContainerWrapper>
);
