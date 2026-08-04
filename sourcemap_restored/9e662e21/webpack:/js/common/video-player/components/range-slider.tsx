// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React, { MutableRefObject } from 'react';

import { u } from '@loomhq/lens';

import { Events, track } from '../api';
import { isTouchDevice } from '../utils';
import {
  colors,
  fastTransition,
  progressHeight,
  xxFastTransition,
  playbarDragArea,
} from '../variables';

type RangeSliderProps = {
  color?: string;
  isRounded?: boolean;
  alwaysVisible?: boolean;
  isDisabled?: boolean;
  showingChaptersBar?: boolean;
  videoId?: string;
};

const progressHeightPx = 4;
const progressHeightHoverPx = 6;
const progressScaleHover = progressHeightHoverPx / progressHeightPx;

const ProgressWrapper = styled.section<RangeSliderProps>`
  width: 100%;
  outline: none;
  height: ${playbarDragArea};
  margin: calc((${playbarDragArea} - ${progressHeight}) / -2) 0;
  user-select: none;
  touch-action: none;
  position: relative;
  border-radius: var(--progressRadius);

  --thumbScale: 0;
  --thumbSize: ${u(1.6)};
  --progressValue: 10%;
  --progressHeightScale: 1;
  --progressColor: ${props => props.color};
  --progressRadius: ${props =>
    props.isRounded ? 'var(--lns-radius-medium)' : ''};
  --progressTransition: ${fastTransition}ms ${xxFastTransition}ms;

  &:hover,
  &:focus,
  &[mouse-down],
  &.alwaysVisible {
    cursor: pointer;

    --thumbScale: 1;
    --progressHeightScale: ${progressScaleHover};
  }

  &:focus-within {
    box-shadow: 0 0 0 2px var(--lns-color-focusRing);
  }

  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);

  & * {
    backface-visibility: hidden;
  }

  ${props => props.isDisabled && `pointer-events: none;`}
`;

const ProgressTrack = styled.div`
  height: ${playbarDragArea};
  position: relative;
  border-radius: var(--progressRadius);
  transition: height var(--progressTransition);
`;

export const ProgressFilled = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: ${progressHeight};
  transform: translate3d(0, 0, 0) scaleY(var(--progressHeightScale));
  left: 0;
  width: var(--progressValue);
  background: var(--progressColor);
  border-radius: var(--progressRadius);
  transition: transform var(--progressTransition);
`;

const ProgressBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: ${progressHeight};
  transform: translate3d(0, 0, 0) scaleY(var(--progressHeightScale));
  left: 0;
  width: 100%;
  background: ${colors.sliderTrack};
  transition: transform var(--progressTransition);
  border-radius: var(--progressRadius);
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: ${progressHeight};
  width: 100%;
`;

interface ProgressThumbProps {
  showingChaptersBar: boolean | undefined;
}

const ProgressThumb = styled.div<ProgressThumbProps>`
  --thumbOffset: calc(var(--thumbSize) / 2);

  position: absolute;
  top: 0;
  bottom: 0;
  z-index: ${props => (props.showingChaptersBar ? 2 : 1)};
  width: var(--thumbSize);
  height: var(--thumbSize);
  border-radius: 100%;
  background-color: var(--progressColor);
  box-shadow: 0 ${u(0.25)} ${u(0.5)} rgba(0, 0, 0, 0.2);
  top: 0;
  left: min(
    calc(100% - var(--thumbOffset)),
    max(var(--thumbOffset), var(--progressValue))
  );
  margin-left: calc(var(--thumbOffset) * -1);
  margin-top: auto;
  margin-bottom: auto;
  transform: translate3d(0, 0, 0) scale(var(--thumbScale));
  opacity: var(--thumbScale);
  transition:
    opacity var(--progressTransition),
    transform var(--progressTransition);
`;

const isTouch = isTouchDevice();

export const RangeSlider = React.forwardRef<
  HTMLDivElement,
  RangeSliderProps & { children?: React.ReactNode }
>(({ children, isDisabled, showingChaptersBar, videoId, ...props }, ref) => {
  const alwaysVisible = isTouch || props.alwaysVisible;

  const onProgressTrackClick = () => {
    if (!videoId) {
      return;
    }

    const el = (ref as MutableRefObject<HTMLDivElement>).current;
    const text = el.innerText;
    let timestamp;

    // if chapters are present, the text will be in the format of <chapter>\n<timestamp>
    // otherwise, it will just be the timestamp
    if (text.includes('\n')) {
      timestamp = text.split('\n')[1];
    } else {
      timestamp = text;
    }

    track({
      event: Events.VIDEO_TIMELINE_CLICKED,
      payload: {
        video_id: videoId,
        timeline_timestamp: timestamp,
      },
    });
  };

  return (
    <ProgressWrapper
      className={alwaysVisible ? 'alwaysVisible' : ''}
      tabIndex={0}
      ref={ref}
      {...props}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      isDisabled={isDisabled}
    >
      {/* eslint-disable-next-line styled-components-a11y/click-events-have-key-events, styled-components-a11y/no-static-element-interactions */}
      <ProgressTrack data-name="ProgressTrack" onClick={onProgressTrackClick}>
        <ChildrenWrapper>{children}</ChildrenWrapper>
        {!showingChaptersBar && <ProgressFilled data-name="ProgressFilled" />}
        <ProgressThumb
          data-name="ProgressThumb"
          showingChaptersBar={showingChaptersBar}
        />
        {!showingChaptersBar && (
          <ProgressBackground data-name="ProgressBackground" />
        )}
      </ProgressTrack>
    </ProgressWrapper>
  );
});

RangeSlider.displayName = 'RangeSlider';
