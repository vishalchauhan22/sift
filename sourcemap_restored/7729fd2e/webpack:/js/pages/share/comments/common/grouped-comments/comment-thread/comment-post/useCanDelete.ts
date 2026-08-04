import { useCurrentUserSelector } from '@js/common/current-user';
import { useVideoContext } from '@js/common/video-player';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import { ReplyFromServer } from '@js/pages/share/common/comments/replyFromServer';
import { isAutoComment } from '@js/pages/share/common/helpers';

import { getAnonUserId } from '@js/utilities/auth-anon';

export function useCanDelete(
  commentOrReply: CommentFromServer | ReplyFromServer
): boolean {
  const { video } = useVideoContext();
  const userId = useCurrentUserSelector(user => user.id, undefined);

  const isVideoOwner = video.isOwner;
  const isCommentAuthor = commentOrReply.user_id === userId;
  const isAnonCommentAuthor = commentOrReply?.anon_user_id === getAnonUserId();

  return (
    isVideoOwner ||
    isCommentAuthor ||
    isAnonCommentAuthor ||
    isAutoComment(commentOrReply.id)
  );
}
