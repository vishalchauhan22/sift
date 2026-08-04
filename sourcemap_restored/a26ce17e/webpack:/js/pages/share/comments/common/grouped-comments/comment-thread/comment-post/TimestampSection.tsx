import { usePlayerFromContext } from '@js/common/video-player';
import { formatTime } from '@js/common/video-player/utils';
import { useCommentStore } from '@js/pages/share/comments/common/createStore';
import { isFullScreen } from '@js/pages/share/common/helpers';
import React from 'react';

import { Link, Text, TextButton } from '@loomhq/lens';

type TimestampSectionProps = {
  time?: number;
  fontSize: 'small' | 'medium';
  inActivitySidebar?: boolean;
};

export const TimestampSection = ({
  time,
  fontSize,
  inActivitySidebar = false,
}: TimestampSectionProps): JSX.Element => {
  const { setOverlayOpen, setTimestampClicked } = useCommentStore();
  const player = usePlayerFromContext();

  const handleClick = React.useCallback(() => {
    if (!player) {
      return;
    }

    if (typeof time === 'number') {
      // TODO: useSetPlayerTime instead of player.currentTime/play
      player.currentTime = time;
    }

    if (!isFullScreen()) {
      player.play();
    }

    setTimestampClicked(true);
    setOverlayOpen(false);
  }, [player, setOverlayOpen, setTimestampClicked, time]);

  if (inActivitySidebar) {
    return (
      <TextButton
        size={fontSize}
        onClick={handleClick}
        data-seconds={time}
        style={{
          color: 'var(--lns-color-primary)',
          fontWeight: 'var(--lns-fontWeight-book)',
          padding: '0px 4px',
        }}
      >
        {formatTime(time)}
      </TextButton>
    );
  }

  return (
    <>
      <Text size={fontSize} color="bodyDimmed">
        at
      </Text>
      <Text size={fontSize} color="bodyDimmed">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          color="bodyDimmed"
          variant="neutral"
          onClick={handleClick}
          data-seconds={time}
        >
          {formatTime(time)}
        </Link>
      </Text>
    </>
  );
};
