/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { autoPlacement } from '@floating-ui/core';
import {
  Placement,
  autoUpdate,
  shift,
  useFloating,
  offset as floatingUiOffset,
} from '@floating-ui/react-dom';
import React, { useEffect } from 'react';

import { unit } from '@loomhq/lens';

import { useContainerBoundary } from '../hooks';
import {
  tooltipTransitionDelay,
  tooltipTransitionDuration,
} from '../variables';

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const ContentWrapper = styled.div<{
  zIndex: string | number;
  isOpen?: boolean;
  hasTransition?: boolean;
}>`
  position: absolute;
  ${props => props.zIndex && `z-index: ${props.zIndex}`};
  ${props => !props.isOpen && `opacity: 0; pointer-events: none`};
  ${props =>
    props.hasTransition &&
    `transition: opacity ${tooltipTransitionDuration}ms ${tooltipTransitionDelay}ms`};
`;

export const PlayerPopover = ({
  children,
  content,
  isOpen,
  zIndex = 500,
  placement = 'top',
  hasTransition,
  offset = 0.5,
  dummyPropToForceReRender,
  ...props
}: PopoverProps): JSX.Element => {
  const { ref, boundaryRef } = useContainerBoundary();
  const unitOffset = offset * unit;

  const { x, y, update, refs } = useFloating({
    placement,
    middleware: [
      shift({
        padding: 4,
        boundary: boundaryRef.current,
      }),
      floatingUiOffset(unitOffset),
      autoPlacement({
        boundary: boundaryRef.current,
        rootBoundary: 'viewport',
        allowedPlacements: ['top', 'bottom'],
      }),
    ],
    strategy: 'absolute',
  });

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current || hasTransition) {
      return;
    }

    return autoUpdate(refs.reference.current, refs.floating.current, update, {
      ancestorScroll: false,
    });
  }, [refs.reference, refs.floating, update, hasTransition]);

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current || hasTransition) {
      return;
    }
  }, [hasTransition, refs.floating, refs.reference, update]);

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }

    update();
  }, [refs.reference, refs.floating, update, isOpen]);

  useEffect(() => {
    if (typeof dummyPropToForceReRender === 'number') {
      update();
    }
  }, [dummyPropToForceReRender, update]);

  return (
    <Wrapper ref={refs.reference as unknown as any} {...props}>
      <span ref={ref}>{children}</span>
      <ContentWrapper
        ref={refs.floating as unknown as any}
        isOpen={isOpen}
        zIndex={zIndex}
        hasTransition={hasTransition}
        style={{ left: x ?? '', top: y ?? '' }}
      >
        {content}
      </ContentWrapper>
    </Wrapper>
  );
};

type PopoverProps = {
  children?: React.ReactNode;
  content?: React.ReactNode;
  offset?: number;
  zIndex?: number | string;
  isOpen?: boolean;
  hasTransition?: boolean;
  placement?: Placement;
  dummyPropToForceReRender?: number;
};
