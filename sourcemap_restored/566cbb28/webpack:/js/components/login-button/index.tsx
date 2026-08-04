import { LOGIN_PAGE, LOOM_URI } from '@js/constants/routes';

import React from 'react';

import { TextButton, Button } from '@loomhq/lens';

import * as analytics from '@js/utilities/analytics';

interface TrackingOptions {
  eventName: string;
  properties: {
    from_url?: string;
    source?: string;
  };
}

const LoginButton: React.FC<
  React.PropsWithChildren<{
    tracking: TrackingOptions;
    size?: string;
    type?: string;
    redirect?: string;
    addBorder?: boolean;
    forceSignupLink?: boolean;
  }>
> = ({
  tracking,
  size,
  type,
  redirect,
  addBorder,
  forceSignupLink = false,
}) => {
  const loginOnClick = () => {
    analytics.track(tracking.eventName, tracking.properties);
    const locationUrl = new URL(LOGIN_PAGE, LOOM_URI);

    if (redirect) {
      locationUrl.searchParams.set('redirect_after', redirect);
    }

    if (forceSignupLink) {
      window.open(LOGIN_PAGE);

      return;
    }

    window.location.href = locationUrl.toString();
  };

  if (addBorder) {
    return (
      <Button variant="neutral" onClick={loginOnClick}>
        Login
      </Button>
    );
  }

  return (
    <TextButton
      onClick={loginOnClick}
      // @ts-expect-error FIXME: this doesn't match the TextButton interface
      size={size}
      // @ts-expect-error FIXME: this isn't guaranteed to match the Lens type
      type={type}
    >
      Login
    </TextButton>
  );
};

// eslint-disable-next-line import/no-default-export
export default LoginButton;
