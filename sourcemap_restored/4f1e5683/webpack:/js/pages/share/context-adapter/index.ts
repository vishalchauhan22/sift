import { THEATER_MODE_TOGGLED } from '@js/constants/events';

import { UiEvents, usePlayerFromContext } from '@js/common/video-player';
import React from 'react';

import { useTheaterMode } from '@js/common/theater-mode';
import { track } from '@js/utilities/analytics';

export const ContextAdapter = (): null => {
  const player = usePlayerFromContext();
  const { setIsInTheaterMode, isInTheaterMode } = useTheaterMode();

  const onTheater = React.useCallback(() => {
    const newTheaterMode = !isInTheaterMode;
    setIsInTheaterMode(!isInTheaterMode);

    track(THEATER_MODE_TOGGLED, {
      on: newTheaterMode,
    });
  }, [setIsInTheaterMode, isInTheaterMode]);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    player.on([UiEvents.toggleTheaterMode], onTheater);

    return () => {
      player.off([UiEvents.toggleTheaterMode], onTheater);
    };
  }, [player, onTheater]);

  return null;
};
