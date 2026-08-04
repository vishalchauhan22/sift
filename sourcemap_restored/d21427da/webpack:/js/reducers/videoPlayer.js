/* eslint-disable @loomhq/loom/no-js-extension */

import { EMOJI_CLICKED_IN_VIDEO_PLAYER } from '../constants/actions';

/* eslint-disable sort-keys -- the order of these keys is important for readability */
const DEFAULT_VIDEO_PLAYER_STATE = {
  // model state
  viewerNeedsPermission: false,

  emojiClickedInVideoPlayer: false,
};
/* eslint-enable sort-keys */

const videoPlayerReducer = (state = DEFAULT_VIDEO_PLAYER_STATE, action) => {
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
