import UserAvatar from '@js/components/user-avatar';

import { AVATAR_SIZE } from '@js/pages/share/comments/common/constants';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import { ReplyFromServer } from '@js/pages/share/common/comments/replyFromServer';
import { LOOM_LOGO_LOCAL_URI } from '@js/pages/share/common/constants';
import React from 'react';
import { getAvatarThumbForUser } from '@js/utilities/avatar';

import { Spacer } from '@loomhq/lens';
import { ProfileCard } from '@js/components/user-profile/profile-card';

type CommentAvatarProps = {
  comment: CommentFromServer | ReplyFromServer;
  fullSize: boolean;
};

const isAutoCommentAvatar = thumb => {
  return thumb === LOOM_LOGO_LOCAL_URI;
};

export const CommentAvatar = ({
  comment,
  fullSize,
}: CommentAvatarProps): React.ReactElement => {
  let avatarSrc = getAvatarThumbForUser([comment.avatar]);

  if (comment?.avatar?.thumb && isAutoCommentAvatar(comment?.avatar?.thumb)) {
    avatarSrc = LOOM_LOGO_LOCAL_URI;
  }

  return (
    // spacer required here so that there is 8px padding above comment (for coloring comments during hovering in sidebar)
    <Spacer top={1}>
      <ProfileCard
        avatarSrc={avatarSrc}
        name={comment.user_name}
        profileId={comment.user_id}
      >
        <UserAvatar
          avatarSrc={avatarSrc}
          name={comment.user_name}
          avatarSize={fullSize ? AVATAR_SIZE.FULL : AVATAR_SIZE.SMALL}
        />
      </ProfileCard>
    </Spacer>
  );
};
