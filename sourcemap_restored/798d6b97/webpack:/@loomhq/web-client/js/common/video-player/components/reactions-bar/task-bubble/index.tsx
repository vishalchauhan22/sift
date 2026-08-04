/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { Task, useVideoId } from '@js/common/video-player';
import React, { useCallback } from 'react';

import { IconButton } from '@loomhq/lens';
import { SvgTask } from '@loomhq/lens/icons/task';

import { useFullScreenToggle, usePlayerFromContext } from '../../../hooks';
import { PlayerPopover } from '../../player-popover';
import { CommentSummary } from '../comment-reaction/comment-summary';

export const allowedAttrsCommentBubbles = ['href', 'target'];

const IconWrapper = styled.div`
  & button:hover {
    background-color: inherit;
  }
`;

const highlightSidebarTask = (
  taskId: string,
  isHovered: boolean,
  isCurrent: boolean
) => {
  const elem = document.getElementById(`sidebar-video-task-${taskId}`);

  if (elem) {
    if (isHovered) {
      elem.style.backgroundColor = 'var(--lns-color-highlight)';
    } else if (isCurrent) {
      elem.style.backgroundColor = 'var(--lns-color-backgroundSecondary)';
    } else {
      elem.style.backgroundColor = '';
    }
  }
};

type TaskBubbleProps = {
  task: Task;
  isCurrent?: boolean;
};

// eslint-disable-next-line react/display-name
export const TaskBubble = React.memo(
  ({ task, isCurrent = false }: TaskBubbleProps) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const videoId = useVideoId();
    const player = usePlayerFromContext();

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

      !isFullScreen && highlightSidebarTask(task.id, isHovered, isCurrent);
    }, [isCurrent, isFullScreen, isHovered, task.id]);

    const handleClick = () => {
      player?.pause();
      player?.taskClicked(task.id);
    };

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable
      <div
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter}
        onTouchMove={handleMouseLeave}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
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
              task={task}
              isExpanded={isHovered}
              isMinimized={isCurrent}
              handleCommentClick={handleClick}
            />
          }
        >
          <IconWrapper>
            <IconButton
              altText="Task icon on play bar"
              icon={<SvgTask />}
              iconColor={
                isHovered ? 'var(--lns-color-grey7)' : 'var(--lns-color-grey8)'
              }
              onClick={handleClick}
            />
          </IconWrapper>
        </PlayerPopover>
      </div>
    );
  }
);
