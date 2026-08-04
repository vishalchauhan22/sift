import React from 'react';

import { isDev } from '@js/constants/environment';
import { useSiteTitle } from '@js/hooks/useSiteTitle';

import { DebugBanner } from './DebugBanner';
import { MeetingPageHeader } from './header';

type MeetingPageWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export const MeetingPageWrapper = ({
  title,
  children,
}: MeetingPageWrapperProps): JSX.Element => {
  useSiteTitle(title);
  return (
    <>
      {isDev && <DebugBanner />}
      <MeetingPageHeader title={title} />
      {children}
    </>
  );
};
