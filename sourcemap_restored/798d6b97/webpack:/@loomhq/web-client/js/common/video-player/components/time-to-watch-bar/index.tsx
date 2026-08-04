/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { useViewportContext } from '@js/common/video-player/viewportContext';
import React from 'react';

import { Arrange, Icon, u } from '@loomhq/lens';
import { SvgSpeedFast } from '@loomhq/lens/icons/speed-fast';
import { SvgSpeedMedium } from '@loomhq/lens/icons/speed-medium';
import { SvgSpeedSlow } from '@loomhq/lens/icons/speed-slow';

import { useVideoContext } from '../../context';
import { usePlaybackRate, useSyncVideoContextDuration } from '../../hooks';
import { getLargestValue, secondsToHumanReadableString } from '../../utils';
import { colors, playOptionsWidth, smallPlayerHeight } from '../../variables';

const Wrapper = styled.div<{ fontSize: number }>`
  background-color: ${colors.speedSelectorBackground};
  border-radius: ${u(3)};
  font-size: ${props => props.fontSize}px;
  border: 4px solid ${colors.speedSelectorBackground};
  min-width: ${playOptionsWidth};
`;

const SpeedSelector = styled.div<{ expand: boolean; collapsePadding: boolean }>`
  margin: auto;
  min-width: 75px; // width of icon plus selected speed
  text-align: center;
  transition: all 0.1s ease-in-out;
  padding: ${props => (props.collapsePadding ? 0 : u(0.5))};

  &:hover {
    // width of speed selector when activated
    min-width: ${props => (props.expand ? '172px' : 'auto')};
  }
`;

const Speed = styled.div<{
  active: boolean;
  hidden: boolean;
  selected: boolean;
  fontSize: number;
}>`
  color: ${props =>
    props.selected ? colors.ctaContent : colors.ctaContentInactive};
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  font-size: ${props => (props.active ? props.fontSize : props.fontSize - 4)}px;
  font-weight: var(--lns-fontWeight-bold);
  line-height: ${props => props.fontSize}px;
  height: ${u(3)};
  transition:
    font-size 0.1s ease-in-out,
    color 0.1s ease-in-out; // don't scale font-size or font gets skewed
  white-space: nowrap;
  width: ${props => (props.hidden ? '0' : 'auto')};

  &:hover {
    color: ${props =>
      props.selected ? colors.ctaContent : colors.ctaContentDimmed};
    font-size: 18px;
  }
  &:active {
    color: var(--lns-color-grey2);
    font-size: 15px;
  }
`;

const DurationBar = styled.div<{ collapsePadding: boolean }>`
  background-color: ${colors.durationBackground};
  border-radius: 4px 4px 20px 20px; // Parent radius - padding (for perfect nested radii)
  font-weight: var(--lns-fontWeight-bold);
  padding: ${u(0.75)} ${u(1.25)};
  padding: ${props => (props.collapsePadding ? 0 : u(0.75))} ${u(1.25)};
  text-align: center;
`;

const Duration1x = styled.span<{ active: boolean }>`
  color: ${props =>
    props.active ? colors.ctaContent : colors.ctaContentInactive};
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  ${props =>
    !props.active &&
    `text-decoration: line-through; -webkit-text-decoration-line: line-through;`};
`;

const Emoji = styled.span<{ visible: boolean }>`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: ${props => (props.visible ? 'auto' : '0')};
`;

const DurationNon1x = styled.span<{ visible: boolean; width: number }>`
  color: ${colors.ctaContent};
  display: inline-block;
  height: 20px;
  overflow: hidden;
  position: relative;
  text-align: left;
  white-space: nowrap;
  width: ${props => (props.visible ? `${props.width}px` : '0')};
`;

const DurationWithRate = styled.span<{ visible: boolean }>`
  opacity: ${props => (props.visible ? '1' : '0')};
  position: absolute;
  transform: translateY(${props => (props.visible ? '0' : '20px')});
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); // Bezier curve adds a bounce!
`;

const SPEED_TO_ICON: Record<number, JSX.Element> = {
  0.8: <SvgSpeedSlow />,
  1: <SvgSpeedSlow />,
  1.2: <SvgSpeedSlow />,
  1.5: <SvgSpeedMedium />,
  1.7: <SvgSpeedFast />,
  2: <SvgSpeedFast />,
  2.5: <SvgSpeedFast />,
};

