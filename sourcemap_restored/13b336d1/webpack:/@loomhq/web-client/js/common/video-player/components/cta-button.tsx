// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { u } from '@loomhq/lens';

import { getContrast } from '../utils';
import { colors, slowTransition, xSlowTransition } from '../variables';

export type CtaButtonSize = 'medium' | 'large';

export type CtaButtonProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  contentColor?: string;
  borderColor?: string;
  size?: CtaButtonSize;
  borderRadius?: number | string;
  href?: string;
  target?: string;
  onClick?: (e?: any) => void;
};

const sizeStyles = {
  medium: {
    height: u(4.5),
    textSize: 'var(--lns-fontSize-medium)',
  },
  large: {
    height: u(6),
    textSize: 'var(--lns-fontSize-large)',
  },
};

const Wrapper = styled.a<
  CtaButtonProps & {
    hoverColor: string;
    activeColor: string;
    borderColor: string | undefined;
  }
>`
  --insetShadowColor: transparent;

  background: ${props => props.backgroundColor};
  color: ${props => props.contentColor};
  text-decoration: none;
  border-radius: ${props => props.borderRadius}px;
  height: ${props => props.size && sizeStyles[props.size].height};
  padding: 0 1.2em;
  font-size: ${props => props.size && sizeStyles[props.size].textSize};
  display: flex;
  width: fit-content;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  font-weight: var(--lns-fontWeight-bold);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  transition: ${xSlowTransition}ms box-shadow;
  box-shadow:
    var(--lns-shadow-small),
    inset 0 0 0 1000px var(--insetShadowColor);
  border: ${props =>
    props.borderColor ? `1px solid ${props.borderColor}` : undefined};

  &:hover {
    transition: ${slowTransition}ms box-shadow;
    --insetShadowColor: ${props => props.hoverColor};
  }

  &:active {
    transition: 0ms box-shadow;
    --insetShadowColor: ${props => props.activeColor};
  }
`;

const ChildrenWrapper = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const CtaButton = ({
  children,
  backgroundColor = colors.ctaBackground,
  contentColor = colors.ctaContent,
  borderColor,
  borderRadius = 'var(--lns-radius-xlarge)',
  size = 'medium',
  target = '_blank',
  href,
  onClick = () => ({}),
  ...props
}: CtaButtonProps): JSX.Element => {
  const isLight = getContrast(backgroundColor);
  const l = isLight ? 0 : 100;
  const hoverColor = `hsl(0 0% ${l}% / 0.2)`;
  const activeColor = `hsl(0 0% ${l}% / 0.4)`;

  return (
    <Wrapper
      size={size}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      activeColor={activeColor}
      contentColor={contentColor}
      borderRadius={borderRadius}
      href={href}
      target={target}
      onClick={onClick}
      borderColor={borderColor}
      {...props}
    >
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Wrapper>
  );
};
