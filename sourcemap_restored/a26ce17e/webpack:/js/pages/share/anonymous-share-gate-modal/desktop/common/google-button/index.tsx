import { ErrorSeverities } from '@js/constants/error-severities';

import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { createMarketingConsentOptions } from '@js/common/marketing-consent-options';
import { usePromotionalCheckboxStore } from '@js/common/signup/promotional-email-gdpr/promotional-checkbox-store/usePromotionalCheckboxStore';
import React from 'react';
import { openOAuthPopup } from '@js/utilities/auth';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@loomhq/lens';
import { SvgGoogle } from '@loomhq/lens/icons/google';

import { GOOGLE } from '@loomhq/shared-utilities/constants/oAuthKeys';
import { trackSignupMethodButtonClick } from '@js/pages/share/anonymous-share-gate-modal/common/helpers';
import { AuthenticationProviders } from '@loomhq/shared-utilities/constants/authentication';

type GoogleButtonProps = {
  afterOauthHandler: (string) => Promise<void>;
  videoId?: string;
  source: string;
};

export const GoogleButton = ({
  afterOauthHandler,
  videoId,
  source,
}: GoogleButtonProps): JSX.Element => {
  const { showErrorBar } = useErrorBar();

  const { locale, localeRequiresMarketingOptIn, isConsentGranted } =
    usePromotionalCheckboxStore(state => ({
      locale: state.locale,
      localeRequiresMarketingOptIn: state.localeRequiresMarketingOptIn,
      isConsentGranted: state.isPromotionalEmailBoxChecked,
    }));

  const connect = provider => {
    let extraParams = {};
    const marketingConsentOptions = createMarketingConsentOptions(
      isConsentGranted,
      locale,
      localeRequiresMarketingOptIn
    );
    const hasPromotionalCheckboxLoaded = marketingConsentOptions !== null;

    extraParams = {
      ...extraParams,
      fromWebSignup: true,
      hasPromotionalCheckboxLoaded,
      authURL: window.location.href,
      signup_source: source,
    };

    if (marketingConsentOptions) {
      extraParams = {
        ...extraParams,
        ...marketingConsentOptions,
      };
    }

    openOAuthPopup(provider, extraParams, data => {
      if (data.loginSuccess) {
        afterOauthHandler({ provider, videoId });
      } else {
        showErrorBar({
          message:
            'There was a problem logging you in. Please try again later.',
          severity: ErrorSeverities.ERROR,
        });
      }
    });
  };

  const onSignupButtonClick = (provider: AuthenticationProviders) => {
    trackSignupMethodButtonClick(source, provider);
    connect(provider);
  };

  return (
    <Button
      icon={<SvgGoogle />}
      hasFullWidth={true}
      size="large"
      data-testid={`googleOAuthButton_${uuidv4()}`}
      onClick={() => onSignupButtonClick(GOOGLE)}
    >
      Sign up with Google
    </Button>
  );
};