export const TimeToWatchBar = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element | null => {
  const {
    rates,
    rate,
    ratePreview,
    updateRatePreview,
    resetRatePreview,
    onChange,
  } = usePlaybackRate(videoId);
  const durationNon1xRefs = React.useRef([]);

  durationNon1xRefs.current = rates.map(
    (_, i) => durationNon1xRefs.current[i] ?? React.createRef()
  );
  const activeRate = ratePreview || rate;
  const activeRateIs1x = activeRate === 1;
  const [hover, setHover] = React.useState(false);
  const { video } = useVideoContext();
  const { height } = useViewportContext();
  const hasSmallerHeight = height <= smallPlayerHeight;

  const { playableDuration } = video.videoProperties;

  useSyncVideoContextDuration();

  if (!playableDuration || Number.isNaN(playableDuration)) {
    return null;
  }

  const humanReadableDuration1x = secondsToHumanReadableString(
    playableDuration,
    {
      // show min and sec of 1x duration if less than 3 min
      showMinutesAndSeconds: playableDuration < 180,
    }
  );

  // get widths of durations to adjust width of container
  const durationNon1xWidths = durationNon1xRefs.current.map(duration => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const durationCopy = duration as any;

    if (durationCopy.current) {
      return durationCopy.current.offsetWidth;
    }

    return 0;
  });

  const ratesNon1xToWidths: Record<number, number> = rates.reduce(
    (acc, rate, index) => ({
      ...acc,
      [rate]: durationNon1xWidths[index],
    }),
    {}
  );

  const columnGridTemplate = rates
    .map(rate => (Number.isInteger(rate) ? '26px' : '34px'))
    .join(' ');

  return (
    <Wrapper fontSize={hasSmallerHeight ? 12 : 14}>
      <Arrange autoFlow="row" gap="xsmall" justifyContent="stretch">
        {/* eslint-disable-next-line styled-components-a11y/no-static-element-interactions */}
        <SpeedSelector
          onMouseLeave={() => {
            setHover(false);
            resetRatePreview();
          }}
          expand={hover}
          collapsePadding={hasSmallerHeight}
        >
          <Arrange
            justifyContent="center"
            columns={hover ? columnGridTemplate : ''}
          >
            {rates.map((speedValue, index) => {
              return (
                // eslint-disable-next-line styled-components-a11y/no-static-element-interactions, styled-components-a11y/click-events-have-key-events, styled-components-a11y/no-static-element-interactions
                <Speed
                  key={index}
                  // eslint-disable-next-line styled-components-a11y/mouse-events-have-key-events
                  onMouseOver={() => {
                    setHover(true);
                    updateRatePreview(speedValue);
                  }}
                  onClick={() => onChange(speedValue)}
                  active={activeRate === speedValue}
                  hidden={!hover && activeRate !== speedValue}
                  selected={rate === speedValue}
                  fontSize={hasSmallerHeight ? 14 : 18} // in px
                >
                  <Arrange gap="xsmall" justifyContent="center">
                    {!hover && (
                      <Icon
                        icon={SPEED_TO_ICON[speedValue]}
                        color={colors.ctaContent}
                      />
                    )}
                    <span>{speedValue}×</span>
                  </Arrange>
                </Speed>
              );
            })}
          </Arrange>
        </SpeedSelector>
        <DurationBar collapsePadding={hasSmallerHeight}>
          <Arrange
            gap={activeRateIs1x ? 'none' : 'xsmall'}
            justifyContent="center"
            alignItems="start"
          >
            <Duration1x active={activeRateIs1x}>
              {humanReadableDuration1x}
            </Duration1x>
            <Emoji visible={!activeRateIs1x}>
              {activeRate < 1 ? '🐢' : '⚡️'}
            </Emoji>
            <DurationNon1x
              visible={!activeRateIs1x}
              width={
                hover
                  ? getLargestValue(durationNon1xWidths)
                  : ratesNon1xToWidths[rate]
              }
            >
              {rates.map((rateNon1x, index) => (
                <DurationWithRate
                  key={index}
                  visible={activeRate === rateNon1x}
                  ref={durationNon1xRefs.current[index]}
                >
                  {secondsToHumanReadableString(playableDuration / rateNon1x, {
                    showMinutesAndSeconds: true,
                  })}
                </DurationWithRate>
              ))}
            </DurationNon1x>
          </Arrange>
        </DurationBar>
      </Arrange>
    </Wrapper>
  );
};
