import {
  HIGHLIGHT_LOOM_EMAIL_SIGNUP_BTN_CLICKED,
  HIGHLIGHT_LOOM_GOOGLE_SIGNUP_BTN_CLICKED,
} from '@js/constants/events';
import { SIGNUP_PAGE } from '@js/constants/routes';

import cx from 'classnames';
import { useAfterOauthLogin } from '@js/common/auth/login/useAfterOauthLogin';
import { useVideoContext } from '@js/common/video-player';
import LegalAgreement from '@js/components/legal-agreement';
import { GoogleButton } from '@js/pages/share/anonymous-share-gate-modal/desktop/common/google-button';
import React from 'react';

import { Align, Arrange, Button, Container, Text, Spacer } from '@loomhq/lens';

import { SvgMail } from '@loomhq/lens/icons/mail';

import * as analytics from '@js/utilities/analytics';

import styles from './styles.module.css';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../utilities/analytics/attribute-transformer';

export const SignupCta = (): JSX.Element => {
  const { highlightValueOfLoomAfterOauthLogin } = useAfterOauthLogin();
  const {
    video: { id: videoId },
  } = useVideoContext();

  const handleEmailSignupBtnClicked = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    analytics.track(
      HIGHLIGHT_LOOM_EMAIL_SIGNUP_BTN_CLICKED,
      withIdentifiers(
        HIGHLIGHT_LOOM_EMAIL_SIGNUP_BTN_CLICKED,
        AnalyticsEntityId.video(videoId, 'videoId')
      )
    );
    window.open(SIGNUP_PAGE, '_blank', 'noopener,noreferrer');
  };

  const handleGoogleSignupBtnClicked = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    analytics.track(
      HIGHLIGHT_LOOM_GOOGLE_SIGNUP_BTN_CLICKED,
      withIdentifiers(
        HIGHLIGHT_LOOM_GOOGLE_SIGNUP_BTN_CLICKED,
        AnalyticsEntityId.video(videoId, 'videoId')
      )
    );
  };

  return (
    <Align>
      <Container marginTop="xlarge" width="100%">
        <Arrange autoFlow="row" gap="medium">
          <Arrange autoFlow="row" gap="medium" justifyItems="center">
            <Text size="heading-sm" fontWeight="bold">
              Sign up to record for free
            </Text>
            <LegalAgreement color="bodyDimmed" />
          </Arrange>
          <Container marginTop="small">
            <button
              onClick={handleGoogleSignupBtnClicked}
              className={cx(styles.buttonInvisible, 'p:0 m:0 width:full')}
            >
              <GoogleButton
                afterOauthHandler={highlightValueOfLoomAfterOauthLogin}
                source="marketing-loom"
              />
            </button>
            <Spacer top="small">
              <Button
                icon={<SvgMail />}
                htmlTag="a"
                hasFullWidth={true}
                size="large"
                onClick={handleEmailSignupBtnClicked}
                role="button"
              >
                Sign up with email
              </Button>
            </Spacer>
          </Container>
        </Arrange>
      </Container>
    </Align>
  );
};
