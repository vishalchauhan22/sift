/* eslint-disable @loomhq/loom/limit-parent-import-depth */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React, { useEffect, useRef, useCallback, useState } from 'react';

import { Text, u } from '@loomhq/lens';

import { chapterLiteralToSeconds } from '@loomhq/shared-utilities/utilities/timeUtils';

import { useBrandingPrimaryColor } from '../../context';
import {
  useTimelineSlider,
  useBufferedParts,
  usePlayerHasStarted,
} from '../../hooks';
import { useSeekPreview } from '../../hooks/seekPreview';
import { colors, playbarDragArea } from '../../variables';
import { TimeTooltip, ThumbTooltip } from '../progress-bar';
import { RangeSlider } from '../range-slider';
import { ChaptersValidation, TimestampToChapter } from './utils';

const CHAPTER_TOOLTIP_PADDING = 'var(--lns-space-small)';
const CHAPTER_PLAYBAR_DEFAULT_HEIGHT = 'var(--lns-space-xsmall)';
const CHAPTER_PLAYBAR_HOVERED_HEIGHT = 'var(--lns-space-small)';

const CHAPTER_NAME_LIMIT = 50;

const ChaptersHoverHandler = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  top: 0;
  height: ${playbarDragArea};
  margin-top: calc(
    (${playbarDragArea} - ${CHAPTER_PLAYBAR_DEFAULT_HEIGHT}) / -2
  );
`;

const TimeTooltipHoverHandler = styled.div<{ show: boolean }>`
  transition: opacity 200ms ease-in;
  opacity: ${props => (props.show ? 1 : 0)};
`;

const ChaptersBarWrapper = styled.div`
  left: 0;

  z-index: 2;
  width: 100%;

  backface-visibility: hidden;

  position: relative;
  margin-bottom: var(--lns-space-small);
`;

const ChaptersThumbTooltip = styled(ThumbTooltip)`
  top: ${u(-8.5)};
`;

const ChapterSegment = styled.div<{
  left: number;
  width: number;
  borderRadius?: string;
  isHovering?: boolean;
}>`
  position: absolute;
  top: 0;
  background: hsla(0, 0%, 100%, 0.4);
  border-radius: var(--lns-space-small);
  left: ${props => props.left}%;
  width: ${props => props.width}%;
  height: ${props =>
    props.isHovering
      ? CHAPTER_PLAYBAR_HOVERED_HEIGHT
      : CHAPTER_PLAYBAR_DEFAULT_HEIGHT};
  ${props =>
    props.isHovering && `transition: transform var(--progressTransition);`}
  ${props =>
    props.isHovering && `margin-top: calc(-1 * var(--lns-space-xsmall) / 2);`}
`;

const ChapterBufferedPart = styled.div<{
  left: number;
  width: number;
  borderRadius?: string;
  maxWidth: number;
  isHovering: boolean;
}>`
  position: absolute;
  top: 0;
  background: hsla(0, 0%, 100%, 0.4);
  border-radius: var(--lns-space-small);
  left: ${props => props.left}%;
  width: ${props => props.width}%;
  max-width: ${props => props.maxWidth}%;
  height: ${props =>
    props.isHovering
      ? CHAPTER_PLAYBAR_HOVERED_HEIGHT
      : CHAPTER_PLAYBAR_DEFAULT_HEIGHT};
  ${props =>
    props.isHovering && `transition: transform var(--progressTransition);`}
  ${props =>
    props.isHovering && `margin-top: calc(-1 * var(--lns-space-xsmall) / 2);`}
`;

const TooltipWrapper = styled(Text)<{ left: string | null }>`
  position: absolute;
  top: calc(-1 * var(--lns-space-xxlarge));
  ${(props: TooltipWrapperProps) => props.left && `left: ${props.left}`};
  width: fit-content;
  text-shadow: 0px 1px 8px hsla(0, 0%, 0%, 0.8);
  overflow: visible;
  pointer-events: none;
`;

const ChapterHoveringMark = styled.div<{
  left: string;
  hoverColor: string;
}>`
  position: absolute;
  width: var(--lns-space-xsmall);
  height: 14px;
  background-color: ${props => props.hoverColor};
  border-radius: var(--lns-space-xsmall);
  z-index: 1;
  margin-top: calc(-1 * var(--lns-space-xsmall));
  pointer-events: none;
  ${props => props.left && `left: ${props.left}`};
