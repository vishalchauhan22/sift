import compareAsc from 'date-fns/compareAsc';

import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';

const byTimeAndCreatedAt = (
  a: CommentFromServer,
  b: CommentFromServer
): number => {
  if (a.time_stamp === b.time_stamp) {
    return compareAsc(new Date(a.createdAt), new Date(b.createdAt));
  }

  return (a.time_stamp || 0) - (b.time_stamp || 0);
};

const sortCommentsOrReplies = commentsOrReplies =>
  commentsOrReplies.slice().sort(byTimeAndCreatedAt);

export const sortComments = (
  comments: CommentFromServer[]
): CommentFromServer[] => {
  let filteredComments = comments.map(comment => {
    if (!comment.children_comments) {
      return comment;
    }

    return {
      ...comment,
      children_comments: sortCommentsOrReplies([...comment.children_comments]),
    };
  });

  filteredComments = sortCommentsOrReplies(filteredComments);

  return filteredComments;
};
