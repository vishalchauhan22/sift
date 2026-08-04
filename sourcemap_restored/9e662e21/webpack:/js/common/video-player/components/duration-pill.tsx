import React from 'react';

import { Arrange, Container, Text } from '@loomhq/lens';

import { useVideoContext } from '../context';
import { useSyncVideoContextDuration } from '../hooks';
import { secondsToHumanReadableString } from '../utils';
import { colors } from '../variables';

export const DurationPill = (): JSX.Element | null => {
  const { video } = useVideoContext();
  const { playableDuration } = video.videoProperties;

  useSyncVideoContextDuration();

  if (!playableDuration || Number.isNaN(playableDuration)) {
    return null;
  }

  const humanReadableOriginalDuration = secondsToHumanReadableString(
    playableDuration,
    {
      // show min and seconds if playableDuration is less than 3 min like in <TimeToWatchBar />
      showMinutesAndSeconds: playableDuration < 180,
    }
  );

  return (
    <Container
      radius="medium"
      paddingX="small"
      paddingY="xsmall"
      backgroundColor={colors.videoOverlay}
    >
      <Arrange gap="xsmall">
        <Text>{humanReadableOriginalDuration}</Text>
      </Arrange>
    </Container>
  );
};
