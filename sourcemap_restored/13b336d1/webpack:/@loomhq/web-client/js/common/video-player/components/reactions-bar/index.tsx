// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useGetVideoTasksQuery } from '@js/common/tasks/GetVideoTasks.generated';
import { filterTasks } from '@js/common/tasks/filterTasks';
import { useVideoPasswordContext } from '@js/common/video-password';
import { parseTasks } from '@js/components/video-player-fresh/utils';
import React, { useMemo } from 'react';

import {
  Reaction,
  Task,
  useCommentsEnabled,
  useReactionsEnabled,
  useSortedReactions,
  useVideoContext,
} from '../../context';
import {
  usePlayerFromContext,
  usePlayerHasStarted,
  useProgressBar,
} from '../../hooks';
import { useCommentBuckets } from '../../hooks/commentBuckets';
import {
  reactionsBarHeight,
  commentReactionSize,
  emojiReactionSize,
  videoGlobalContainerClassName,
  defaultTransition,
} from '../../variables';
import { CommentReaction } from './comment-reaction';
import { staggerDelay } from './confetti';
import { EmojiReaction } from './emoji-reaction';
import { TaskBubble } from './task-bubble';

export const animationDuration = 1200;
export const animationDurationMaxDelay = 200;
const timeOffset = 3000;
const timeOffsetInSec = timeOffset / 1000;
const taskTopOffset = 'var(--lns-space-small)';

const ReactionsBarWrapper = styled.div<{ hasStarted: boolean }>`
  display: flex;
  position: relative;
  height: ${reactionsBarHeight};
  transition:
    transform ${defaultTransition}ms,
    opacity ${defaultTransition}ms;

  ${props =>
    !props.hasStarted &&
    `
    opacity: 0;
    transform: translateY(${reactionsBarHeight});

    .${videoGlobalContainerClassName}:hover & {
      opacity: 1;
      transform: translateY(0);
    }
  `};
`;

const ReactionSection = styled.span`
  display: block;
  position: absolute;
  left: 0;
  top: calc(-1 * var(--taskTopOffset, 0));

  transition: left ${defaultTransition}ms ease-in;
  transform: translateY(0);

  --reactionSize: ${emojiReactionSize};

  left: clamp(
    0%,
    calc(var(--reactionOffset, 0%) - var(--reactionSize, 0%) / 2),
    calc(100% - var(--reactionSize, 0%))
  );

  &:hover {
    z-index: 2;
  }
`;

const getPosition = (time: number, duration: number) => {
  return (100 * time) / duration;
};

export const ReactionsBar = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element | null => {
  const player = usePlayerFromContext();
  const reactions = useSortedReactions();
  const commentBuckets = useCommentBuckets();
  const { password } = useVideoPasswordContext();
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const {
    video: { modelId: videoModelId },
  } = useVideoContext();

  const { data, loading, error } = useGetVideoTasksQuery({
    variables: { videoId: videoModelId, password },
    skip: !isLoggedIn,
  });

  const { approvedTasks } = filterTasks(data);

  const tasks = useMemo(() => {
    return loading || error ? undefined : parseTasks(approvedTasks);
  }, [approvedTasks, error, loading]);

  const { duration, progress, setPosition, currentTime } = useProgressBar(
    videoId,
    true
  );
  const onReactionClicked = React.useCallback(
    ({ position, reaction }: { position: number; reaction: Reaction }) =>
      () => {
        if (!player) {
          return;
        }

        setPosition(position);
        player.reactionClicked({
          reactionId: reaction.modelId,
          type: reaction.type,
        });
      },
    [setPosition, player]
  );

  const commentsEnabled = useCommentsEnabled();
  const reactionsEnabled = useReactionsEnabled();

  const hasStarted = usePlayerHasStarted(videoId);

  if (!duration) {
    return null;
  }

  let index = 0;
  const durationBasedOffset = (duration * 8) / 100;

  const isCurrentBucketOpen = commentBuckets
    .filter(bucket => {
      if (!progress) {
        return false;
      }

      const before = Math.round(
        getPosition(Math.max(bucket.time - 1.5, 0), duration)
      );
      const after = Math.round(
        getPosition(Math.min(bucket.time + 1.5, duration), duration)
      );

      const isCurrent = progress >= before && progress <= after;

      return isCurrent;
    })
    .pop();

  const isCurrentTaskOpen = () => {
    const filteredTasks = tasks?.filter(task => {
      if (!progress) {
        return false;
      }

      const before = Math.round(
        getPosition(Math.max(task.timestamp - 1.5, 0), duration)
      );
      const after = Math.round(
        getPosition(Math.min(task.timestamp + 1.5, duration), duration)
      );

      const isCurrent = progress >= before && progress <= after;

      return isCurrent;
    });

    const lastTask = filteredTasks?.[filteredTasks.length - 1];

    return lastTask?.id;
  };

  return (
    <ReactionsBarWrapper hasStarted={hasStarted}>
      {reactionsEnabled &&
        reactions.map(reaction => {
          const position = getPosition(reaction.time, duration);
          const clickPosition = getPosition(
            reaction.time - Math.min(timeOffsetInSec, durationBasedOffset),
            duration
          );

          const isCurrent = Math.abs(currentTime - reaction.time) < 1;
          const delayMultiplier = isCurrent ? index++ : undefined;
          const animationDelay = delayMultiplier
            ? reaction.time -
              Math.round(currentTime) +
              delayMultiplier * staggerDelay
            : 0;

          return (
            // eslint-disable-next-line styled-components-a11y/click-events-have-key-events, styled-components-a11y/no-static-element-interactions
            <ReactionSection
              key={`r${reaction.displayKey}`}
              style={
                {
                  '--reactionOffset': `${position}%`,
                  '--animationDelay': animationDelay
                    ? `${animationDelay}ms`
                    : 'unset',
                } as React.CSSProperties
              }
              onClick={onReactionClicked({ position: clickPosition, reaction })}
            >
              <EmojiReaction
                videoId={videoId}
                reaction={reaction}
                isCurrent={isCurrent}
                isNew={Boolean(reaction.isNew)}
              />
            </ReactionSection>
          );
        })}

      {tasks &&
        tasks.map((task: Task) => {
          const position = Math.round(getPosition(task.timestamp, duration));
          const isCurrent = task.id === isCurrentTaskOpen();

          return (
            <ReactionSection
              key={`c${task.id}`}
              style={
                {
                  '--reactionSize': commentReactionSize,
                  '--reactionOffset': `${position}%`,
                  '--taskTopOffset': taskTopOffset,
                } as React.CSSProperties
              }
            >
              <TaskBubble task={task} isCurrent={isCurrent} />
            </ReactionSection>
          );
        })}

      {commentsEnabled &&
        commentBuckets.map(bucket => {
          const position = Math.round(getPosition(bucket.time, duration));
          const isCurrent = bucket.bucketId === isCurrentBucketOpen?.bucketId;

          return (
            <ReactionSection
              key={`c${bucket.topComment.id}`}
              style={
                {
                  '--reactionSize': commentReactionSize,
                  '--reactionOffset': `${position}%`,
                } as React.CSSProperties
              }
            >
              <CommentReaction isCurrent={isCurrent} commentBucket={bucket} />
            </ReactionSection>
          );
        })}
    </ReactionsBarWrapper>
  );
};
