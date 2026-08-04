// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import { useHasAiWorkflowsForViewersModalAccess } from '@js/hooks/experiments/useExpIsEligibleForViewerWorkflows';
import { HighlightElementAndConditionallyScroll } from '@js/pages/share/comments/common/HighlightElementAndConditionallyScroll';
import { AVATAR_SIZE } from '@js/pages/share/comments/common/constants';
import { NoCommentsPlaceholder } from '@js/pages/share/comments/common/grouped-comments/NoCommentsPlaceholder';
import { CommentThread } from '@js/pages/share/comments/common/grouped-comments/comment-thread';
import { NoCommentsPlaceholderWithAiWorkflow } from '@js/pages/share/comments/common/grouped-comments/no-comment-logged-in-placeholder-with-ai-workflow';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import React, { useState } from 'react';

import { CommentTypeAndId } from '@js/utilities/types';

const isDeletedCommentWithReplies = (
  comment: CommentFromServer,
  recentlyDeletedReplyIds: string[]
): boolean => {
  const replies = comment.children_comments;
  const isCommentDeletedWithChildren = Boolean(
    comment.deletedAt && replies?.length > 0
  );
  const areAllRepliesRecentlyDeleted = replies?.every(reply =>
    recentlyDeletedReplyIds.includes(reply.id)
  );

  return isCommentDeletedWithChildren && !areAllRepliesRecentlyDeleted;
};

// TODO(next author): Please update to remove !important or leave notes that it's intended
// eslint-disable-next-line @loomhq/loom/no-important
const CommentsSection = styled.section<{ inActivitySidebar?: boolean }>`
  & > * {
    padding-bottom: ${props =>
      props.inActivitySidebar ? `0` : `var(--lns-space-large) !important`};
    &:last-child {
      padding: 0;
    }
  }
  --avatarSize: ${AVATAR_SIZE.SIZE};
  --avatarSizeSmall: var(--lns-space-large);
  --elementsSpacing: var(--lns-space-xsmall);

  padding-top: 1px;

  .comment-container {
    padding-top: var(--lns-space-small);
    padding-bottom: var(--lns-space-small);
    padding-right: var(--lns-space-small);

    .hover-btn {
      visibility: hidden;
    }
  }

  .comment-container:hover {
    .hover-btn {
      visibility: visible;
    }
  }
`;

export const GroupedComments = ({
  comments,
  videoMeetingPlatform,
  highlightGroup,
  showPlaceholderWhenNoComments,
  inActivitySidebar,
}: {
  comments: CommentFromServer[];
  videoMeetingPlatform: string | null;
  highlightGroup: string[];
  showPlaceholderWhenNoComments?: boolean;
  inActivitySidebar?: boolean;
}): React.ReactElement => {
  // show only one delete placeholder at a time
  const [lastCommentLocallyDeleted, setLastCommentLocallyDeleted] =
    useState<CommentTypeAndId>({
      type: '', // 'comment' or 'reply'
      id: '', // comment.id
    });

  // comments and replies that were deleted before refetching
  const [commentsRecentlyDeleted, setCommentsRecentlyDeleted] = useState({
    commentIds: [] as string[],
    replyIds: [] as string[],
  });

  const hasAiWorkflowsForViewersModalAccess =
    useHasAiWorkflowsForViewersModalAccess();

  const addToCommentsRecentlyDeleted = (type: string, id: string) => {
    const commentIsNotRecentlyDeleted =
      type === 'comment' && !commentsRecentlyDeleted.commentIds.includes(id);
    const replyIsNotRecentlyDeleted =
      type === 'reply' && !commentsRecentlyDeleted.replyIds.includes(id);

    if (commentIsNotRecentlyDeleted) {
      setCommentsRecentlyDeleted(old => ({
        commentIds: [...old.commentIds, id],
        replyIds: old.replyIds,
      }));
    } else if (replyIsNotRecentlyDeleted) {
      setCommentsRecentlyDeleted(old => ({
        commentIds: old.commentIds,
        replyIds: [...old.replyIds, id],
      }));
    }
  };

  const noCommentsToShow =
    !comments?.length ||
    comments?.every(
      comment =>
        commentsRecentlyDeleted.commentIds.includes(comment.id) &&
        !isDeletedCommentWithReplies(comment, commentsRecentlyDeleted.replyIds) // still want to show these comments because there are replies to display
    );

  // Whether a no-comments placeholder will be shown.
  const showNoCommentsPlaceholder =
    showPlaceholderWhenNoComments && noCommentsToShow;

  if (showNoCommentsPlaceholder) {
    if (hasAiWorkflowsForViewersModalAccess) {
      return <NoCommentsPlaceholderWithAiWorkflow />;
    }

    return <NoCommentsPlaceholder inActivitySidebar={inActivitySidebar} />;
  }

  let firstCommentAlreadyHighlighted = false;

  return (
    <CommentsSection inActivitySidebar={inActivitySidebar}>
      {comments.map(comment => {
        const id = comment.id;
        const shouldHighlight = highlightGroup.includes(id);
        const shouldScroll = shouldHighlight && !firstCommentAlreadyHighlighted;

        if (shouldScroll) {
          firstCommentAlreadyHighlighted = true;
        }

        if (shouldHighlight) {
          return (
            <HighlightElementAndConditionallyScroll
              shouldScroll={shouldScroll}
              inActivitySidebar={inActivitySidebar}
              key={id}
            >
              <CommentThread
                videoMeetingPlatform={videoMeetingPlatform}
                comment={comment}
                lastCommentLocallyDeleted={lastCommentLocallyDeleted}
                setLastCommentLocallyDeleted={setLastCommentLocallyDeleted}
                recentlyDeleted={commentsRecentlyDeleted}
                addToRecentlyDeleted={addToCommentsRecentlyDeleted}
              />
            </HighlightElementAndConditionallyScroll>
          );
        }

        return (
          <CommentThread
            videoMeetingPlatform={videoMeetingPlatform}
            key={id}
            comment={comment}
            lastCommentLocallyDeleted={lastCommentLocallyDeleted}
            setLastCommentLocallyDeleted={setLastCommentLocallyDeleted}
            recentlyDeleted={commentsRecentlyDeleted}
            addToRecentlyDeleted={addToCommentsRecentlyDeleted}
          />
        );
      })}
    </CommentsSection>
  );
};
