import { ProfileCard } from '@js/components/user-profile/profile-card';
import React from 'react';

import { getUserAvatarThumb } from '@js/utilities/avatar';

import styles from './styles.module.less';

export const MentionPill = ({
  teamMember,
  name,
  profileId,
  avatarSrc,
  highlightText = true,
}: {
  teamMember?: {
    id: number;
    avatars: unknown[];
  };
  name: string;
  profileId?: string;
  avatarSrc?: string;
  highlightText?: boolean;
}): React.JSX.Element => {
  if (!teamMember && !profileId) {
    return (
      <div
        className={highlightText ? styles.mention : styles.mention_default}
        data-testid="mention-pill"
      >
        {`@${name}`}
      </div>
    );
  }

  const avatar =
    avatarSrc || (teamMember && getUserAvatarThumb(teamMember.avatars));

  return (
    <div
      className={highlightText ? styles.mention : styles.mention_default}
      data-testid="mention-pill"
    >
      <ProfileCard
        avatarSrc={avatar}
        name={name}
        profileId={
          profileId && !isNaN(parseInt(profileId))
            ? parseInt(profileId)
            : teamMember?.id
        }
        placement="top-center"
        avatarMode={false}
      >
        <>{`@${name}`}</>
      </ProfileCard>
    </div>
  );
};
