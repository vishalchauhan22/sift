import { createMarketingConsentOptions } from '@js/common/marketing-consent-options';
import { usePromotionalCheckboxStore } from '@js/common/signup/promotional-email-gdpr/promotional-checkbox-store/usePromotionalCheckboxStore';
import { useSearchParams } from '@js/hooks/useSearchParams';
import React, { useEffect, useState } from 'react';

import * as auth from '@js/utilities/auth';

import { getParam } from '@js/utilities/url';
import { v4 as uuidv4 } from 'uuid';

import { Arrange, Button } from '@loomhq/lens';
import { SvgAccount } from '@loomhq/lens/icons/account';
import { SvgApple } from '@loomhq/lens/icons/apple';
import { SvgGoogle } from '@loomhq/lens/icons/google';
import { SvgOutlook } from '@loomhq/lens/icons/outlook';
import { SvgSlack } from '@loomhq/lens/icons/slack';
import { APP_SOURCE_WEBSITE } from '@loomhq/shared-utilities/constants/analytics';
import {
  GOOGLE,
  SLACK,
  APPLE,
  WINDOWS,
} from '@loomhq/shared-utilities/constants/oAuthKeys';
import {
  OAuthData,
  OAuthExtraParams,
} from '@loomhq/shared-utilities/types/auth';

import * as analytics from '@js/utilities/analytics';

import { OAUTH_BUTTON_CLICKED } from '../../../constants/events';
import { SSO_LOGIN } from '../../../constants/routes';
import {
  OAUTH_IN_MAIN_WINDOW_SOURCES,
  useOAuthInMainWindow,
} from '@js/hooks/useOAuthInMainWindow';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';
import { AuthenticationProviders } from '@loomhq/shared-utilities/constants/authentication';

type ConnectButtonProps = {
  isSignUp: boolean;
  isSingleAuthPage: boolean;
  source?: string;
  afterAuthCallback?: (data: OAuthData) => void;
};

