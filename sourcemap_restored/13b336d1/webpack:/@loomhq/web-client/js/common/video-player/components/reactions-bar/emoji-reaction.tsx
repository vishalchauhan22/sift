import { keyframes } from '@emotion/react';
// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { useDeleteReaction } from '@js/components/video-player-fresh/hooks/reactions';
import React, { useEffect, useState } from 'react';

import { IconButton, Text, u } from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';

import { Reaction } from '../../context';
import { useEmojiData } from '../../emoji-picker/useEmojiData';
import { usePlayingStatus } from '../../hooks';
import {
  defaultTransition,
  emojiReactionSize,
  slowTransition,
  transportIsOpenClassName,
  transportSectionClassName,
  videoMouseIsActiveClassName,
} from '../../variables';

import { Emoji } from '../play-bar/emoji';
import { PlayerPopover } from '../player-popover';
import { AutoEmojiReaction, isAutoEmoji } from './auto-emoji-reaction';
import {
  animationDuration,
  Confetti,
  currentEmojiClassName,
  newEmojiClassName,
  jumpTiming,
} from './confetti';
import { formatReactionAnnouncement } from '@js/utilities/reactionAnnouncements/formatReactionAnnouncement';

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const emojiInfoXSpace = u(1.5);

const EmojiReactionWrapper = styled.div<{
  emojiIsHideable: boolean;
}>`
  width: ${emojiReactionSize};
  display: block;
  position: relative;
  transition: opacity ${slowTransition}ms;

  ${props => props.emojiIsHideable && `opacity: 0`};

  .${videoMouseIsActiveClassName} &,
  .${transportSectionClassName}:hover &,
  &.${currentEmojiClassName} {
    opacity: 1;
  }
`;

const EmojiInfo = styled.div<{ paddingRight?: string }>`
  background-color: var(--lns-color-background);
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  gap: var(--lns-space-xsmall);
  border-radius: var(--lns-radius-medium);
  padding: 0 ${props => props.paddingRight} 0 ${emojiInfoXSpace};
  height: ${u(4)};
  white-space: nowrap;
`;

const InfoSection = styled.div`
  padding-bottom: var(--lns-space-small);
`;

const jump = keyframes`
  0% {
    transform: translateY(0) scale(0.4) rotate(30deg);
    opacity: 0;
  }
  ${jumpTiming / 4}% {
    transform: translateY(${u(-1.875)}) scale(1.8) rotate(-10deg);
    opacity: 1;
  }
  ${jumpTiming / 2}% {
    transform: translateY(${u(0.25)}) rotate(15deg);
  }
  ${jumpTiming / 1.67}% {
    transform: translateY(${u(-0.125)}) rotate(-2deg);
  }
  ${jumpTiming / 1.5}% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% { opacity: 1 }
`;

const EmojiImageWrapper = styled.div<{
  emojiIsHideable?: boolean;
  delayMultiplier?: number;
  emojiFlagIsEnabled?: boolean;
}>`
  animation-timing-function: cubic-bezier(1, 0, 0, 1);
  will-change: transform;
  cursor: pointer;
  transition: opacity ${defaultTransition}ms 0.1s;

  ${props => props.emojiFlagIsEnabled && `position:relative; top: -4px;`}

  animation-delay: var(--animationDelay);

  &.${currentEmojiClassName}:not(.${newEmojiClassName}) {
    transition: opacity 0ms;
    opacity: 0;
    animation-name: ${jump};
    animation-fill-mode: forwards;
    animation-duration: ${animationDuration}ms;

    .${videoMouseIsActiveClassName} &,
    .${transportIsOpenClassName} & {
      opacity: 1;
      animation-duration: 0ms;
    }
  }

  .${videoMouseIsActiveClassName} &,
  .${transportIsOpenClassName} & {
    animation-duration: 0ms;
  }

  .${newEmojiClassName} {
    --animationDelay: unset;
    animation-name: ${jump};
    animation-fill-mode: forwards;
    animation-duration: ${animationDuration}ms;
  }

  // prevent delay on rapid clicking
  &.${newEmojiClassName} {
    animation-delay: 0ms;
  }
`;

