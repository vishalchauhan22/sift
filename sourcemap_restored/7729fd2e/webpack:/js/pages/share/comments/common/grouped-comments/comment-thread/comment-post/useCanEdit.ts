import { useCurrentUserSelector } from '@js/common/current-user';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import { ReplyFromServer } from '@js/pages/share/common/comments/replyFromServer';

import { getAnonUserId } from '@js/utilities/auth-anon';

export function useCanEdit(
  commentOrReply: CommentFromServer | ReplyFromServer
): boolean {
  const userId = useCurrentUserSelector(user => user.id, undefined);
  const isCommentAuthor = commentOrReply.user_id === userId;
  const isAnonCommentAuthor = commentOrReply?.anon_user_id === getAnonUserId();
  const { isChatMessage } = commentOrReply;
  const isExtendedReaction =
    typeof (commentOrReply as ReplyFromServer)?.extended_reaction === 'string';

  return (
    !isChatMessage &&
    !isExtendedReaction &&
    (isCommentAuthor || isAnonCommentAuthor)
  );
}
