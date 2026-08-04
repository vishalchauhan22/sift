import { LoggedInUser } from '../types';

export const selectWorkspaceId = (user: LoggedInUser): string | null => {
  return user.memberships?.[0]?.organization.id || null;
};
