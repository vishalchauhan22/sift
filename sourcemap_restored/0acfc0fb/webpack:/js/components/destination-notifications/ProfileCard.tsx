import { ProfileCard as UserProfileCard } from '@js/components/user-profile/profile-card';
import React, { useCallback } from 'react';

export const ProfileCard = ({
  children,
  avatarMode,
  notificationOwner,
}: {
  children: JSX.Element;
  avatarMode: boolean;
  notificationOwner: {
    avatar?: string;
    name: string;
    id?: number;
  };
}): JSX.Element => {
  const ProfileCardCallback = useCallback(
    () => (
      <UserProfileCard
        avatarSrc={notificationOwner.avatar}
        name={notificationOwner.name}
        profileId={notificationOwner.id}
        avatarMode={avatarMode}
      >
        {children}
      </UserProfileCard>
    ),
    [avatarMode, children, notificationOwner]
  );

  return <ProfileCardCallback />;
};
