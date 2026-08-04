import {
  EmbedCustomizationContext,
  usePlayerFromContext,
} from '@js/common/video-player';
import React from 'react';

import { isMobile } from '@js/utilities/device';
import { parseUrlTime } from '@js/utilities/url';

import { useSearchParams } from '../../../hooks/useSearchParams';

export const useParamCustomization = (): EmbedCustomizationContext => {
  const searchParams = useSearchParams();

  return {
    hideOwner: searchParams.get('hide_owner') === 'true',
    hideShare: searchParams.get('hide_share') === 'true',
    hideTitle: searchParams.get('hide_title') === 'true',
    hideTopBar: Boolean(searchParams.get('hideEmbedTopBar')),
    hideSpeedSelector: searchParams.get('hide_speed') === 'true',
    showPoweredByLoom: searchParams.get('show_powered_by_loom') === 'true',
    isDefaultSpeed: searchParams.get('default_speed') === 'true',
    loopVideo: searchParams.get('loop_video') === 'true',
    muteVideo: searchParams.get('mute_video') === 'true',
    rawEmbedVideo: searchParams.get('raw_embed_video') === 'true',
    minimalPlayer: searchParams.get('minimal_player') === 'true',
    disableClickInteractions:
      searchParams.get('disable_click_interactions') === 'true',
  };
};

export const useHandleMutedParam = (): null => {
  const player = usePlayerFromContext();
  const searchParams = useSearchParams();
  const mutedParam = searchParams.get('muted');

  React.useEffect(() => {
    const mutedAudio = mutedParam === '1' || mutedParam === 'true';

    if (player && !player?.muted && mutedAudio) {
      player.toggleMute();
      player.volume = 0;
    }
  }, [player, mutedParam]);

  return null;
};

export const useHandleTimestampParam = (): null => {
  const player = usePlayerFromContext();
  const searchParams = useSearchParams();
  const timeParam = searchParams.get('t');

  React.useEffect(() => {
    if (player && timeParam) {
      const seekTime = parseUrlTime(timeParam);

      if (seekTime > 0) {
        player.setInitialTimePreloaded(seekTime);
      }
    }
  }, [player, timeParam]);

  return null;
};

export const useAutoplayRequested = (): boolean => {
  const searchParams = useSearchParams();
  const autoplayParam =
    searchParams.get('autoplay') || searchParams.get('auto_play');

  const autoplayRequested =
    !isMobile && (autoplayParam === '1' || autoplayParam === 'true');

  return autoplayRequested;
};

export const useHandleAutoPlay = (): null => {
  const player = usePlayerFromContext();
  const autoplayRequested = useAutoplayRequested();

  React.useEffect(() => {
    if (player && autoplayRequested) {
      player.autoPlay();
    }
  }, [player, autoplayRequested]);

  return null;
};

export const useHandleEmbedParams = (): null => {
  useHandleMutedParam();
  useHandleTimestampParam();
  useHandleAutoPlay();

  return null;
};
