import { ErrorSeverities } from '@js/constants/error-severities';
import { EMAIL_LOGIN_BUTTON_CLICKED } from '@js/constants/events';

import { LOGIN_HANDLER } from '@js/constants/metrics';
import {
  getBase64EncodedAnonActivityData,
  MAP_ANON_FIELD_TO_COOKIE_KEY,
} from '@loomhq/shared-utilities/utilities/anonymousActivity';
import { AnonActivityParams } from '@loomhq/shared-utilities/types/anonymousActivity';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { ANON_RECORD_A_REPLY, LOGIN_PAGE } from '@js/common/onboarding';

import * as analytics from '@js/utilities/analytics';
import { openOAuthInMainWindow, openOAuthPopup } from '@js/utilities/auth';
import { isMobile, isIOS, isAndroid } from '@js/utilities/device';
import * as logger from '@js/utilities/loggerx';
import { incrementMetric } from '@js/utilities/metrics';
import { getParam } from '@js/utilities/url';

import { APP_SOURCES } from '@loomhq/shared-utilities/constants/analytics';
import {
  APPLE as APPLE_AUTH_TYPE,
  GOOGLE as GOOGLE_AUTH_TYPE,
  NONE as NONE_AUTH_TYPE,
  SLACK as SLACK_AUTH_TYPE,
  USERNAME as USERNAME_AUTH_TYPE,
  WINDOWS as WINDOWS_AUTH_TYPE,
  WORKOS as WORKOS_AUTH_TYPE,
} from '@loomhq/shared-utilities/constants/authTypes';
import {
  ATLASSIAN,
  WORKOS,
} from '@loomhq/shared-utilities/constants/oAuthKeys';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { AppSource } from '@loomhq/shared-utilities/types/analytics';
import {
  OAuthData,
  OAuthExtraParams,
} from '@loomhq/shared-utilities/types/auth';

import { useAfterOauthLogin } from './useAfterOauthLogin';
import { useLogInUser } from './useLogInUser';
import { LOOM_URI } from '../../../constants/routes';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';
import { AuthenticationProviders } from '@loomhq/shared-utilities/constants/authentication';
import { ASG_SOURCES } from '@loomhq/shared-utilities/constants/anonActivity';

const {
  SignedOutEndOfVideoNudges,
  SignedOutAiEndOfVideoNudges,
  SignedOutEndOfVideoNudgesEmojiReactions,
  AnonDownloadVideoOnSharePage,
} = ASG_SOURCES;

const specialOauthFlowSources = [
  SignedOutEndOfVideoNudges,
  SignedOutAiEndOfVideoNudges,
  SignedOutEndOfVideoNudgesEmojiReactions,
  ANON_RECORD_A_REPLY,
  AnonDownloadVideoOnSharePage,
];

export const persistAnonActivityDataPreAuth = (
  anonActivityData: AnonActivityParams
): void => {
  try {
    const skipEncryption = true;
    const encodedData = getBase64EncodedAnonActivityData(
      anonActivityData,
      skipEncryption
    );
    Object.entries(encodedData).forEach(([key, value]) => {
      if (value) {
        const keyName = key.replace('Base64', '');
        const cookieName = MAP_ANON_FIELD_TO_COOKIE_KEY[`${keyName}`];
        document.cookie = `${cookieName}=${value}; path=/; max-age=15*60*1000`;
      }
    });
  } catch (error) {
    logger.error(
      error,
      {
        message: 'Error persisting anon activity data pre-auth',
      },
      {
        feature: Feature.Authentication,
      }
    );
  }
};

type loginHandlerParams = {
  // TODO: Next contributor, we should consider having a list of allowed
  // strings or an enum here instead of a string
  authType: string | null;
  email: string;
  password: string;
  expansionHandler?: () => void;
  source?: string;
  videoId?: string;
  redirectUri?: string;
  idacCallbackParams?: AnonActivityParams;
  asgOwnerAvatar?: string;
  asgOwnerName?: string;
  useOAuthInMainWindowFlag?: boolean;
};

