// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { u } from '@loomhq/lens';

import { useBrandingPrimaryColor } from '../context';
import {
  useBufferedParts,
  usePlayerHasStarted,
  useSmoothProgressBar,
  useTimelineSlider,
} from '../hooks';
import { useSeekPreview } from '../hooks/seekPreview';
import { colors, defaultTransition } from '../variables';
import { RangeSlider } from './range-slider';

const ProgressBarWrapper = styled.div`
  height: ${u(1)};
  display: flex;
`;

const Progress = styled.progress`
  -webkit-appearance: none;
  appearance: none;
  border: none;
  width: 100%;
  background: ${colors.progressTrackFill};

  &::-moz-progress-bar {
    background-image: linear-gradient(
      ${props => `${props.color}, ${props.color}`}
    );
  }

  &::-webkit-progress-value {
    background-image: linear-gradient(
      ${props => `${props.color}, ${props.color}`}
    );
  }
`;

const BufferedWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  transition: transform var(--progressTransition);
`;

const BufferedPart = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  background: hsla(0, 0%, 100%, 0.4);
  transform: translate3d(0, 0, 0) scaleY(var(--progressHeightScale));
  transition: transform var(--progressTransition);
`;

export const TimeTooltip = styled.time`
  position: absolute;
  top: ${u(-0.5)};
  left: 0;
  width: fit-content;
  padding: ${u(0.5)} ${u(1)};
  transform: translate(-50%, -100%);
  font-size: var(--lns-fontSize-small);
  line-height: var(--lns-lineHeight-small);
  font-weight: var(--lns-fontWeight-book);
  color: var(--lns-color-body);
  background: var(--lns-color-background);
  border-radius: var(--lns-radius-medium);
  box-shadow: var(--lns-shadow-medium);
  opacity: var(--seekPreviewOpacity, 0);
  transition: opacity ${defaultTransition}ms ease-in;
  pointer-events: none;
  font-feature-settings: 'tnum';
  z-index: 1;
`;

export const ThumbTooltip = styled.div`
  position: absolute;
  top: ${u(-5)};
  left: var(--seekPreviewOffset, 0);
  left: clamp(
    calc(var(--seekPreviewW, 0) / 2) + 8px,
    var(--seekPreviewOffset, 0),
    calc(100% - var(--seekPreviewW, 0) / 2) - 8px
  );
  border-radius: var(--lns-radius-medium);
  outline: 2px solid var(--lns-color-body);
  box-shadow: var(--lns-shadow-small);
  width: var(--seekPreviewW, 0);
  height: var(--seekPreviewH, 0);
  opacity: var(--seekPreviewOpacity, 0);
  transform: translate(-50%, -100%);
  transition: opacity 0.2ms ease-in;
  pointer-events: none;
  overflow: hidden;
  img {
    position: relative;
  }
`;

export const ProgressBar = ({
  videoId,
  modelId,
  withTooltip = true,
  ...props
}: {
  videoId: string;
  modelId?: string;
  withTooltip?: boolean;
}): JSX.Element => {
  const ref = useTimelineSlider(videoId);
  const hasStarted = usePlayerHasStarted(videoId);
  const brandingColor = useBrandingPrimaryColor();
  const trackFillColor = brandingColor || colors.timelineSliderTrackFill;

  return (
    <RangeSlider
      videoId={videoId}
      isDisabled={!hasStarted}
      color={trackFillColor}
      ref={ref}
      {...props}
      data-name="RangeSlider"
    >
      <BufferedTimeline videoId={videoId} />
      {withTooltip && (
        <ProgressBarTooltips
          hasStarted={hasStarted}
          videoId={modelId && videoId !== modelId ? modelId : videoId}
        />
      )}
    </RangeSlider>
  );
};

const ProgressBarTooltips = ({
  hasStarted,
  videoId,
}: {
  hasStarted: boolean;
  videoId: string;
}) => {
  const ref = useSeekPreview(hasStarted, videoId);

  return (
    <>
      <TimeTooltip className="progressValueTooltip" />
      <ThumbTooltip className="seekThumbTooltip" ref={ref}>
        <img alt="thumb" style={{ maxWidth: 'none' }} />
      </ThumbTooltip>
    </>
  );
};

const BufferedTimeline = ({ videoId }: { videoId: string }) => {
  const bufferedParts = useBufferedParts(videoId);

  return (
    <BufferedWrapper data-name="BufferedTimeline">
      {bufferedParts.map(part => (
        <BufferedPart
          key={part.left}
          style={{ left: `${part.left}%`, width: `${part.width}%` }}
        />
      ))}
    </BufferedWrapper>
  );
};

export const ProgressBarClip = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element => {
  const { progress } = useSmoothProgressBar(videoId);
  const brandingColor = useBrandingPrimaryColor();
  const trackFillColor = brandingColor || colors.timelineSliderTrackFill;

  return (
    <ProgressBarWrapper data-name="ProgressBarClip">
      <Progress value={progress} max="100" color={trackFillColor} />
    </ProgressBarWrapper>
  );
};
