/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { SemanticParser } from '@js/common/comments';
import React, { useEffect, useState } from 'react';

import { Avatar, Container, Text, Arrange, u, Icon } from '@loomhq/lens';

import { SvgChevronRight } from '@loomhq/lens/icons/chevron-right';

import { totalTooltipTransitionDurationAndDelay } from '../../../variables';
import { useViewportContext } from '../../../viewportContext';
import { TaskSummary } from '../task-bubble/task-summary';
import { AutoCommentReaction, isAutoComment } from './auto-comment-reaction';

import { CommentBucket, Task } from '@js/common/video-player';

export const allowedAttrsCommentBubbles = ['href', 'target'];

const CommentSummaryWrapper = styled.div<{
  commentId?: string;
}>`
  background-color: var(--lns-color-background);
  transition:
    width 100ms,
    opacity 200ms;

  border-radius: var(--lns-radius-large);
  width: ${props =>
    props.commentId != null && isAutoComment(props.commentId)
      ? '240px'
      : 'max-content'};
`;

const CommentGridWrapper = styled.div<{ isExpanded?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  border-radius: var(--lns-radius-large);

  ${props =>
    props.isExpanded
      ? `
  padding: ${u(1)} ${u(0.5)} ${u(1)} ${u(1)};
  box-shadow: var(--lns-shadow-large);
  background-color: var(--lns-color-backgroundHover);
  cursor: pointer;
  `
      : `padding: ${u(1)} ${u(1.5)} ${u(1)} ${u(1)};`}

  align-items: center;
  gap: var(--lns-space-small);
`;

const InfoSection = styled.div`
  padding-bottom: var(--lns-space-small);
`;

export const CommentContentWrapper = styled.span`
  & > a {
    color: inherit;
    text-decoration: underline;
  }
`;

const AvatarContainerComment = styled.div`
  display: grid;
  justify-items: center;
  grid-template-rows: auto 1fr;
  height: 100%;
  gap: 0;
  min-width: 4px;
`;

const ExpandedCommentSummary = ({
  commentBucket,
}: {
  commentBucket: CommentBucket;
}) => {
  const { topComment, commentCount } = commentBucket;
  const numberOfOtherCommentsAndReplies = commentCount - 1;

  return (
    <CommentGridWrapper isExpanded>
      <AvatarContainerComment>
        {topComment.avatar ? (
          <Avatar size={2.5} imageSrc={topComment.avatar} />
        ) : (
          <Avatar size={2.5} letter={topComment?.name?.charAt(0)} />
        )}
      </AvatarContainerComment>

      <Container minWidth={0} maxWidth="660px" width="100%">
        <Arrange gap="small">
          <Text fontWeight="bold" size="body-md">
            {topComment.name}
          </Text>
        </Arrange>
        <Text color="body" size="body-sm" hasEllipsis ellipsisLines={10}>
          <CommentContentWrapper>
            <SemanticParser comment={topComment} />
          </CommentContentWrapper>
        </Text>
        {numberOfOtherCommentsAndReplies > 0 ? (
          <Text color="bodyDimmed" size="body-sm">
            {`+${numberOfOtherCommentsAndReplies} other ${
              numberOfOtherCommentsAndReplies > 1 ? 'comments' : 'comment'
            }`}
          </Text>
        ) : null}
      </Container>

      <Icon icon={<SvgChevronRight />} />
    </CommentGridWrapper>
  );
};

const MinimizedCommentSummary = ({
  commentBucket,
}: {
  commentBucket: CommentBucket;
}) => {
  const { topComment, commentCount } = commentBucket;
  const numberOfOtherCommentsAndReplies = commentCount - 1;

  return (
    <>
      <AvatarContainerComment>
        {topComment.avatar ? (
          <Avatar size={2.5} imageSrc={topComment.avatar} />
        ) : (
          <Avatar size={2.5} letter={topComment?.name?.charAt(0)} />
        )}
      </AvatarContainerComment>
      <Container minWidth={0} width="100%">
        <Text color="body" size="body-sm" hasEllipsis ellipsisLines={1}>
          <CommentContentWrapper>
            <SemanticParser comment={topComment} />
          </CommentContentWrapper>
        </Text>
        {numberOfOtherCommentsAndReplies > 0 ? (
          <Text color="bodyDimmed" size="body-sm">
            {`+${numberOfOtherCommentsAndReplies} other ${
              numberOfOtherCommentsAndReplies > 1 ? 'comments' : 'comment'
            }`}
          </Text>
        ) : null}
      </Container>
    </>
  );
};

export const CommentSummary = ({
  task,
  commentBucket,
  handleCommentClick,
  isExpanded,
  isMinimized,
}: {
  task?: Task;
  commentBucket?: CommentBucket;
  handleCommentClick: () => void;
  isExpanded: boolean;
  isMinimized: boolean;
}): JSX.Element | null => {
  const { width } = useViewportContext();

  const [isExpandedSticky, setIsExpandedSticky] = useState(isExpanded);

  // PlayerPopover has a transition of totalTransitionDurationAndDelay where the popover fades out.
  // Without a sticky state, during the transition, the content of this component
  // switches from Expanded to Minimized resulting in a bad experience.
  // https://www.loom.com/share/727a7df730cb4a7c9c7c7507aa3d33c1
  useEffect(() => {
    if (isExpanded === true) {
      setIsExpandedSticky(true);
    } else if (isMinimized === true) {
      setIsExpandedSticky(false);
    } else {
      const timer = setTimeout(() => {
        setIsExpandedSticky(false);
      }, totalTooltipTransitionDurationAndDelay);

      return () => clearTimeout(timer);
    }
  }, [isExpanded, isMinimized]);

  if (commentBucket) {
    const { topComment } = commentBucket;

    return (
      // eslint-disable-next-line styled-components-a11y/click-events-have-key-events, styled-components-a11y/no-static-element-interactions
      <InfoSection onClick={handleCommentClick}>
        <CommentSummaryWrapper
          className={`comment-summary-wrapper`}
          commentId={topComment.id}
          style={{ maxWidth: `min(${u(57)}, ${width - 32}px)` }}
        >
          {isExpandedSticky ? (
            <ExpandedCommentSummary commentBucket={commentBucket} />
          ) : (
            <CommentGridWrapper>
              {isAutoComment(topComment.id) ? (
                <AutoCommentReaction topComment={topComment} />
              ) : (
                <MinimizedCommentSummary commentBucket={commentBucket} />
              )}
            </CommentGridWrapper>
          )}
        </CommentSummaryWrapper>
      </InfoSection>
    );
  }

  if (task) {
    return (
      // eslint-disable-next-line styled-components-a11y/click-events-have-key-events, styled-components-a11y/no-static-element-interactions
      <InfoSection onClick={handleCommentClick}>
        <CommentSummaryWrapper
          style={{ maxWidth: `min(${u(57)}, ${width - 32}px)` }}
        >
          <CommentGridWrapper isExpanded={isExpandedSticky}>
            <TaskSummary task={task} showExpanded={isExpandedSticky} />
          </CommentGridWrapper>
        </CommentSummaryWrapper>
      </InfoSection>
    );
  }

  return null;
};
