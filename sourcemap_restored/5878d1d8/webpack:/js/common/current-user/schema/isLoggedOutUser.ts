import { CurrentUserOrLoggedOut, LoggedOutUser } from './types';

export const isLoggedOutUser = (
  currentUser: CurrentUserOrLoggedOut
): currentUser is LoggedOutUser => {
  return currentUser.__typename === 'UserNotLoggedIn';
};
