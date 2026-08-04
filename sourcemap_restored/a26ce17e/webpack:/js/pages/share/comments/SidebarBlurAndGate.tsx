// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import React from 'react';

const OverlayContainer = styled.div`
  pointer-events: none;
  justify-content: center;
  display: flex;
`;

const OverlayWrapper = styled.div<{
  overlayTop?: string;
  unScrollable?: boolean;
}>`
  position: absolute;
  top: ${props => props.overlayTop || '50%'};
  height: ${props => (props.unScrollable ? '50%' : '100%')};
  width: 100%;
  background-color: var(--lns-color-background);
  display: flex;
  justify-content: center;
  pointer-events: auto;
  padding-top: 10px;
  padding-left: 24px;
  padding-right: 24px;
  box-shadow: 30px 0 15px 15px var(--lns-color-background);
`;

const ChildWrapper = styled.div<{
  unScrollable?: boolean;
}>`
  filter: blur(5px);
  position: ${props => (props.unScrollable ? 'absolute' : 'relative')};
  overflow: ${props => (props.unScrollable ? 'hidden' : 'auto')};
  height: ${props => (props.unScrollable ? '50%' : '')};
  top: ${props => (props.unScrollable ? '10' : '')};
  left: ${props => (props.unScrollable ? '5%' : '')};
`;

type SidebarBlurAndGateProps = {
  overlay: JSX.Element;
  children: JSX.Element;
  overlayTop: string;
  enabled: boolean;
  unScrollable: boolean;
};

export const SidebarBlurAndGate = ({
  overlay,
  children,
  overlayTop,
  enabled,
  unScrollable,
}: SidebarBlurAndGateProps): JSX.Element => {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <OverlayContainer>
      <ChildWrapper unScrollable={unScrollable}>{children}</ChildWrapper>
      <OverlayWrapper overlayTop={overlayTop} unScrollable={unScrollable}>
        {overlay}
      </OverlayWrapper>
    </OverlayContainer>
  );
};