`;

const TimeTooltipForChapter = styled(TimeTooltip)`
  border-radius: var(--lns-radius-large);
  top: -10px;
`;

interface ProgressFilledProps {
  start: number;
  max: number;
  isHovering?: boolean;
}
const ProgressFilledChapter = styled.div<ProgressFilledProps>`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  background: var(--progressColor);
  left: ${props => props.start}%;
  width: calc(var(--progressValue) - ${props => props.start}%);
  max-width: ${props => props.max}%;
  min-width: 0%;
  border-radius: var(--lns-space-small);
  max-height: ${CHAPTER_PLAYBAR_HOVERED_HEIGHT};
  transform: translate3d(0, 0, 0);
  height: ${props =>
    props.isHovering
      ? CHAPTER_PLAYBAR_HOVERED_HEIGHT
      : CHAPTER_PLAYBAR_DEFAULT_HEIGHT};
  ${props =>
    props.isHovering && `transition: transform var(--progressTransition);`}
  ${props =>
    props.isHovering && `margin-top: calc(-1 * var(--lns-space-xsmall) / 2);`}
`;

const ChapterBufferedSegment = ({
  videoId,
  chapterBarLeft,
  chapterWidth,
  max,
  isHovering,
}: {
  videoId: string;
  chapterBarLeft: number;
  chapterWidth: number;
  max: number;
  isHovering: boolean;
}) => {
  const bufferedParts = useBufferedParts(videoId);

  if (bufferedParts.length === 0) {
    return null;
  }

  const chapterBarRight = chapterBarLeft + chapterWidth;

  const bufferedPartsLeft = bufferedParts[0].left;
  const bufferedPartsWidth = bufferedParts[0].width;
  const bufferedPartsRight = bufferedPartsLeft + bufferedPartsWidth;

  const fullyBuffered =
    bufferedPartsRight >= chapterBarLeft &&
    bufferedPartsRight >= chapterBarRight;
  const partiallyBuffered =
    bufferedPartsRight < chapterBarRight && bufferedPartsRight > chapterBarLeft;

  if (!fullyBuffered && !partiallyBuffered) {
    return null;
  }

  const bufferedWidth = fullyBuffered
    ? chapterBarRight
    : bufferedPartsRight - chapterBarLeft;

  return (
    <ChapterBufferedPart
      key={bufferedPartsLeft}
      left={chapterBarLeft}
      width={bufferedWidth}
      maxWidth={max}
      isHovering={isHovering}
    />
  );
};

const FallBack = () => (
  <div className="chapter-section">
    <ChapterSegment left={0} width={100} />
    <ProgressFilledChapter
      data-name="ChapterProgressFilled"
      start={0}
      max={100}
    />
  </div>
);

export const ChaptersBar = ({
  videoId,
  validatedChapters,
  videoDuration,
}: {
  videoId: string;
  validatedChapters: ChaptersValidation;
  videoDuration: number | null;
}): JSX.Element => {
  // used for calculating the left value for the chapter name tooltip
  const timePillRef = useRef<HTMLTimeElement>(null);
  const [timePillLeft, setTimePillLeft] = useState<string | null>(null);
  const ref = useTimelineSlider(videoId);

  const brandingColor = useBrandingPrimaryColor();
  const trackFillColor = brandingColor || colors.timelineSliderTrackFill;
  const [currentChapterIdx, setCurrentChapterIdx] = useState<number | null>(
    null
  );

  const [hoveringOverChaptersBar, setHoveringOverChaptersBar] = useState(false);

  const { chapters, error } = validatedChapters;

  const validChaptersExist = chapters && !error;

  const fullVideoLength = videoDuration || 0;

  const getChapterTimestampsInSecs = useCallback(
    (idx: number) => {
      if (!validChaptersExist) {
        return [0, 0];
      }

      const currentChapter = chapters[idx];
      const nextChapter = chapters[idx + 1];

      const currentTime = chapterLiteralToSeconds(currentChapter.timestamp);

      const endTime = nextChapter
        ? chapterLiteralToSeconds(nextChapter.timestamp)
        : fullVideoLength;

      // this case should never happen but we need to handle it
      if (currentTime === null || endTime === null) {
        return [0, 0];
      }

      return [currentTime, endTime];
    },
    [chapters, validChaptersExist, fullVideoLength]
  );

  const getChapterIdxFromTimePill = useCallback(
    (timePillPercentage: string | null) => {
      if (!validChaptersExist) {
        return null;
      }

      const currentTimeAsPercentageStr = timePillPercentage ?? '0%';
      const currentTimeAsPercentageNum = Number(
        currentTimeAsPercentageStr.replace('%', '')
      );
      const currentTimeInSeconds =
        (currentTimeAsPercentageNum / 100) * fullVideoLength;

      for (let i = 0; i < chapters.length; i++) {
        const [chapterStartTime, chapterEndTime] =
          getChapterTimestampsInSecs(i);

        if (
          chapterStartTime < currentTimeInSeconds &&
          currentTimeInSeconds <= chapterEndTime
        ) {
          return i;
        }
      }

      return null;
    },
    [chapters, validChaptersExist, fullVideoLength, getChapterTimestampsInSecs]
  );

  const handleHoverOverChaptersBar = (hovering: boolean) => {
    setHoveringOverChaptersBar(hovering);

    // hide comment summary wrappers if chapter is showing
    const commentSummaryWrappers = document.getElementsByClassName(
      'comment-summary-wrapper'
    );

    for (let i = 0; i < commentSummaryWrappers.length; i++) {
      const el = commentSummaryWrappers[i] as HTMLElement;

      if (hovering) {
        el.style.opacity = '0';
      } else {
        el.style.opacity = '1';
      }
    }
  };

  const calculateWidth = (duration: number) => {
    return (duration / fullVideoLength) * 100;
  };

  const getCurrentChapterDuration = (index: number) => {
    if (!validChaptersExist) {
      return [0, 0];
    }

    const [chapterStartTime, chapterEndTime] =
      getChapterTimestampsInSecs(index);

    const duration = chapterEndTime - chapterStartTime;
    const paddingBetweenChapters = 0.3;

    let width = calculateWidth(duration) - paddingBetweenChapters;

    if (index === chapters.length - 1) {
      width = 100;
    }

    const currentTimeDuration = calculateWidth(chapterStartTime);

    return [currentTimeDuration, width];
  };

  const hasStarted = usePlayerHasStarted(videoId);

  // observe the position of the time pill so the chapter name
  // tooltip can move along with it
  useEffect(() => {
    const el = timePillRef?.current;

    if (!el || !validChaptersExist) {
      return;
    }

    const ob = new MutationObserver(() => {
      const left = (el as HTMLTimeElement).style.left || '';
      // the left value of time pill uses "clamp(min, progressValue, max)"
      // here we need to get the progressValue value of it
      const [_min, progressValue = '0%', _max] = left.split(',');

      setTimePillLeft(progressValue.trim());
      const index = getChapterIdxFromTimePill(progressValue.trim());

      setCurrentChapterIdx(index);
    });

    ob.observe(el as Node, { attributes: true });

    return () => {
      ob.disconnect();
    };
  }, [validChaptersExist, getChapterIdxFromTimePill]);

  const timelineTooltipProps = {
    videoId,
    timePillRef,
    timePillLeft,
    currentChapterIdx,
    currentChapter: chapters ? chapters[currentChapterIdx ?? 0] : null,
    hoveringOverChaptersBar,
  };

  return (
    <RangeSlider
      isDisabled={!hasStarted}
      videoId={videoId}
      color={trackFillColor}
      ref={ref}
      data-name="RangeSlider"
      showingChaptersBar
    >
      {/* eslint-disable-next-line styled-components-a11y/no-static-element-interactions */}
      <ChaptersHoverHandler
        // eslint-disable-next-line styled-components-a11y/mouse-events-have-key-events
        onMouseOver={() => handleHoverOverChaptersBar(true)}
        onMouseLeave={() => handleHoverOverChaptersBar(false)}
      />
      <TimelineTooltip {...timelineTooltipProps} />
      <ChaptersBarWrapper data-name="ChaptersBar">
        {!validChaptersExist ? (
          <FallBack />
        ) : (
          <>
            {chapters.map((part, idx) => {
              const [left, width] = getCurrentChapterDuration(idx);
              const isHovering =
                hoveringOverChaptersBar && currentChapterIdx === idx;

              return (
                <div className="chapter-section" key={`${left}-${width}`}>
                  <ChapterBufferedSegment
                    videoId={videoId}
                    chapterBarLeft={left}
                    chapterWidth={width}
                    max={width - 0.5}
                    isHovering={isHovering}
                  />
                  <Chapter
                    isHovering={isHovering}
                    idx={idx}
                    key={`chapter-${idx}`}
                    chapterBarLeft={left}
                    timePillLeft={timePillLeft ?? `${left + 1}%`}
                    width={width}
                    part={part}
                    hoverColor={trackFillColor}
                  />
                  <ProgressFilledChapter
                    data-name="ChapterProgressFilled"
                    start={left}
                    max={width - 0.5}
                    isHovering={isHovering}
                  />
                </div>
              );
            })}
          </>
        )}
      </ChaptersBarWrapper>
    </RangeSlider>
  );
};

const TimelineTooltip = ({
  videoId,
  timePillRef,
  timePillLeft,
  currentChapterIdx,
  currentChapter,
  hoveringOverChaptersBar,
}: {
  videoId: string;
  timePillRef: React.RefObject<HTMLTimeElement>;
  timePillLeft: string | null;
  currentChapterIdx: number | null;
  currentChapter: TimestampToChapter | null;
  hoveringOverChaptersBar: boolean;
}) => {
  const [chapterNameLeft, setChapterNameLeft] = useState(timePillLeft);

  useEffect(() => {
    if (hoveringOverChaptersBar) {
      const chapterNameEl = document.querySelector('.chapterTooltip');

      if (chapterNameEl) {
        const chapterNameWidth = chapterNameEl.getBoundingClientRect().width;

        const minLeft = CHAPTER_TOOLTIP_PADDING;
        const maxLeft = `calc(100% - ${chapterNameWidth}px - ${CHAPTER_TOOLTIP_PADDING})`;

        setChapterNameLeft(
          `clamp(${minLeft}, calc(${timePillLeft} - ${
            chapterNameWidth / 2
          }px), ${maxLeft})`
        );
      }
    }
  }, [hoveringOverChaptersBar, timePillLeft, currentChapterIdx]);

  const trimChapterName = useCallback((chapterName: string) => {
    if (!chapterName || !chapterName.length) {
      return '';
    }

    if (chapterName.length > CHAPTER_NAME_LIMIT) {
      return `${chapterName.substring(0, CHAPTER_NAME_LIMIT)}…`;
    }

    return chapterName;
  }, []);

  // TODO: Please refactor this to not be a nested component
  // eslint-disable-next-line react/no-unstable-nested-components
  const ChapterTitleTooltip = ({
    left,
    chapterTitle,
    show,
  }: {
    left: string | null;
    chapterTitle: string;
    show: boolean;
  }): JSX.Element => {
    return (
      <TooltipWrapper
        key={`chapterTooltip-${currentChapterIdx}`}
        className="chapterTooltip"
        left={left}
        hasEllipsis={true}
        ellipsisLines={1}
        size="body-lg"
        fontWeight="bold"
        color="grey1"
        show={show}
      >
        {trimChapterName(chapterTitle)}
      </TooltipWrapper>
    );
  };

  const hasStarted = usePlayerHasStarted(videoId);

  return (
    <TimeTooltipHoverHandler show={hoveringOverChaptersBar}>
      <ChaptersBarThumbTooltip hasStarted={hasStarted} videoId={videoId} />
      <ChapterTitleTooltip
        left={chapterNameLeft}
        chapterTitle={currentChapter?.chapter ?? ''}
      />
      <TimeTooltipForChapter
        className="progressValueTooltip"
        ref={timePillRef}
      />
    </TimeTooltipHoverHandler>
  );
};

const ChaptersBarThumbTooltip = ({
  hasStarted,
  videoId,
}: {
  hasStarted;
  videoId;
}) => {
  const ref = useSeekPreview(hasStarted, videoId);

  return (
    <ChaptersThumbTooltip className="seekThumbTooltip" ref={ref}>
      <img alt="thumb" style={{ maxWidth: 'none' }} />
    </ChaptersThumbTooltip>
  );
};

const Chapter = ({
  chapterBarLeft,
  timePillLeft,
  width,
  part,
  isHovering,
  hoverColor,
}: {
  idx: number;
  isHovering: boolean;
  chapterBarLeft: number;
  timePillLeft: string;
  width: number;
  part: TimestampToChapter;
  hoverColor: string;
}) => {
  return (
    <>
      {isHovering && (
        <ChapterHoveringMark left={timePillLeft} hoverColor={hoverColor} />
      )}
      <ChapterSegment
        key={part.timestamp}
        left={chapterBarLeft}
        width={width - 0.5}
        isHovering={isHovering}
      />
    </>
  );
};