export const useLoginHandler = (
  videoId?: string
): {
  loginHandler: (params: loginHandlerParams) => Promise<void>;
} => {
  const { showErrorBar } = useErrorBar();
  const { logInUser } = useLogInUser(videoId);
  const { afterOauthLogin, anonShareGateAfterOauthLogin } =
    useAfterOauthLogin(videoId);

  const loginHandler = async ({
    authType,
    email,
    password,
    expansionHandler = () => undefined,
    source = LOGIN_PAGE,
    redirectUri,
    videoId,
    idacCallbackParams = {},
    asgOwnerAvatar,
    asgOwnerName,
    useOAuthInMainWindowFlag = false,
  }: loginHandlerParams) => {
    const orgToken =
      getParam('orgToken') || getParam('orgTokenForMemberPreview');
    const ak = getParam('ak');
    const login_attempt_id = getParam('login_attempt_id');

    const app_source = getParam('app_source') as AppSource;

    // app_source is populated by the client (desktop, mobile, etc) when routing to the login page
    // if it is not populated, we assume the user is on the website and determine if they are on mobile or desktop
    let metricsAppSource: AppSource = app_source;

    if (!metricsAppSource) {
      if (isMobile) {
        if (isIOS) {
          metricsAppSource = APP_SOURCES.MOBILE_WEB_IOS;
        } else if (isAndroid) {
          metricsAppSource = APP_SOURCES.MOBILE_WEB_ANDROID;
        } else {
          metricsAppSource = APP_SOURCES.MOBILE_WEB_UNKNOWN;
        }
      } else {
        metricsAppSource = APP_SOURCES.WEBSITE;
      }
    }

    incrementMetric(LOGIN_HANDLER, {
      authType,
      action: 'invoked',
      appSource: metricsAppSource,
    });

    const openOauth = (
      oAuthType: AuthenticationProviders,
      extraParams: OAuthExtraParams,
      errorMessage: string
    ) => {
      if (specialOauthFlowSources.includes(source)) {
        openOAuthPopup(oAuthType, extraParams, (data: OAuthData) => {
          if (data.loginSuccess) {
            if (
              source === SignedOutEndOfVideoNudges ||
              source === SignedOutEndOfVideoNudgesEmojiReactions ||
              source === AnonDownloadVideoOnSharePage
            ) {
              anonShareGateAfterOauthLogin({
                provider: oAuthType,
                videoId,
              });
            } else {
              afterOauthLogin({
                password,
                provider: oAuthType,
              });
            }
          } else {
            logger.error(
              new Error(errorMessage),
              {
                error: data.error,
                source,
              },
              {
                feature: Feature.Authentication,
              }
            );
            showErrorBar({
              message: data.error,
              severity: ErrorSeverities.ERROR,
            });
          }
        });
        return;
      }

      if (useOAuthInMainWindowFlag) {
        openOAuthInMainWindow(oAuthType, extraParams);
      } else {
        openOAuthPopup(oAuthType, extraParams);
      }
    };

    try {
      switch (authType) {
        case WORKOS_AUTH_TYPE:
          openOauth(
            WORKOS,
            { email, ak, app_source, login_attempt_id },
            'Failed to log in via WorkOS'
          );
          break;

        case ATLASSIAN:
        case SLACK_AUTH_TYPE:
        case WINDOWS_AUTH_TYPE:
        case APPLE_AUTH_TYPE:
        case GOOGLE_AUTH_TYPE: {
          /** For now using the encoded email only for atlassian and workos until we test out other flows too*/
          const encodedEmail =
            authType === ATLASSIAN ? encodeURIComponent(email) : email;
          openOauth(
            authType,
            { login_hint: encodedEmail, ak, app_source, login_attempt_id },
            'Failed to log in via OAuth'
          );
          break;
        }

        case USERNAME_AUTH_TYPE:
          logInUser({
            email,
            password,
            redirectURL: window.location.href,
            orgToken,
            videoId,
            appSource: metricsAppSource,
          });
          break;

        case NONE_AUTH_TYPE:
          if (redirectUri) {
            let targetUrl = new URL(redirectUri);

            if (targetUrl.hostname.endsWith('atlassian.com')) {
              const targetParams = new URLSearchParams(targetUrl.searchParams);
              const currentParams = new URLSearchParams(window.location.search);

              targetParams.append('login_hint', email);
              targetParams.append('source', source);
              targetParams.append('signup_source', source);

              if (asgOwnerAvatar) {
                targetParams.append('asg_owner_avatar', asgOwnerAvatar);
              }
              if (asgOwnerName) {
                targetParams.append('asg_owner_name', asgOwnerName);
              }

              if (currentParams.size > 0) {
                const paramsObject = Object.fromEntries(
                  currentParams.entries()
                );

                idacCallbackParams = { ...idacCallbackParams, ...paramsObject };
              }
              if (
                idacCallbackParams &&
                Object.keys(idacCallbackParams).length > 0
              ) {
                persistAnonActivityDataPreAuth(idacCallbackParams);
                Object.entries(idacCallbackParams).forEach(([key, value]) => {
                  if (value != null) {
                    targetParams.append(key, String(value));
                  }
                });
              }

              targetUrl = new URL(`${LOOM_URI}/signup`); // Go to Loom signup page to ensure middleware caches anon activity data before reaching idac
              targetUrl.search = targetParams.toString();
              window.location.href = targetUrl.toString();

              break;
            }
          }
          await expansionHandler();
          break;

        default:
          throw new Error('Invalid auth type');
      }
    } catch (err) {
      logger.error(
        err,
        {
          message: 'Unable to log this user in at this time',
          authType,
          source,
        },
        {
          feature: Feature.Authentication,
        }
      );
      showErrorBar({
        message:
          'Unable to log this user in at this time. Try refreshing your browser.',
        severity: ErrorSeverities.ERROR,
      });
    }

    // Do not emit login analytics if action is account creation
    if (authType !== NONE_AUTH_TYPE) {
      const { anonID: anonymousId } = analytics.getAnalyticsIds();
      analytics.track(EMAIL_LOGIN_BUTTON_CLICKED, {
        ...withIdentifiers(
          EMAIL_LOGIN_BUTTON_CLICKED,
          AnalyticsEntityId.anonymous(anonymousId, 'anonymousId')
        ),
        source,
        ctaVariant: authType,
      });

      incrementMetric('button.click', {
        context: EMAIL_LOGIN_BUTTON_CLICKED,
        source,
      });
    }
  };

  return {
    loginHandler,
  };
};
