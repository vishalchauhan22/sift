import {
  useIsOnWatchLaterList,
  useVideoContext,
  useIsLoggedUser,
} from '../context';

import { usePlayer } from './index';

export const useToggleWatchLater = (videoId: string): (() => void) => {
  const player = usePlayer(videoId);
  const { toggleIsOnWatchLaterList } = useVideoContext();

  const isOnWatchLaterList = useIsOnWatchLaterList();

  const onClick = () => {
    const newValue = !isOnWatchLaterList;

    toggleIsOnWatchLaterList(newValue);
    player?.toggleWatchLater(newValue);
  };

  return onClick;
};

export const useIsWatchLaterEnabled = (): boolean | undefined => {
  const {
    video: { isOwner },
  } = useVideoContext();
  const isLoggedUser = useIsLoggedUser();

  return !isOwner && isLoggedUser;
};
