import { CommentPostFragmentFragment } from './CommentPostFragment.generated';
import { CommentReplyFragmentFragment } from './CommentReplyFragment.generated';

export const mergeNewComment = ({
  existingComments,
  newComment,
}: {
  existingComments: CommentPostFragmentFragment[];
  newComment: CommentPostFragmentFragment | CommentReplyFragmentFragment;
}): CommentPostFragmentFragment[] => {
  // New reply
  if ('comment_post_idv2' in newComment && newComment.comment_post_idv2) {
    const parentComment = existingComments.find(
      comment => comment.id === newComment.comment_post_idv2
    );
    if (!parentComment) {
      return existingComments;
    }

    // Check whether the reply already exists
    const existingReply = parentComment.children_comments?.find(
      reply => reply?.id === newComment.id
    );
    if (existingReply) {
      return existingComments;
    }

    // Create the new replies array
    const newReplies = [...(parentComment.children_comments ?? []), newComment];
    const newComments = existingComments.map(comment =>
      comment.id === parentComment.id
        ? { ...comment, children_comments: newReplies }
        : comment
    );

    return newComments;
  }

  // New top level comment
  // check whether the comment already exists
  const existingComment = existingComments.find(
    comment => comment.id === newComment.id
  );
  if (existingComment) {
    return existingComments;
  }

  const newComments = [
    ...existingComments,
    newComment,
  ] as CommentPostFragmentFragment[];
  return newComments;
};
