import {
  CANNY_IO_REDIRECT,
  LOOM_URI,
  SLACK_INTEGRATION_URI,
} from '@js/constants/routes';

import { LOOM_DESKTOP_PROTOCOL } from '@js/constants/runtimeConfig';

// From https://docs.microsoft.com/en-us/aspnet/mvc/overview/security/preventing-open-redirection-attacks
function isURLLocalToHost(str: string): boolean {
  return (
    // "/" or "/foo" but not "//" or "/\"
    str[0] == '/' && (str.length == 1 || (str[1] != '/' && str[1] != '\\'))
  );
}

// eslint-disable-next-line import/no-default-export
export default (str: string | null): boolean =>
  Boolean(
    str &&
      !str.startsWith(LOOM_URI) &&
      str !== SLACK_INTEGRATION_URI &&
      !isURLLocalToHost(str) &&
      !str.startsWith(LOOM_DESKTOP_PROTOCOL) &&
      !str.startsWith(CANNY_IO_REDIRECT)
  );
