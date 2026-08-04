import React from 'react';

import { Container, Text } from '@loomhq/lens';

import UserAvatar from '@js/components/user-avatar';
import { ProfileCard } from '@js/components/user-profile/profile-card';
import { getUserAvatarThumb } from '@js/utilities/avatar';
import { getMostCompleteNamePossible } from '@js/utilities/user';

import { useGetUserByIdWithProfileQuery } from './profile-card/GetUserByIdWithProfile.generated';
import styles from './styles.module.less';

export function UserComponentWithProfileHover({
  profileId,
  type = 'avatar',
  avatarSize,
  fontSize,
  fallbackUserName,
  fallbackUserAvatar,
}: {
  profileId: number;
  type?: string;
  avatarSize?: number;
  fontSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';
  fallbackUserName?: string;
  fallbackUserAvatar?: string;
}): JSX.Element {
  const { loading: userInfoLoading, data: userProfileData } =
    useGetUserByIdWithProfileQuery({
      variables: {
        userId: profileId,
      },
      fetchPolicy: 'no-cache',
      skip: !profileId,
    });

  if (userInfoLoading) {
    return (
      <>
        {type === 'name' ? (
          <div className={styles.rowLoading}>
            <Container
              height="small"
              width="4.5rem"
              backgroundColor="disabledBackground"
              radius="medium"
            />
          </div>
        ) : (
          <div className={styles.avatarLoading}>
            <Container
              height={avatarSize}
              width={avatarSize}
              backgroundColor="disabledBackground"
            />
          </div>
        )}
      </>
    );
  }

  const user =
    userProfileData?.user?.__typename === 'RegularUserPayload' ||
    userProfileData?.user?.__typename === 'CommunityUserPayload'
      ? userProfileData?.user?.user
      : null;

  // Use the fallback user name and avatar we can't show user
  const name =
    !user && fallbackUserName
      ? fallbackUserName
      : getMostCompleteNamePossible(user);
  const userAvatarSrc =
    !user && fallbackUserAvatar
      ? fallbackUserAvatar
      : getUserAvatarThumb(user?.avatars ?? []);

  return (
    <ProfileCard
      avatarSrc={userAvatarSrc}
      name={name}
      profileId={profileId}
      avatarMode={type === 'avatar'}
    >
      {type === 'name' ? (
        <Container height="1.125rem">
          <Text size={fontSize} fontWeight="bold" hasEllipsis>
            {name}
          </Text>
        </Container>
      ) : (
        <UserAvatar
          avatarSize={avatarSize}
          avatarSrc={userAvatarSrc}
          name={name}
        />
      )}
    </ProfileCard>
  );
}
