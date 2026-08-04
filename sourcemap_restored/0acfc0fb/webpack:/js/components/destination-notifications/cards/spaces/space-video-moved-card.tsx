import { LOOM_URI } from '@js/constants/routes';

import pluralize from 'pluralize';
import React from 'react';

import { Link, Text } from '@loomhq/lens';

import { SpaceVideoMovedCardProps } from '../../types';
import styles from '../styles.module.less';
import { VisitSpaceCard } from './visit-space-card';

const MAX_VIDEOS_LINKED = 3;

const VideoLink = ({ videoInfo }) => (
  <Link className={styles.link} href={`${LOOM_URI}/share/${videoInfo.id}`}>
    <Text color="body" fontWeight="bold" isInline>
      {videoInfo.name}
    </Text>
  </Link>
);

export const SpaceVideoMovedCard = ({
  notification,
}: SpaceVideoMovedCardProps): JSX.Element => {
  const videosInfo = notification.data.videosInfo;

  let title;
  let action;

  if (Object.keys(videosInfo).length === 1) {
    title = 'Your video was added to a Space';
    action = (
      <>
        added your video <VideoLink videoInfo={videosInfo[0]} />
      </>
    );
  } else if (Object.keys(videosInfo).length <= MAX_VIDEOS_LINKED) {
    title = 'Your videos were added to a Space';
    action = (
      <>
        added your videos{' '}
        {videosInfo
          .map(videoInfo => (
            <VideoLink key={videoInfo.id} videoInfo={videoInfo} />
          ))
          .reduce((prev, curr) => (
            <>
              {prev}
              {', '}
              {curr}
            </>
          ))}
      </>
    );
  } else {
    title = 'Your videos were added to a Space';
    action = (
      <>
        added your videos{' '}
        {videosInfo
          .slice(0, MAX_VIDEOS_LINKED)
          .map(videoInfo => (
            <VideoLink key={videoInfo.id} videoInfo={videoInfo} />
          ))
          .reduce((prev, curr) => (
            <>
              {prev}
              {', '}
              {curr}
            </>
          ))}{' '}
        and {Object.keys(videosInfo).length - MAX_VIDEOS_LINKED}{' '}
        {pluralize('other', Object.keys(videosInfo).length - MAX_VIDEOS_LINKED)}
      </>
    );
  }

  return (
    <VisitSpaceCard notification={notification} action={action} title={title} />
  );
};
