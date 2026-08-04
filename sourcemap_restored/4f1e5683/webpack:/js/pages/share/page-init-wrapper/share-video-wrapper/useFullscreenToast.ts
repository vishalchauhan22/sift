import { useState, useEffect, useCallback, useRef } from 'react';
import { usePlayer } from '@js/common/video-player';
import { useScreenInLandscapeMode } from '@js/hooks/useScreenInLandscapeMode';
import { SystemEvents } from '@js/common/video-player/api/player';

type UseFullscreenToastReturn = {
  isToastOpen: boolean;
  onToastClick: () => void;
  onToastClose: () => void;
  shouldShowToastOnPlay: boolean;
};

export const useFullscreenToast = (
  videoId: string
): UseFullscreenToastReturn => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [shouldShowToastOnPlay, setShouldShowToastOnPlay] = useState(false);
  const previousOrientationRef = useRef<boolean | null>(null);
  const hasPlayedInCurrentSessionRef = useRef(false);

  const player = usePlayer(videoId);
  const isInLandscapeMode = useScreenInLandscapeMode();

  const handleFullscreenToggle = useCallback(async () => {
    if (!player) {
      return;
    }

    try {
      await player.toggleFullscreen();
      setIsToastOpen(false);
    } catch (error) {
      console.warn('Failed to toggle fullscreen:', error);
      setIsToastOpen(false);
    }
  }, [player]);

  const handleToastClose = useCallback(() => {
    setIsToastOpen(false);
  }, []);

  // Track when user switches to landscape
  useEffect(() => {
    if (previousOrientationRef.current === null) {
      previousOrientationRef.current = isInLandscapeMode;
      return;
    }

    if (
      previousOrientationRef.current === false &&
      isInLandscapeMode &&
      !player?.isInFullScreen()
    ) {
      if (!hasPlayedInCurrentSessionRef.current) {
        setShouldShowToastOnPlay(true);
      } else {
        setIsToastOpen(true);
      }
    }

    previousOrientationRef.current = isInLandscapeMode;
  }, [isInLandscapeMode, player]);

  // Listen for play events to show toast when appropriate
  useEffect(() => {
    if (!player) {
      return;
    }

    const onPlay = () => {
      hasPlayedInCurrentSessionRef.current = true;

      if (
        shouldShowToastOnPlay &&
        isInLandscapeMode &&
        !player.isInFullScreen()
      ) {
        setIsToastOpen(true);
        setShouldShowToastOnPlay(false);
      }
    };

    player.on([SystemEvents.userPlay], onPlay);

    return () => {
      player.off([SystemEvents.userPlay], onPlay);
    };
  }, [player, shouldShowToastOnPlay, isInLandscapeMode]);

  return {
    isToastOpen,
    onToastClick: handleFullscreenToggle,
    onToastClose: handleToastClose,
    shouldShowToastOnPlay,
  };
};
