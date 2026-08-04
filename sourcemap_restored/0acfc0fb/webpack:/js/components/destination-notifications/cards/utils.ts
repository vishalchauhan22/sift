import { NotificationTrayItemUser } from '../types';

export const getInviteeName = (inviteeNames: string[]): string => {
  if (inviteeNames.length > 1) {
    return `${inviteeNames[0]} ${inviteeNames[1][0]}`;
  }

  // in case the inviteeName is the user's email
  return inviteeNames[0];
};

export const getNotificationOwner = (
  notificationOwner: NotificationTrayItemUser
): {
  name: string;
  avatar: string | undefined;
  id: number | undefined;
} => {
  return {
    name: notificationOwner?.name ?? 'Someone',
    avatar: notificationOwner?.avatar ?? undefined,
    id: notificationOwner?.id ? Number(notificationOwner?.id) : undefined,
  };
};
