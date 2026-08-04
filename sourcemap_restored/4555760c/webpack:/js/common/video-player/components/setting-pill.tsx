import React from 'react';

import { TextButton } from '@loomhq/lens';

export const SettingPill = ({
  children,
  isActive,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: React.ReactEventHandler;
}): JSX.Element => {
  return (
    <TextButton
      onClick={onClick}
      style={{
        ...(isActive && {
          backgroundColor: 'var(--lns-color-backgroundActive',
        }),
      }}
    >
      {children}
    </TextButton>
  );
};
