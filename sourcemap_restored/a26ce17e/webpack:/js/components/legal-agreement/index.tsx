import {
  SIGNUP_CLICKED_PRIVACY,
  SIGNUP_CLICKED_TERMS,
} from '@js/constants/events';
import {
  ATLASSIAN_PRIVACY_POLICY,
  ATLASSIAN_TERMS,
} from '@js/constants/routes';

import React from 'react';

import { Link, Text } from '@loomhq/lens';
import * as analytics from '@js/utilities/analytics';

type LegalAgreementProps = {
  customAction?: string | null;
  size?: string;
  dynamic?: boolean;
  signupMode?: boolean;
  color?: string;
};

// eslint-disable-next-line import/no-default-export
export default function LegalAgreement({
  customAction = null,
  size,
  dynamic = false,
  color = 'body',
  signupMode,
}: LegalAgreementProps): JSX.Element {
  /* 🚩 customAction is for EXP_ANON_SHARE_GATE_FUNCTIONALITY
   * 🚩 dynamic is for EXP_WEBAPP_SIGNUP_LEGAL_TESTIMONIAL
   * dynamic changes language based on smart-router language for text under CTA */

  const action = customAction
    ? customAction
    : signupMode && !dynamic
      ? 'signing up'
      : 'clicking “Create Free Account”';

  const companyName = 'Atlassian';
  const tosLink = ATLASSIAN_TERMS;
  const privacyPolicyLink = ATLASSIAN_PRIVACY_POLICY;

  return (
    <>
      <Text
        htmlTag="p"
        // @ts-expect-error FIXME: this isn't guaranteed to match the lens type
        size={size}
        alignment="center"
        color={color}
      >
        {customAction === 'signing up'
          ? `By ${action} I agree to ${companyName}’s `
          : `By signing up, you acknowledge that you have read and understood, and agree to ${companyName}’s `}
        <Link
          href={tosLink}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          onClick={() => {
            analytics.track(SIGNUP_CLICKED_TERMS);
          }}
        >
          Terms
        </Link>{' '}
        and{' '}
        <Link
          href={privacyPolicyLink}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          onClick={() => {
            analytics.track(SIGNUP_CLICKED_PRIVACY);
          }}
        >
          Privacy Policy
        </Link>
        .
      </Text>
    </>
  );
}
