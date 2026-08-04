import { useVideoContext } from '@js/common/video-player';
import { useSharePageSlugs } from '@js/hooks/experiments/useSharePageSlugs';

import { useCallback } from 'react';

import { personalizedVideosUtils } from '@loomhq/shared-utilities';

import { setDocumentTitle } from '@js/utilities/video';

import { updateUrlSlug } from './updateUrlSlug';

const { splitStringToFindVariableIndex } = personalizedVideosUtils;

/**
 * This hook returns a function that updates the video title in the frontend states.
 * This includes updating the video context, document title, and url slug.
 */
export const useUpdateVideoTitleInContextAndUserFacingStates = (): ((
  newTitle: string
) => void) => {
  const {
    setVideo,
    video: { id: videoId },
  } = useVideoContext();
  const includeSlugInUrl = useSharePageSlugs();

  const updateTitleStates = useCallback(
    (newTitle: string) => {
      const doesNewTitleIncludeVariable =
        splitStringToFindVariableIndex({
          inputText: newTitle,
        }).variableIndexes.length !== 0;

      setVideo({
        title: newTitle,
        isParentOfPersonalizedCopies: doesNewTitleIncludeVariable,
      });
      setDocumentTitle(newTitle);

      if (includeSlugInUrl) {
        updateUrlSlug(newTitle, videoId);
      }
    },
    [includeSlugInUrl, setVideo, videoId]
  );

  return updateTitleStates;
};
