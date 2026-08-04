// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { Logo, Arrange } from '@loomhq/lens';

import { defaultTransition } from '../variables';

const LoomWatermarkWrapper = styled.div<{
  animated?: boolean;
  onClick?: () => void;
}>`
  ${props =>
    props.animated &&
    `
      transition: all ${defaultTransition}ms ease-in-out;
      :hover {
        transform: scale(1.1);
        opacity: 1;
      }
    `}
  transform: scale(1);
  ${props => props.onClick && `cursor: pointer;`}

  filter: drop-shadow(0px 1px 2px #333);
  opacity: 0.6;

  width: fit-content;
`;

type WatermarkProps = {
  onClick: () => void;
  animated?: boolean;
};

export const LoomWatermark = (props: WatermarkProps): JSX.Element => (
  // eslint-disable-next-line styled-components-a11y/click-events-have-key-events, styled-components-a11y/no-static-element-interactions
  <LoomWatermarkWrapper
    onClick={props.onClick}
    id="watermark-wrapper"
    className="watermark-wrapper"
    animated={props.animated}
  >
    <Arrange alignItems="center">
      <Logo
        maxWidth={10}
        wordmarkColor="white"
        symbolColor="white"
        style={{ minWidth: '70px' }}
      />
    </Arrange>
  </LoomWatermarkWrapper>
);
