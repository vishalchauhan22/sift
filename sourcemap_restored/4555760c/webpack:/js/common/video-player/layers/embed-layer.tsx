// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

const EmbedWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

export const EmbedLayer: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
  ...props
}) => <EmbedWrapper {...props}>{children}</EmbedWrapper>;