const IS_NEW_ATTR = 'reactionIsNew';

export const EmojiReaction = React.memo(
  ({
    videoId,
    reaction,
    isCurrent = false,
    isNew = false,
  }: {
    reaction: Reaction;
    videoId: string;
    isCurrent: boolean;
    isNew: boolean;
  }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentEmojiClass, setCurrentEmojiClass] = useState('');
    const [newEmojiClass, setNewEmojiClass] = useState('');
    const { getEmojiUnicodeByName } = useEmojiData();
    const deleteReaction = useDeleteReaction();

    const {
      name: authorName = '',
      type: variant,
      modelId: reactionId,
      canDelete,
    } = reaction;

    const wrapperRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = wrapperRef.current;

      if (!isNew || !el) {
        return;
      }

      if (!el.getAttribute(IS_NEW_ATTR)) {
        setNewEmojiClass(newEmojiClassName);
        el.setAttribute(IS_NEW_ATTR, 'true');
      }

      const onEnd = () => {
        setNewEmojiClass('');
        el.removeAttribute(IS_NEW_ATTR);
        el.removeEventListener('animationend', onEnd);
      };

      wrapperRef.current?.addEventListener('animationend', onEnd);
    }, [isNew, wrapperRef]);

    useEffect(() => {
      const el = wrapperRef.current;

      if (!isCurrent || !el || el.getAttribute(IS_NEW_ATTR)) {
        return;
      }

      setCurrentEmojiClass(currentEmojiClassName);
      const onEnd = () => {
        setCurrentEmojiClass('');
        el.removeEventListener('animationend', onEnd);
      };

      el.addEventListener('animationend', onEnd);
    }, [isCurrent, wrapperRef]);

    const handleDelete = (e: React.SyntheticEvent) => {
      e.stopPropagation();
      deleteReaction({
        reactionId,
        type: variant,
      });
    };

    const { status } = usePlayingStatus(videoId);
    const emojiIsHideable = status === 'playing' && !newEmojiClass;

    return (
      <div
        aria-label={formatReactionAnnouncement(reaction.type, reaction.time)}
        aria-live="polite"
        role="status"
        aria-relevant="text"
      >
        {/* eslint-disable-next-line styled-components-a11y/click-events-have-key-events, styled-components-a11y/no-static-element-interactions */}
        <EmojiReactionWrapper
          className={currentEmojiClass}
          emojiIsHideable={emojiIsHideable}
          onMouseEnter={() => setIsOpen(true)}
          onTouchStart={() => setIsOpen(true)}
          onTouchMove={() => setIsOpen(false)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={() => setIsOpen(false)}
        >
          <Confetti className={`${currentEmojiClass} ${newEmojiClass}`} />
          <PlayerPopover
            zIndex={1}
            isOpen={isOpen}
            hasTransition
            content={
              <InfoSection>
                {isAutoEmoji(reactionId) ? (
                  <AutoEmojiReaction handleDelete={handleDelete} />
                ) : (
                  <EmojiInfo
                    paddingRight={canDelete ? u(0.6) : emojiInfoXSpace}
                  >
                    <Text color="body" size="body-sm">
                      {authorName}
                    </Text>
                    {canDelete && (
                      <IconButton
                        size="small"
                        altText="Remove"
                        icon={<SvgClose />}
                        onClick={handleDelete}
                      />
                    )}
                  </EmojiInfo>
                )}
              </InfoSection>
            }
            offset={0}
          >
            <EmojiImageWrapper
              emojiIsHideable={emojiIsHideable}
              className={`${currentEmojiClass} ${newEmojiClass}`}
              ref={wrapperRef}
            >
              <Emoji
                size={emojiReactionSize}
                aria-label={variant as string}
                className={`${currentEmojiClass} ${newEmojiClass}`}
              >
                {getEmojiUnicodeByName(variant as string, true)}
              </Emoji>
            </EmojiImageWrapper>
          </PlayerPopover>
        </EmojiReactionWrapper>
      </div>
    );
  }
);

EmojiReaction.displayName = 'EmojiReaction';
