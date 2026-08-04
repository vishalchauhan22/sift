/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { u } from '@loomhq/lens';

import {
  useCommentPortal,
  useMouseMovement,
  usePlayerHasStarted,
  usePlayingStatus,
} from '../..';
import { useVideoId } from '../../context';
import {
  playBarHeight,
  defaultTransition,
  transportSectionClassName,
  videoGlobalContainerClassName,
  reactionsBarHeight,
  transportIsOpenClassName,
  videoMouseIsActiveClassName,
} from '../../variables';

const getShadowStyles = (initialBlur = 3, opacity = 0.35) => {
  const blurs = [initialBlur, initialBlur * 2, initialBlur * 3];

  const shadows = blurs.map(blur => {
    const spread = blur * 2;
    const y = blur + spread;

    return `inset 0 ${u(-y)} ${u(blur)} ${u(
      -spread
    )} hsl(0 0% 0% / ${opacity})`;
  });

  return `box-shadow: ${shadows};`;
};

const Wrapper = styled.div<{
  hasStarted?: boolean;
  showChaptersBar?: boolean;
}>`
  --playBarTranslateY: ${props => (props.hasStarted ? playBarHeight : 0)};
  --overlayOpacity: 0;

  .${videoMouseIsActiveClassName} &,
  .${transportIsOpenClassName} & {
    --playBarTranslateY: ${props =>
      props.hasStarted ? 0 : reactionsBarHeight};
    --overlayOpacity: ${props => (props.hasStarted ? 1 : 0)};
  }

  ${props =>
    !props.hasStarted &&
    `
    .${videoGlobalContainerClassName}:hover & {
      --playBarTranslateY: 0;
      ${props.showChaptersBar && `bottom: var(--lns-space-small);`}
    }
  `}

  position: absolute;
  bottom: 0;
  width: 100%;
  transition: ${defaultTransition}ms;
  pointer-events: initial;
  transform: translateY(var(--playBarTranslateY));

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: calc(${playBarHeight} + ${u(40)});
    width: 100%;
    display: block;
    z-index: -1;
    pointer-events: none;
    ${props =>
      props.showChaptersBar
        ? getShadowStyles(3, 0.5)
        : getShadowStyles(3, 0.35)};
    transition: ${defaultTransition}ms opacity;
    opacity: var(--overlayOpacity);
  }
`;

export const TransportSection = ({
  children,
  showChaptersBar,
  sticky = false,
}: {
  showChaptersBar?: boolean;
  children: React.ReactNode;
  sticky?: boolean;
}): JSX.Element => {
  const videoId = useVideoId();
  const ref = useMouseMovement();
  const { isOpen } = useCommentPortal();
  const { status } = usePlayingStatus(videoId);
  const hasStarted = usePlayerHasStarted(videoId);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current || !hasStarted) {
      return;
    }

    const videoGlobalContainer = ref.current.closest(
      `.${videoGlobalContainerClassName}`
    ) as Element;

    if (status !== 'playing' || isHovered || isOpen || sticky) {
      videoGlobalContainer.classList.add(transportIsOpenClassName);

      return;
    }

    videoGlobalContainer.classList.remove(transportIsOpenClassName);
  }, [ref, hasStarted, status, isHovered, isOpen, sticky]);

  return (
    // eslint-disable-next-line styled-components-a11y/no-static-element-interactions
    <Wrapper
      showChaptersBar={showChaptersBar}
      hasStarted={hasStarted}
      className={transportSectionClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={ref}
    >
      {children}
    </Wrapper>
  );
};
