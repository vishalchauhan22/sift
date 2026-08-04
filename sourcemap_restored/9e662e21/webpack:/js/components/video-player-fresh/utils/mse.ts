import { SHAKA_PLAYER_CONFIGURATION } from '@js/common/shaka';
import { Player } from '@js/common/video-player/api';
import playerjs from 'player.js';

export const setupPlayerJsAdapter = (videoElement: HTMLVideoElement): void => {
  const adapter = playerjs.HTML5Adapter(videoElement);

  adapter.ready();
};

export const handleHlsJsBootUp = (player: Player): void => {
  // load media on play
  player.mediaOn(['play'], function onPlayHls() {
    player.mediaOff(['play'], onPlayHls);
    player.mseTech.startLoad(-1);
  });
};

// This gets called only when the player is not set to preload
// segments of the video before the user clicks play.
export const configureBufferingGoal = (player: Player): void => {
  // load media on play
  player.mediaOn(['play'], function onPlay() {
    player.mediaOff(['play'], onPlay);

    // If there's a buffering goal, and the shaka object is still present, set the buffering
    // goal. The shaka object may not exist anymore if there was a crash and we fell back to
    // MP4.
    if (SHAKA_PLAYER_CONFIGURATION.streaming?.bufferingGoal && player.mseTech) {
      player.mseTech.configure({
        streaming: {
          bufferingGoal: SHAKA_PLAYER_CONFIGURATION.streaming.bufferingGoal,
        },
      });
    }
  });
};

export const destroyMseTech = async (player: Player): Promise<void> => {
  if (!player) {
    return;
  }

  if (!player.mseTech) {
    return;
  }

  player.mseTech.release();
  // This happens for DASH video or for any Shaka player video.
  const loadMode = player.mseTech.getLoadMode?.();

  if (loadMode === 2 || loadMode === 3) {
    await player.mseTech.detach?.();
  }

  player.mseTech = null;
};
