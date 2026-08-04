import React, { FC, ReactNode, useCallback } from 'react';

import { useCurrentUserCallback } from '../hooks/useCurrentUserCallback';
import { LoggedInUser } from '../schema/types';

/**
 * Renders children only if the user is logged in.
 */
type LoggedInOnlyProps = {
  children: ReactNode | ((currentUser: LoggedInUser) => ReactNode);
  orElse?: ReactNode | (() => ReactNode);
};

export const LoggedInOnly: FC<LoggedInOnlyProps> = ({
  children,
  orElse = () => null,
}) => {
  const whenLoggedIn = useCallback(
    (user: LoggedInUser) => {
      return <>{typeof children === 'function' ? children(user) : children}</>;
    },
    [children]
  );

  const whenLoggedOut = useCallback(() => {
    return <>{typeof orElse === 'function' ? orElse() : orElse}</>;
  }, [orElse]);

  return useCurrentUserCallback(whenLoggedIn, whenLoggedOut)();
};
