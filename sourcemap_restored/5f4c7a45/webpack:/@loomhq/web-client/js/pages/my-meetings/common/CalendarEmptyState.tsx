import RecordingIllustration from '@assets/img/spot_Illustration_record1.png';
import NoMeetingsIllustration from '@assets/img/spot_illustration_file_sharing_3x.png';
import React from 'react';

import { Align, Arrange, Container, Spacer, Text } from '@loomhq/lens';

interface EmptyStateProps {
  illustration: string;
  mainText: string;
  secondaryText: string;
  cta: JSX.Element;
}

const EmptyState = ({
  illustration,
  mainText,
  secondaryText,
  cta,
}: EmptyStateProps): JSX.Element => {
  return (
    <Container maxWidth="480px" marginX="auto">
      <Align alignment="center">
        <img src={illustration} width="250px" height="auto" alt="" />
      </Align>
      <Arrange alignItems="center" justifyContent="stretch" autoFlow="row">
        <Text alignment="center" size="heading-sm" fontWeight="bold">
          {mainText}
        </Text>
        <Spacer top={1} />
        <Text alignment="center" size="body-lg" color="bodyDimmed">
          {secondaryText}
        </Text>
        <Spacer top={3} />
        <Align alignment="center">{cta}</Align>
      </Arrange>
    </Container>
  );
};

type CalendarEmptyStateProps = {
  isPast?: boolean;
};

export const CalendarEmptyState = ({
  isPast = false,
}: CalendarEmptyStateProps): JSX.Element => {
  const illustration = isPast ? RecordingIllustration : NoMeetingsIllustration;
  const header = isPast ? `No past meetings` : `No upcoming meetings`;
  const subhead = isPast
    ? `Meeting recordings that have ended will appear here.`
    : 'Future meetings will appear here.';
  return (
    <EmptyState
      illustration={illustration}
      mainText={header}
      secondaryText={subhead}
      cta={<></>}
    />
  );
};
