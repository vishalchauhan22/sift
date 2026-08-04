// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { zIndexes } from '../utils';

const Wrapper = styled.div<{ zIndexLayer: number }>`
  z-index: ${props => props.zIndexLayer};
`;

export const Layer = ({
  children,
  zIndexLayer,
  ...props
}: {
  children: React.ReactNode;
  zIndexLayer: string;
}): JSX.Element => {
  return (
    <Wrapper zIndexLayer={zIndexes[zIndexLayer]} {...props}>
      {children}
    </Wrapper>
  );
};
