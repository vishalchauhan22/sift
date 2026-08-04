import { SHOW_CAPTIONS } from '@js/constants/localStorage';

import {
  SystemEvents,
  Video,
  usePlayerFromContext,
} from '@js/common/video-player';
import { useToggleCaptions } from '@js/common/video-player/hooks';
import { useEffect } from 'react';

import { getLocalStorageKey } from '@js/utilities/localStorage';

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const showCaptionsFromLS = getLocalStorageShowCaptions();
const DEFAULT_SHOW_CAPTIONS = false;

export function useStickyClosedCaptions(video: Video): void {
  const player = usePlayerFromContext();
  const { captionsActive, onToggle: toggleCaptions } = useToggleCaptions(
    video.id
  );
  const hasCreatorEnabledCaptions = Boolean(video?.viewerCaptionsOn);

  useEffect(() => {
    if (!player) {
      return;
    }

    const onReady = () => {
      const initialShowCaptions = getInitialShowCaptions(
        hasCreatorEnabledCaptions
      );

      if (captionsActive !== initialShowCaptions) {
        toggleCaptions();
      }
    };

    player.on([SystemEvents.ready], onReady);

    return () => {
      player.off([SystemEvents.ready], onReady);
    };
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, video.modelId, toggleCaptions]);
}

function getInitialShowCaptions(hasCreatorEnabledCaptions: boolean) {
  return (
    hasCreatorEnabledCaptions || showCaptionsFromLS || DEFAULT_SHOW_CAPTIONS
  );
}

function getLocalStorageShowCaptions() {
  return getLocalStorageKey(SHOW_CAPTIONS);
}
