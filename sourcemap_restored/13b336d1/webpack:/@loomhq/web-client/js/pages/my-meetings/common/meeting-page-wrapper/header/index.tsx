import React from 'react';

import { Container, Split, Text } from '@loomhq/lens';

import { RecordMeetingButton } from './RecordMeetingButton';
import { MeetingPageNavigation } from './navigation';
type MeetingPageHeaderProps = {
  title?: string;
};

export const MeetingPageHeader = ({
  title,
}: MeetingPageHeaderProps): JSX.Element => {
  return (
    <Container width="100%" marginBottom={4}>
      <Split gap="medium" justifyContent="space-between" alignItems="center">
        <MeetingPageTitle title={title} />
        <RecordMeetingButton />
      </Split>
      <MeetingPageNavigation />
    </Container>
  );
};

type MeetingPageTitleProps = {
  title?: string;
};

const MeetingPageTitle = ({ title }: MeetingPageTitleProps) => {
  return (
    <>
      <Text aria-hidden={true} variant="mainTitle" htmlTag="h1">
        Meetings
      </Text>
      {/* Ensures screenreader users get the proper page title */}
      <h2 className="srOnly">{title}</h2>
    </>
  );
};
