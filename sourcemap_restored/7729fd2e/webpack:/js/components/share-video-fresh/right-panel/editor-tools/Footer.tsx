// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

// This footer container is needed to allow for the
// opacity of the backgroundSecondary color within the Footer
const FooterContainer = styled.div`
  background: var(--lns-color-background);
  width: 100%;
  height: 72px;
  align-self: end;
`;

const FooterStyled = styled.div`
  background: var(--lns-color-background);
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 16px;
  padding: 18px 24px;
  width: 100%;
  box-shadow: 0 -1px 0 var(--lns-color-border);
`;

const Footer = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  return (
    <FooterContainer>
      <FooterStyled>{children}</FooterStyled>
    </FooterContainer>
  );
};

export { Footer };