function ConnectButtons({
  isSignUp,
  isSingleAuthPage,
  source,
}: ConnectButtonProps): JSX.Element | null {
  const searchParams = useSearchParams();
  const isFromIos = searchParams.get('app_source') === 'mobile_ios';

  const [provider, setProvider] = useState<AuthenticationProviders | null>(
    null
  );
  const [extraParams, setExtraParams] = useState<OAuthExtraParams>({});
  const oAuthInMainWindowFlag = useOAuthInMainWindow(
    provider,
    isSignUp
      ? OAUTH_IN_MAIN_WINDOW_SOURCES.SIGNUP_SOCIAL
      : OAUTH_IN_MAIN_WINDOW_SOURCES.LOGIN_SOCIAL
  );

  const { locale, localeRequiresMarketingOptIn, isConsentGranted } =
    usePromotionalCheckboxStore(state => ({
      locale: state.locale,
      localeRequiresMarketingOptIn: state.localeRequiresMarketingOptIn,
      isConsentGranted: state.isPromotionalEmailBoxChecked,
    }));

  const ak = searchParams.get('ak');
  const app_source = getParam('app_source') || APP_SOURCE_WEBSITE;
  const login_attempt_id = searchParams.get('login_attempt_id');

  // Handle OAuth call once feature flag is available
  useEffect(() => {
    if (provider && oAuthInMainWindowFlag != null) {
      if (oAuthInMainWindowFlag) {
        auth.openOAuthInMainWindow(provider, extraParams);
      } else {
        auth.openOAuthPopup(provider, extraParams);
      }
    }
  }, [provider, oAuthInMainWindowFlag, extraParams]);

  const connect = (oAuthProvider: AuthenticationProviders) => {
    const marketingConsentOptions = createMarketingConsentOptions(
      isConsentGranted,
      locale,
      localeRequiresMarketingOptIn
    );
    const hasPromotionalCheckboxLoaded = marketingConsentOptions !== null;

    const params = {
      ...(ak && { ak }), // add ak to extraParams if it exists (for desktop web login rollout
      fromWebSignup: true,
      hasPromotionalCheckboxLoaded,
      authURL: window.location.href,
      redirect_after: window.location.href,
    };

    if (marketingConsentOptions) {
      Object.assign(params, marketingConsentOptions);
    }

    const { anonID: anonymousId } = analytics.getAnalyticsIds();

    analytics.track(OAUTH_BUTTON_CLICKED, {
      ...withIdentifiers(
        OAUTH_BUTTON_CLICKED,
        AnalyticsEntityId.anonymous(anonymousId, 'anonymousId')
      ),
      oAuthProvider,
      isSignUp,
      ...(source && { source }),
    });

    setExtraParams(params);
    setProvider(oAuthProvider);
  };

  let buttonPrefix = 'Sign up with';

  if (isSingleAuthPage) {
    buttonPrefix = 'Continue with';
  } else if (!isSignUp) {
    buttonPrefix = 'Sign in with';
  }

  return (
    <Arrange columns="1fr" gap="small" justifyContent="stretch" width="100%">
      <Button
        aria-label={`${buttonPrefix} Google`}
        icon={<SvgGoogle />}
        hasFullWidth={true}
        size="large"
        data-testid={`googleOAuthButton_${uuidv4()}`}
        onClick={() => connect(GOOGLE)}
      >
        {buttonPrefix} Google
      </Button>

      {/** Adding a duplicate block for apple as during signup from ios we need to show apple along with google.
       * Did not want to disturb the order of other social logins buttons below in case of !isSignUp == true
       */}

      {isSignUp && isFromIos ? (
        <Button
          icon={<SvgApple />}
          aria-label={`${buttonPrefix} Apple`}
          hasFullWidth={true}
          size="large"
          data-testid={`appleOAuthButton_${uuidv4()}`}
          onClick={() => connect(APPLE)}
        >
          {buttonPrefix} Apple
        </Button>
      ) : null}

      {!isSignUp ? (
        <>
          <Button
            aria-label={`${buttonPrefix} Slack`}
            icon={<SvgSlack />}
            hasFullWidth={true}
            size="large"
            data-testid={`slackOAuthButton_${uuidv4()}`}
            onClick={() => connect(SLACK)}
          >
            {buttonPrefix} Slack
          </Button>

          <Button
            icon={<SvgApple />}
            aria-label={`${buttonPrefix} Apple`}
            hasFullWidth={true}
            size="large"
            data-testid={`appleOAuthButton_${uuidv4()}`}
            onClick={() => connect(APPLE)}
          >
            {buttonPrefix} Apple
          </Button>

          <Button
            aria-label={`${buttonPrefix} Outlook`}
            icon={<SvgOutlook />}
            hasFullWidth={true}
            size="large"
            data-testid={`windowsOAuthButton_${uuidv4()}`}
            onClick={() => connect(WINDOWS)}
          >
            {buttonPrefix} Outlook
          </Button>

          <Button
            aria-label={`${buttonPrefix} Single Sign-on`}
            hasFullWidth={true}
            size="large"
            data-testid={`ssoSignInButton_${uuidv4()}`}
            href={SSO_LOGIN}
            onClick={() => {
              // the params support authenticating with Google Smart Chips and Chat
              const gi = getParam('gi');
              const gid = getParam('gid');
              const redirect_url = getParam('redirect_url');

              // redirect_after contains the url we should redirect user to after login
              const redirect_after = getParam('redirect_after');

              const params = {
                ...(gi && { gi }),
                ...(gid && { gid }),
                ...(redirect_url && { redirect_url }),
                ...(redirect_after && { redirect_after }),
                ...(ak && { ak }),
                ...(login_attempt_id && { login_attempt_id }),
                app_source,
              };

              window.location.href = `${SSO_LOGIN}?${new URLSearchParams(
                params
              ).toString()}`;
            }}
            icon={<SvgAccount />}
          >
            {buttonPrefix} SSO
          </Button>
        </>
      ) : null}
    </Arrange>
  );
}

// eslint-disable-next-line import/no-default-export
export default ConnectButtons;
