import { CurrentUserOrLoggedOut, LoggedInUser } from './types';

export const isLoggedInUser = (
  currentUser: CurrentUserOrLoggedOut
): currentUser is LoggedInUser => {
  return currentUser.__typename === 'CurrentUser';
};
