import { LoggedInUser } from '../types';

export const selectDisplayName = (user: LoggedInUser): string => {
  return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() ?? 'Anonymous';
};
