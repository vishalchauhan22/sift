/* eslint-disable @loomhq/loom/no-js-extension */
import { ProfileCard } from '@js/components/user-profile/profile-card';
import PropTypes from 'prop-types';
import React from 'react';

import { getUserAvatarThumb } from '@js/utilities/avatar';

import styles from './styles.module.less';

const propTypes = {
  teamMember: PropTypes.object,
  name: PropTypes.string.isRequired,
  // optional props if teamMember is not provided
  profileId: PropTypes.string,
  avatarSrc: PropTypes.string,
  highlightText: PropTypes.bool,
};

export const MentionPill = ({
  teamMember,
  name,
  profileId,
  avatarSrc,
  highlightText = true,
}) => {
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
        profileId={profileId || teamMember?.id}
        placement="top-center"
        avatarMode={false}
      >
        {`@${name}`}
      </ProfileCard>
    </div>
  );
};

MentionPill.propTypes = propTypes;
