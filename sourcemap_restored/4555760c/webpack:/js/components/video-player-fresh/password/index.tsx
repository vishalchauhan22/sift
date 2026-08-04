import { useVideoPasswordContext } from '@js/common/video-password';

import { VideoGlobalContainer } from '@js/common/video-player';
import React from 'react';

import { PasswordLayer as PasswordScreen } from './modal';

export const WithPassword: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}): React.ReactElement => {
  const { needsPassword, password } = useVideoPasswordContext();

  if (needsPassword && !password) {
    return (
      // VideoGlobalContainer sets Lens unit size for scaling
      <VideoGlobalContainer>
        <PasswordScreen />
      </VideoGlobalContainer>
    );
  }

  return children as React.ReactElement;
};
