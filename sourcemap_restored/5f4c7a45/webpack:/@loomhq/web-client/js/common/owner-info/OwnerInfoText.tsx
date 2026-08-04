import { ProfileCard } from '@js/components/user-profile/profile-card';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';

import { PlacementType } from 'react-laag/dist/PlacementType';

import { Arrange, Text, Tooltip } from '@loomhq/lens';
import { timeUtils } from '@loomhq/shared-utilities';
import styles from './OwnerInfoText.module.css';

const { formatDateToHumanReadableString } = timeUtils;

type OwnerInfoTextProps = {
  userAvatarSrc?: string;
  name: string;
  date?: Date | null;
  profileCardPlacement?: PlacementType;
  ownerId?: number;
};

export const OwnerInfoText = ({
  userAvatarSrc,
  name,
  date,
  profileCardPlacement,
  ownerId,
}: OwnerInfoTextProps): JSX.Element => {
  const humanReadableCreatedDate = date
    ? formatDateToHumanReadableString(date)
    : null;

  return (
    <div className={styles.ownerInfoText}>
      <Arrange>
        <ProfileCard
          avatarSrc={userAvatarSrc}
          name={name}
          avatarMode={false}
          placement={profileCardPlacement}
          profileId={ownerId}
        >
          <Text hasEllipsis>{name}</Text>
        </ProfileCard>
        <Text>{`・`}</Text>
        <Tooltip content={humanReadableCreatedDate} placement="bottomCenter">
          {date ? (
            <Text hasEllipsis>
              <time dateTime={date?.toString()}>
                {formatDistanceToNow(new Date(date), {
                  addSuffix: true,
                })}
              </time>
            </Text>
          ) : null}
        </Tooltip>
      </Arrange>
    </div>
  );
};
