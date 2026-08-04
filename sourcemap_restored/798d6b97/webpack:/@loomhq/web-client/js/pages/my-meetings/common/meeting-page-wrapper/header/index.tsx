import React from 'react';

import { Arrange, Container, Spacer, Split, Text } from '@loomhq/lens';

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
    <Arrange justifyContent="space-between" autoFlow="row">
      <Text size="body-md" fontWeight="bold" color="bodyDimmed" htmlTag="h2">
        Meetings
      </Text>
      <Spacer bottom="xsmall" />
      <Text variant="mainTitle" htmlTag="h1">
        {title}
      </Text>
    </Arrange>
  );
};
