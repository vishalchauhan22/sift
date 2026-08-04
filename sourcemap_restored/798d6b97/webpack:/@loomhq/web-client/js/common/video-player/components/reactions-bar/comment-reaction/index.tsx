/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React, { useCallback } from 'react';

import { u } from '@loomhq/lens';

import { CommentBucket, usePlayerFromContext } from '../../..';
import { useVideoId } from '../../../context';
import { useFullScreenToggle } from '../../../hooks';
import { commentReactionSize } from '../../../variables';
import { PlayerPopover } from '../../player-popover';
import { CommentSummary } from './comment-summary';

export const allowedAttrsCommentBubbles = ['href', 'target'];

const SIDEBAR_MANUAL_HOVER_CLASS_NAME = 'sidebar-comment-thread-hover-manual';
const SIDEBAR_AUTO_HOVER_CLASS_NAME = 'sidebar-comment-thread-hover-auto';

const hasComments = (bucket: CommentBucket) => Boolean(bucket.commentCount > 1);

// Adds the class "sidebar-comment-thread-hover" to the comment threads included in the bucket.
// Which results in highlighting the related comment in the sidebar.
// Demo: https://share.cleanshot.com/1XxRJRCV
const highlightSidebarComments = (
  commentBucket: CommentBucket,
  isHovered: boolean,
  isCurrent: boolean
) => {
  commentBucket.commentIds.forEach(commentId => {
    const elem = document.getElementById(
      `sidebar-comment-thread-parent-id-${commentId}`
    );

    if (elem) {
      if (isHovered) {
        elem.classList.remove(SIDEBAR_AUTO_HOVER_CLASS_NAME);
        elem.classList.add(SIDEBAR_MANUAL_HOVER_CLASS_NAME);
      } else if (isCurrent) {
        elem.classList.remove(SIDEBAR_MANUAL_HOVER_CLASS_NAME);
        elem.classList.add(SIDEBAR_AUTO_HOVER_CLASS_NAME);
      } else {
        elem.classList.remove(SIDEBAR_AUTO_HOVER_CLASS_NAME);
        elem.classList.remove(SIDEBAR_MANUAL_HOVER_CLASS_NAME);
      }
    }
  });
};

const CommentIcon = ({
  width,
  onClick,
}: {
  width: string | number;
  onClick: () => void;
}) => (
  <svg
    className="CommentIcon"
    onClick={onClick}
    width={width}
    viewBox="0 0 20 19"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.81359 1.81359C2.33453 1.29266 3.04107 1 3.77778 1H16.2222C16.9589 1 17.6655 1.29266 18.1864 1.81359C18.7073 2.33453 19 3.04106 19 3.77778V11.6667C19 12.4034 18.7073 13.1099 18.1864 13.6309C17.6655 14.1518 16.9589 14.4444 16.2222 14.4444H5.96977L2.70711 17.7071C2.42111 17.9931 1.99099 18.0787 1.61732 17.9239C1.24364 17.7691 1 17.4045 1 17V3.77778C1 3.04107 1.29266 2.33453 1.81359 1.81359Z"
      fill="currentColor"
    />
    <path
      d="M3.77778 0.5C2.90846 0.5 2.07474 0.845336 1.46004 1.46004C0.845336 2.07474 0.5 2.90846 0.5 3.77778V17C0.5 17.6067 0.865464 18.1536 1.42597 18.3858C1.98649 18.618 2.63166 18.4897 3.06066 18.0607L6.17688 14.9444H16.2222C17.0915 14.9444 17.9253 14.5991 18.54 13.9844C19.1547 13.3697 19.5 12.536 19.5 11.6667V3.77778C19.5 2.90846 19.1547 2.07474 18.54 1.46004C17.9253 0.845336 17.0915 0.5 16.2222 0.5H3.77778Z"
      stroke="white"
      strokeOpacity="0.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Count = styled.span`
  --alignWithCommentIconOffset: ${u(-0.25)};

  position: relative;
  pointer-events: none;
  color: white;
  font-size: ${u(1.4)};
  line-height: 1;
  font-weight: var(--lns-fontWeight-bold);
  top: var(--alignWithCommentIconOffset);
`;

const CommentIconWrapper = styled.div<{ isHovered?: boolean }>`
  width: ${commentReactionSize};
  display: grid;
  cursor: pointer;
  position: relative;
  grid-template-areas: 'stack';
  place-items: center;
  color: ${props =>
      props.isHovered
        ? `var(--lns-color-grey7);`
        : `var(--lns-color-background);`}
    & > * {
    grid-area: stack;
  }

  & .CommentIcon {
    width: 100%;
  }
`;

type CommentReactionProps = {
  commentBucket: CommentBucket;
  isCurrent?: boolean;
};

// eslint-disable-next-line react/display-name
export const CommentReaction = React.memo(
  ({
    commentBucket,
    isCurrent = false,
    ...props
  }: CommentReactionProps &
    React.ComponentProps<typeof CommentIconWrapper>) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const videoId = useVideoId();

    const player = usePlayerFromContext();

    const handleCommentClick = () => {
      player?.commentClicked(commentBucket.commentIds);
    };

    const handleMouseEnter = useCallback(
      () => setIsHovered(true),
      [setIsHovered]
    );
    const handleMouseLeave = useCallback(
      () => setIsHovered(false),
      [setIsHovered]
    );

    const { isFullScreen } = useFullScreenToggle(videoId);

    // add isFullScreen to rerender and recalculate tooltip position when entering/exiting fullscreen
    React.useEffect(() => {
      const shouldOpen = isHovered || isCurrent;

      setIsOpen(shouldOpen);

      !isFullScreen &&
        highlightSidebarComments(commentBucket, isHovered, isCurrent);
    }, [isHovered, isCurrent, isFullScreen, commentBucket]);

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable
      <div
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter}
        onTouchMove={handleMouseLeave}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseLeave}
      >
        {/* eslint-enable */}
        <PlayerPopover
          offset={0}
          zIndex={3}
          isOpen={isOpen}
          hasTransition
          // we need the popover to re-render its position every time the content changes
          dummyPropToForceReRender={isHovered ? 1 : 0}
          placement="top-start"
          content={
            <CommentSummary
              commentBucket={commentBucket}
              handleCommentClick={handleCommentClick}
              isExpanded={isHovered}
              isMinimized={isCurrent}
            />
          }
        >
          <CommentIconWrapper isHovered={isHovered} {...props}>
            <CommentIcon onClick={handleCommentClick} width={18} />
            {hasComments(commentBucket) && (
              <Count>{commentBucket.commentCount}</Count>
            )}
          </CommentIconWrapper>
        </PlayerPopover>
      </div>
    );
  }
);
