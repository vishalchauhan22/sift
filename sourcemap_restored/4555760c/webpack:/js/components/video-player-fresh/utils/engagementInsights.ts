import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import { ReplyFromServer } from '@js/pages/share/common/comments/replyFromServer';

import { GraphQlReactionFromServer } from './model';

type User = {
  id: string | number | undefined;
};

export const hasUsers = (users: User[]): boolean =>
  users != null ? users.length !== 0 : false;

export const commentCreatedByOneOf =
  (users: User[]) =>
  (comment: CommentFromServer): boolean => {
    if (!hasUsers(users)) {
      return true;
    }

    const userIds = users.map(u => u.id);

    return (
      userIds.includes(String(comment.user_id)) ||
      userIds.includes(comment.anon_user_id) ||
      comment.children_comments.filter(replyCreatedByOneOf(users)).length > 0
    );
  };

const replyCreatedByOneOf =
  (users: User[]) =>
  (reply: ReplyFromServer): boolean => {
    if (!hasUsers(users)) {
      return true;
    }

    const userIds = users.map(u => u.id);

    return (
      userIds.includes(String(reply.user_id)) ||
      userIds.includes(reply.anon_user_id)
    );
  };

export const reactionCreatedByOneOf =
  (users: User[]) =>
  (reaction: GraphQlReactionFromServer): boolean => {
    if (!hasUsers(users)) {
      return true;
    }

    const userIds = users.map(u => u.id);

    return (
      userIds.includes(String(reaction.user?.id)) ||
      userIds.includes(reaction.anon_user_id)
    );
  };

type View = {
  user: User;
};

export const getEngagementInsightUsersFromView = (
  selectedView: View
): User[] => (!selectedView ? [] : [selectedView.user]);
