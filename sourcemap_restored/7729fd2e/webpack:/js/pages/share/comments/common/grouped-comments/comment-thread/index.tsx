import { CommentInput } from '@js/pages/share/comments/common/comment-input';
import { CommentThreadWrapper } from '@js/pages/share/comments/common/commentHoverAndHighlightStyles';
import { useCommentStore } from '@js/pages/share/comments/common/createStore';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import { ReplyFromServer } from '@js/pages/share/common/comments/replyFromServer';
import { isAutoComment } from '@js/pages/share/common/helpers';
import React, { useState } from 'react';
import { CommentTypeAndId } from '@js/utilities/types';

import { CommentReplies } from './CommentReplies';
import { CommentPost } from './comment-post';

type CommentThreadProps = {
  comment: CommentFromServer;
  videoMeetingPlatform: string | null;
  lastCommentLocallyDeleted: CommentTypeAndId;
  setLastCommentLocallyDeleted: (commentInfo: CommentTypeAndId) => void;
  recentlyDeleted: { commentIds: string[]; replyIds: string[] };
  addToRecentlyDeleted: (type: string, id: string) => void;
};

/**
  @param lastCommentLocallyDeleted helps with only showing one delete placeholder at a time
  @param recentlyDeleted helps with display issues when comments are deleted before refetch is called
*/
export const CommentThread = ({
  comment,
  videoMeetingPlatform,
  lastCommentLocallyDeleted,
  setLastCommentLocallyDeleted,
  recentlyDeleted,
  addToRecentlyDeleted,
}: CommentThreadProps): JSX.Element | null => {
  const [isEditingParentComment, setIsEditingParentComment] = useState(false);
  const { setReplyId, replyId } = useCommentStore();
  const showReplyField = replyId === comment.id;

  const addCommentDeleted = (id: string) => {
    addToRecentlyDeleted('comment', id);
  };

  const addReplyDeleted = (id: string) => {
    addToRecentlyDeleted('reply', id);
  };

  const replies = (comment as CommentFromServer).children_comments;

  const hasReplies = Boolean(replies.length);

  // want to show the placeholder for a deleted comment with replies, so pass the next if statement
  const isDeletedWithReplies = comment.deletedAt && hasReplies;

  if (
    !isDeletedWithReplies &&
    recentlyDeleted.commentIds.includes(comment.id)
  ) {
    return null;
  }

  const noRepliesToShow =
    !replies.length ||
    replies.every(reply => recentlyDeleted.replyIds.includes(reply.id)); // if all replies were just deleted

  return (
    <CommentThreadWrapper id={`sidebar-comment-thread-parent-id-${comment.id}`}>
      <CommentPost
        comment={comment}
        videoMeetingPlatform={videoMeetingPlatform}
        isLastReply={noRepliesToShow}
        isEditingParentComment={isEditingParentComment}
        setIsEditingParentComment={setIsEditingParentComment}
        recentlyDeleted={recentlyDeleted}
        addCommentOrReplyDeleted={addCommentDeleted}
        lastCommentLocallyDeleted={lastCommentLocallyDeleted}
        setLastCommentLocallyDeleted={setLastCommentLocallyDeleted}
        replyFieldShowing={showReplyField}
      />
      <CommentReplies
        commentId={comment.id}
        videoMeetingPlatform={videoMeetingPlatform}
        replies={replies as ReplyFromServer[]}
        isEditingParentComment={isEditingParentComment}
        recentlyDeleted={recentlyDeleted}
        addReplyDeleted={addReplyDeleted}
        lastCommentLocallyDeleted={lastCommentLocallyDeleted}
        setLastCommentLocallyDeleted={setLastCommentLocallyDeleted}
        replyFieldShowing={showReplyField}
      />
      {showReplyField && !isAutoComment(comment.id) && (
        <CommentInput
          replyTo={comment.id}
          isFirstReply={!hasReplies}
          closeReply={() => setReplyId(null)}
        />
      )}
    </CommentThreadWrapper>
  );
};
