import { useAnonUserName } from '@js/common/useAnonUserName';
import fetch from '@js/utilities/fetch';

import * as logger from '@js/utilities/loggerx';

import { HEADER_CONTENT_TYPE } from '@loomhq/shared-utilities/constants/http';
import { JSON as JSON_MIME } from '@loomhq/shared-utilities/constants/mimes';
const MAX_USER_NAME_LENGTH = 200;

export function useUpdateAnonUsername(): (userName: string) => Promise<void> {
  const { setAnonUserName } = useAnonUserName();

  return async userName => {
    const truncatedUsername = (userName || '').substring(
      0,
      MAX_USER_NAME_LENGTH
    );

    try {
      const resp = await fetch('/v1/auth/anon_username', {
        credentials: 'include',
        headers: { [HEADER_CONTENT_TYPE]: JSON_MIME },
        method: 'PATCH',
        body: JSON.stringify({ user_name: truncatedUsername }),
      });

      if (resp.status >= 400) {
        throw new Error(
          `Error reacting to video - HTTP response: ${resp.status}`
        );
      }

      setAnonUserName(userName);
    } catch (err) {
      logger.warning(err, { message: 'error setting username for anonymous' });
    }
  };
}
