import { SIGNUP_PAGE } from '@js/constants/routes';

import React from 'react';

import { isMobile } from '@js/utilities/device';

import { Button } from '@loomhq/lens';

import * as analytics from '@js/utilities/analytics';

import styles from './styles.module.less';

interface TrackingOptions {
  eventName: string;
  properties: {
    from_url?: string;
    source?: string;
  };
}

type SignupButtonProps = {
  tracking: TrackingOptions;
  forceSignupLink?: boolean;
  size: 'small' | 'medium' | 'large';
  isMainVideoOnSharePage?: boolean;
};

export const SignupButton = ({
  /**
   * @param {obj} param
   * @param {boolean} [param.forceSignupLink]
   * @param {{eventName: string, properties: Record<any, any>}} [param.tracking]
   * @param {string} [param.size]
   * @param {boolean} [param.isMainVideoOnSharePage]
   */
  forceSignupLink = false,
  tracking,
  size,
  isMainVideoOnSharePage = false,
}: SignupButtonProps): JSX.Element => {
  const signupOnClick = () => {
    analytics.track(tracking.eventName, tracking.properties);

    if (isMobile || forceSignupLink) {
      // Embededed Looms should open the Signup page in a new tab
      // Shared Looms should open the Signup page in the same tab
      if (!isMainVideoOnSharePage) {
        window.open(SIGNUP_PAGE);
      } else {
        window.location.href = SIGNUP_PAGE;
      }
    } else {
      window.location.href = SIGNUP_PAGE;
    }
  };

  return (
    <Button onClick={signupOnClick} size={size} variant="primary">
      <span className={styles.cta}>Get Loom Free</span>
    </Button>
  );
};

// eslint-disable-next-line import/no-default-export
export default SignupButton;
