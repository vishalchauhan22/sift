import React, { useEffect } from 'react';

import { Align, Arrange, Button, Container, Text } from '@loomhq/lens';

import InternetDisconnect from '@assets/img/internet-disconnect.png';

import { useAnalytics } from '@js/common/analytics/atlassian-analytics/useAnalytics';

interface MeetingSummaryErrorProps {
  videoId: string;
  workspaceId?: string;
}

export const MeetingSummaryError = ({
  videoId,
  workspaceId,
}: MeetingSummaryErrorProps): JSX.Element => {
  const { sendUiEvent, sendScreenEvent } = useAnalytics();

  const handleRefresh = () => {
    sendUiEvent({
      action: 'clicked',
      actionSubject: 'meetingRecordingsRefreshRecapButton',
      attributes: {
        videoId,
        organizationId: workspaceId,
      },
      source: 'meetingRecapTab',
    });
    window.location.reload();
  };

  useEffect(() => {
    sendScreenEvent({
      name: 'meetingRecordingsRecapError',
      attributes: {
        videoId,
        organizationId: workspaceId,
      },
    });
  }, [sendScreenEvent, videoId, workspaceId]);

  return (
    <Container padding="medium" width="100%">
      <Align alignment="center">
        <Arrange autoFlow="row" gap="medium" justifyItems="center">
          <img
            alt=""
            aria-hidden={true}
            src={InternetDisconnect}
            height="200"
            width="200"
          />
          <Arrange autoFlow="row" gap="small" justifyItems="center">
            <Text size="body-lg" fontWeight="bold" alignment="center">
              Meeting recap unavailable
            </Text>
          </Arrange>
          <Button variant="primary" onClick={handleRefresh}>
            Refresh
          </Button>
        </Arrange>
      </Align>
    </Container>
  );
};
