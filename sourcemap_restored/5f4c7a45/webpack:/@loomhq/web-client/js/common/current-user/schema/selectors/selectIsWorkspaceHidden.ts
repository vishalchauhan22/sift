import { LoggedInUser } from '../types';

export const selectIsWorkspaceHidden = (user: LoggedInUser): string | null => {
  return String(user.memberships?.[0]?.organization.hidden) || null;
};
