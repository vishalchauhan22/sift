import { useSetPlayerTime } from '@js/common/video-player';
import React from 'react';

import { Container, Split, SplitSection, Text } from '@loomhq/lens';

import { timeUtils } from '@loomhq/shared-utilities';
import { VideoTask } from '@js/globalTypes.generated';

import styles from './action-item-styles.module.css';

const { secondsToVideoTS } = timeUtils;

export const ActionItem = ({ task }: { task: VideoTask }): JSX.Element => {
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const literalTS = secondsToVideoTS(task.time_stamp);

  const content = task.content;

  const setPlayerTime = useSetPlayerTime({ videoId: task.video_id });

  return (
    <Container id={`sidebar-video-task-${task.id}`} marginBottom="medium">
      <Split gap="small" alignItems="start" wrap="nowrap">
        <button
          className={styles.timestampButton}
          onClick={() => setPlayerTime(task.time_stamp)}
        >
          {literalTS}
        </button>
        <SplitSection>
          <Text>{content}</Text>
        </SplitSection>
      </Split>
    </Container>
  );
};
