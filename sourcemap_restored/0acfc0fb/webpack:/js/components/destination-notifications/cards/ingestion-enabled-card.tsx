import { INGESTION_ENABLED_NOTIFICATION_SYNCED_MEETINGS_CLICKED } from '@js/constants/events';

import { SYNCED_MEETINGS_LOOMS_PAGE } from '@js/constants/routes';

import React from 'react';

import { Arrange, Button, Container, Icon, Spacer, Text } from '@loomhq/lens';
import { SvgSparkle } from '@loomhq/lens/icons/sparkle';

import * as analytics from '@js/utilities/analytics';

import { IngestionEnabledCardProps } from '../types';

export const IngestionEnabledCard = ({
  notification,
}: IngestionEnabledCardProps): JSX.Element => {
  const workspaceName = notification.workspace?.name;

  return (
    <Arrange
      gap="xlarge"
      columns={{
        default: '1fr',
        small: ['minmax(0, 43.25rem)', 'minmax(250px, auto)'],
      }}
      alignItems="start"
      justifyContent="space-between"
    >
      <Container>
        <Container paddingBottom="medium">
          <Text color="bodyDimmed" isInline>
            An admin in {workspaceName} added Zoom import
          </Text>
        </Container>
        <Container
          borderSide="all"
          radius="medium"
          padding="medium"
          overflow="hidden"
          maxWidth="43.25rem"
        >
          <Arrange alignItems="start" gap="small">
            <div
              className="bgc:upgrade py:xsmall px:xsmall"
              style={{ borderRadius: '50%' }}
            >
              <Icon icon={<SvgSparkle />} size={3} />
            </div>
            <div>
              <Text color="body" fontWeight="bold">
                Zoom import has been enabled for {workspaceName}
              </Text>
              <Text color="bodyDimmed">
                You can now automatically import Zoom meeting recordings into
                your Loom library. Head to your Zoom meetings to get started.
              </Text>
            </div>
          </Arrange>
          <Spacer bottom={2} />
          <Arrange gap="small" justifyContent="end">
            <Button
              onClick={() => {
                window.open(
                  'https://support.loom.com/hc/en-us/articles/4570747675293'
                );
              }}
            >
              Learn More
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                analytics.track(
                  INGESTION_ENABLED_NOTIFICATION_SYNCED_MEETINGS_CLICKED
                );
                window.location.href = SYNCED_MEETINGS_LOOMS_PAGE;
              }}
            >
              Go to my Zoom meetings
            </Button>
          </Arrange>
        </Container>
      </Container>
    </Arrange>
  );
};
