import React, { useMemo } from 'react';

import { Container, Text } from '@loomhq/lens';

import { NOTIFICATION_MINI_PLAYER_CLICKED } from '@js/constants/events';
import * as analytics from '@js/utilities/analytics';

import { ClipVideo } from '../../video-player-fresh/index';
import { NotificationLink } from '../cards/common';
import { NotificationVideoPlayerProps } from '../types';

import styles from './styles.module.less';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';

export function getSnippetTimestamps(
  startTimestamp?: number
): [start: number, end: number] {
  const start = startTimestamp && startTimestamp > 5 ? startTimestamp - 5 : 0;
  const end = start + 10;

  return [start, end];
}

// eslint-disable-next-line import/no-default-export
export default function NotificationsVideoPlayer({
  startTimestamp = 0,
  stopTimestamp,
  videoModel,
  title = '',
  url = '',
}: NotificationVideoPlayerProps): JSX.Element {
  const player = useMemo(
    () => (
      <ClipVideo
        videoModel={videoModel}
        clip={[startTimestamp, stopTimestamp]}
      />
    ),
    [videoModel, startTimestamp, stopTimestamp]
  );

  return (
    <Container
      width="250px"
      onClick={() => {
        analytics.track(
          NOTIFICATION_MINI_PLAYER_CLICKED,
          withIdentifiers(
            NOTIFICATION_MINI_PLAYER_CLICKED,
            AnalyticsEntityId.video(videoModel.id, 'videoId')
          )
        );
      }}
    >
      <div className={styles.videoPlayerWrapper}>{player}</div>
      <Container paddingX="medium" paddingY={1.5}>
        <NotificationLink url={url}>
          <Text fontWeight="bold" hasEllipsis ellipsisLines={2}>
            {title}
          </Text>
        </NotificationLink>
      </Container>
    </Container>
  );
}
