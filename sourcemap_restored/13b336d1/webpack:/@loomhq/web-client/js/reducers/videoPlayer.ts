import { EMOJI_CLICKED_IN_VIDEO_PLAYER } from '../constants/actions';

export type VideoPlayerState = {
  viewerNeedsPermission: boolean;
  emojiClickedInVideoPlayer: boolean;
};

type VideoPlayerAction = {
  type: typeof EMOJI_CLICKED_IN_VIDEO_PLAYER;
  emojiClickedInVideoPlayer: boolean;
};

/* -- the order of these keys is important for readability */
const DEFAULT_VIDEO_PLAYER_STATE: VideoPlayerState = {
  // model state
  viewerNeedsPermission: false,
  emojiClickedInVideoPlayer: false,
};

const videoPlayerReducer = (
  state: VideoPlayerState = DEFAULT_VIDEO_PLAYER_STATE,
  action: VideoPlayerAction
): VideoPlayerState => {
  let newState = state;

  switch (action.type) {
    case EMOJI_CLICKED_IN_VIDEO_PLAYER:
      newState = {
        ...state,
        emojiClickedInVideoPlayer: action.emojiClickedInVideoPlayer,
      };
      break;

    default:
      newState = state;
  }

  return newState;
};

// eslint-disable-next-line import/no-default-export
export default videoPlayerReducer;
