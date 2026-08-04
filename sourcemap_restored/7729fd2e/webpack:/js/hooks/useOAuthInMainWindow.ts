import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';

import { useFlagIsActivated } from './featureFlag';
import { AuthenticationProviders } from '@loomhq/shared-utilities/constants/authentication';

export const OAUTH_IN_MAIN_WINDOW_SOURCES = {
  LOGIN_SOCIAL: 'login_social',
  LOGIN_EMAIL: 'login_email',
  SIGNUP_SOCIAL: 'signup_social',
  SIGNUP_EMAIL: 'signup_email',
  SSO: 'sso',
} as const;

type OAuthInMainWindowSource =
  (typeof OAUTH_IN_MAIN_WINDOW_SOURCES)[keyof typeof OAUTH_IN_MAIN_WINDOW_SOURCES];

export function useOAuthInMainWindow(
  provider: AuthenticationProviders | null,
  source: OAuthInMainWindowSource
): boolean | undefined {
  const oAuthInMainWindowFlag = useFlagIsActivated({
    flag: FEATURE_GATES.OAUTH_IN_MAIN_WINDOW,
    controlType: ControlType.STATSIG_FEATURE_GATE,
    activationValues: [true],
    eligibilityPreCheckFunction: () => {
      if (provider) {
        return {
          pass: true,
        };
      }
      return {
        pass: false,
        failReason: 'Provider is undefined',
      };
    },
    extraProperties: {
      provider,
      source,
    },
  });

  if (oAuthInMainWindowFlag == null) {
    return undefined;
  }

  return oAuthInMainWindowFlag;
}
