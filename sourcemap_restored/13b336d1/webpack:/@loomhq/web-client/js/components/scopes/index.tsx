import { LoggedInUser, useCurrentUserSelector } from '@js/common/current-user';
import React, { FC, ReactNode, useCallback } from 'react';

const Scopes: FC<
  React.PropsWithChildren<{
    alternate?: () => ReactNode | ReactNode | null;
    children?: ReactNode | null;
    names?: string[];
    name?: string;
    some?: boolean;
  }>
> = ({ alternate = null, children = null, names = [], name, some = false }) => {
  if (!Array.isArray(names)) {
    names = [names];
  }

  if (name) {
    names.push(name);
  }

  if (names.length === 0) {
    throw new Error(
      'Invalid usage of the Scopes component, missing both name and names props'
    );
  }

  const scopeCheckFn = useCallback(
    ({ scopes: userScopes }: LoggedInUser) => {
      return some
        ? names.some(scope => userScopes.includes(scope))
        : names.every(scope => userScopes.includes(scope));
    },
    [names, some]
  );

  const hasScopes = useCurrentUserSelector(scopeCheckFn, false);

  const alternative =
    Boolean(alternate) && typeof alternate === 'function'
      ? alternate()
      : alternate;

  // @ts-expect-error TS error from TS 5.8 upgrade
  return hasScopes ? <>{children}</> : <>{alternative}</>;
};

// eslint-disable-next-line import/no-default-export
export default Scopes;
