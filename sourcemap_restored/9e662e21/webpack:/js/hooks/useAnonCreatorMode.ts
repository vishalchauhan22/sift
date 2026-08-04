import { isDev } from '@js/constants/environment';

import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { getParam } from '@js/utilities/url';

import {
  HasAnonymousCreatorPrivilegesQuery,
  useHasAnonymousCreatorPrivilegesQuery,
} from './HasAnonymousCreatorPrivileges.generated';

const selectAnonCreatorPrivileges = (
  data?: HasAnonymousCreatorPrivilegesQuery
): boolean => {
  return data &&
    data.result &&
    data.result.__typename !== 'UserAlreadyLoggedInError' &&
    data.result.__typename !== 'GenericError' &&
    data.result?.hasPrivileges
    ? data.result.hasPrivileges
    : false;
};

// Checks if the user is the anon creator of the video (by the Persistent Record button)
export const useAnonCreatorMode = (videoId: string | null): boolean => {
  const isCurrentUserLoggedIn = useIsCurrentUserLoggedIn();

  const localDevCreatorModeActive = Boolean(isDev && getParam('anon-creator'));

  const { data } = useHasAnonymousCreatorPrivilegesQuery({
    variables: {
      ...(videoId ? { videoId } : { videoId: '' }),
    },
    skip: !videoId || isCurrentUserLoggedIn || localDevCreatorModeActive,
  });

  const hasAnonCreatorPrivileges = selectAnonCreatorPrivileges(data);

  if (isCurrentUserLoggedIn) {
    return false;
  }

  if (localDevCreatorModeActive) {
    return true;
  }

  return hasAnonCreatorPrivileges;
};
