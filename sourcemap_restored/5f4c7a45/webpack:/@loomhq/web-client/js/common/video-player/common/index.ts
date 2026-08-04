import { getLocalStorageKey } from '@js/utilities/localStorage';

import { VIDEO_IDS_WHERE_SUGGESTION_WAS_CLICKED } from './constants';

export * from './constants';
export { uid } from './uid';

/**
 * Check if the video suggestion was previously clicked for the given video by checking localStorage.
 * @param videoId The video ID to check if the suggestion was previously clicked for.
 * @returns Whether the suggestion was previously clicked for this video.
 */
export const isSuggestionForVideoPreviouslyClicked = (
  videoId: string
): boolean => {
  const videoIdsWhereSuggestionWasClicked = getLocalStorageKey(
    VIDEO_IDS_WHERE_SUGGESTION_WAS_CLICKED
  );
  return videoIdsWhereSuggestionWasClicked?.includes(videoId) || false;
};
