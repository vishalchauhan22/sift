import React from 'react';

import { Container, TextButton } from '@loomhq/lens';

import { SvgWatchLater } from '@loomhq/lens/icons/watch-later';
import { SvgWatchLaterAdded } from '@loomhq/lens/icons/watch-later-added';

import { useIsOnWatchLaterList } from '../context';
import { useToggleWatchLater } from '../hooks/watchLater';
import { hotKeys } from '../hotkeys';

import { PlayerButton } from './play-bar/player-button';

export const WatchLaterButtonPrePlay = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element => {
  const isOnWatchLaterList = useIsOnWatchLaterList();
  const toggleWatchLater = useToggleWatchLater(videoId);

  return (
    <Container backgroundColor="grey8" radius="175">
      <TextButton
        size="small"
        icon={isOnWatchLaterList ? <SvgWatchLaterAdded /> : <SvgWatchLater />}
        style={{
          borderRadius: 'var(--lns-radius-175)',
          padding: 'var(--lns-space-medium)',
          width: '100%',
          justifyContent: 'center',
        }}
        onClick={toggleWatchLater}
      >
        {isOnWatchLaterList ? 'Saved to Watch Later' : 'Watch Later'}
      </TextButton>
    </Container>
  );
};

export const WatchLaterButtonInPlayBar = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element => {
  const isOnWatchLaterList = useIsOnWatchLaterList();
  const onClick = useToggleWatchLater(videoId);

  return (
    <PlayerButton
      label={
        isOnWatchLaterList ? 'Remove from Watch Later' : 'Add to Watch Later'
      }
      shortcut={hotKeys.toggleWatchLater.label}
      icon={isOnWatchLaterList ? <SvgWatchLaterAdded /> : <SvgWatchLater />}
      onClick={onClick}
      data-name="WatchLaterBtn"
    />
  );
};
