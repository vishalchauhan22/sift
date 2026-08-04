import type { CommentFromServer } from './commentFromServer';
import type { CommentOrReply } from './commentOrReply';

export const isReply = (comment: CommentOrReply): boolean => {
  return !(comment as CommentFromServer).children_comments;
};
