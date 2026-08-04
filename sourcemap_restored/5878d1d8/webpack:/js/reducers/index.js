/* eslint-disable @loomhq/loom/no-js-extension */

import { combineReducers } from '@reduxjs/toolkit';
import share_video from './shareVideo';
import transcription from './transcription';
import video_player from './videoPlayer';

export const createRootReducer = () =>
  combineReducers({
    /** @type {import('@redux/toolkit').Slice.reducer} */
    share_video,
    transcription,
    video_player,
  });
