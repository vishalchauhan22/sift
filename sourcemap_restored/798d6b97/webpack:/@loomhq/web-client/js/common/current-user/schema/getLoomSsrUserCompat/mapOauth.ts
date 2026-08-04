import keyBy from 'lodash/keyBy';

import { LoggedInUser } from '../types';

type NonNullOauthEntry = NonNullable<
  NonNullable<LoggedInUser['oauths']>[number]
>;

export type Oauth = Record<string, NonNullOauthEntry>;

export const mapOauth = (oauths: LoggedInUser['oauths']): Oauth => {
  const nonNullOauths: Array<NonNullOauthEntry> = (oauths ?? []).filter(
    (o): o is NonNullOauthEntry => o !== null
  );

  return keyBy(nonNullOauths, o => o.medium);
};
