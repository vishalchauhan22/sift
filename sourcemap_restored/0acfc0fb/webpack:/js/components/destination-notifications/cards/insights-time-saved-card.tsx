import React from 'react';

import { Arrange, Container, Text, Spacer } from '@loomhq/lens';

import InsightsHubButton from '../../insights-hub/insightsHubButton';
import InsightsHubIcon from '../../insights-hub/insightsHubIcon';

import { InsightsTimeSavedCardProps } from '../types';

export const InsightsTimeSavedCard = ({
  notification,
}: InsightsTimeSavedCardProps): JSX.Element | null => {
  const notificationData = notification?.data;

  if (
    !notificationData ||
    !notificationData.recordedDurationText ||
    !notificationData.typingDurationText
  ) {
    return null;
  }

  return (
    <Arrange
      gap="xlarge"
      columns={{
        default: '1fr',
        small: ['minmax(0, 43.25rem)', 'auto'],
      }}
      alignItems="start"
      justifyContent="space-between"
    >
      <Container>
        <Container paddingBottom="medium">
          <Arrange gap="small">
            <InsightsHubIcon />

            <Text color="bodyDimmed" isInline>
              New insight
            </Text>
          </Arrange>
        </Container>
        <Text>
          In the last month you recorded {notificationData.recordedDurationText}{' '}
          of Loom videos, which would have taken you{' '}
          {notificationData.typingDurationText} to type an email.
        </Text>
        <Spacer top="small" />
        <InsightsHubButton useLinkStyle={true} />
      </Container>
    </Arrange>
  );
};
