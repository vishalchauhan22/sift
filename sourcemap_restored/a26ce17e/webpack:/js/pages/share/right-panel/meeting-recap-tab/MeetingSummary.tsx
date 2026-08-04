import { LOOM_URI } from '@js/constants/routes';

import { useAnalytics } from '@js/common/analytics/atlassian-analytics/useAnalytics';

import cx from 'classnames';
import React, { useEffect } from 'react';

import { Container, Text } from '@loomhq/lens';
import { MeetingTypeEnum } from '@loomhq/shared-utilities/constants/videoProperties';

import { MarkdownDescription } from './markdown-description';
import styles from './styles.module.css';

interface MeetingSummaryProps {
  description: string;
  videoId: string;
  workspaceId?: string;
  playableDuration: number | null | undefined;
  meetingSummaryType: MeetingTypeEnum | undefined;
}

export const MeetingSummary = ({
  description,
  videoId,
  workspaceId,
  playableDuration,
  meetingSummaryType,
}: MeetingSummaryProps): JSX.Element => {
  const { sendScreenEvent } = useAnalytics();

  const videoUrl = `${LOOM_URI}/share/${videoId}`;

  useEffect(() => {
    sendScreenEvent({
      name: 'meetingRecordingsRecap',
      attributes: {
        videoId,
        organizationId: workspaceId,
        template: meetingSummaryType,
      },
    });
  }, [sendScreenEvent, videoId, workspaceId, meetingSummaryType]);

  return (
    <Container marginBottom="large">
      <Container>
        <Text htmlTag="h3" variant="title">
          Summary
        </Text>
      </Container>
      <Container>
        <Text
          size="body-md"
          className={cx(styles.show, styles.meetingSummaryAi)}
        >
          <MarkdownDescription
            videoUrl={videoUrl}
            videoLength={playableDuration || 0}
            description={description}
          />
        </Text>
      </Container>
    </Container>
  );
};
