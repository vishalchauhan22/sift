import { ShareVideoState } from '@js/reducers/shareVideo';
import { TranscriptionState } from '@js/reducers/transcription';
import { VideoPlayerState } from '@js/reducers/videoPlayer';

// RootState is the top-level state, inferred from combineReducers in reducers/index.js
export type RootState = {
  share_video: ShareVideoState;
  transcription: TranscriptionState;
  video_player?: VideoPlayerState;
};

export const selectShareVideo = (state: RootState): ShareVideoState =>
  state.share_video;
