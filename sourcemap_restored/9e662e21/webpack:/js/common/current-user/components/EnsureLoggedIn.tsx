import { LOGIN_PAGE } from '@js/constants/routes';

import React, { FC, useLayoutEffect, ReactNode } from 'react';

import { LoggedInUser } from '../schema/types';
import { LoggedInOnly } from './LoggedInOnly';

const LoginRedirectHelper: FC<React.PropsWithChildren<unknown>> = () => {
  useLayoutEffect(() => {
    window.location.href = LOGIN_PAGE;
  }, []);

  return null;
};

/**
 * Renders children only if the user is logged in. If the user is not logged in, redirects to the login page.
 *
 * Intended for use on routes where the backend is already enforcing that the user is logged in.
 */
export const EnsureLoggedIn: FC<{
  children: ReactNode | ((currentUser: LoggedInUser) => ReactNode);
}> = ({ children }) => {
  return (
    <LoggedInOnly orElse={() => <LoginRedirectHelper />}>
      {children}
    </LoggedInOnly>
  );
};
