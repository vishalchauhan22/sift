import React, { FC, ReactNode, useCallback } from 'react';

import { useCurrentUserCallback } from '../hooks/useCurrentUserCallback';
import { LoggedInUser } from '../schema/types';

/**
 * Renders children only if the user is logged out
 */
type LoggedOutOnlyProps = {
  children: ReactNode | (() => ReactNode);
  orElse?: ReactNode | ((currentUser: LoggedInUser) => ReactNode);
};

export const LoggedOutOnly: FC<LoggedOutOnlyProps> = ({
  children,
  orElse = () => null,
}) => {
  const whenLoggedIn = useCallback(
    (user: LoggedInUser) => {
      return <>{typeof orElse === 'function' ? orElse(user) : orElse}</>;
    },
    [orElse]
  );

  const whenLoggedOut = useCallback(() => {
    return <>{typeof children === 'function' ? children() : children}</>;
  }, [children]);

  return useCurrentUserCallback(whenLoggedIn, whenLoggedOut)();
};
