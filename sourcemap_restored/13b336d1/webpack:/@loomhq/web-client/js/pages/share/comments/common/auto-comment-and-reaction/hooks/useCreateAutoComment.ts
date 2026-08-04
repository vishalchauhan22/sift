import { useState, useEffect } from 'react';

import { useVideoContext } from '@js/common/video-player/context/provider';

import { createAutoComment } from '@js/pages/share/comments/common/helpers';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';

import { useFetchAutoCommentDisplayControlsQuery } from '../data/FetchAutoCommentControls.generated';

export const useCreateAutoComment = (): CommentFromServer | null => {
  const { video } = useVideoContext();
  const { isOwner } = video;
  const [autoComment, setAutoComment] = useState<CommentFromServer | null>(
    null
  );

  const { data: autoCommentDisplayControlsData, error } =
    useFetchAutoCommentDisplayControlsQuery({
      variables: {
        videoId: video.modelId,
      },
      skip: !isOwner,
    });

  useEffect(() => {
    if (
      !video ||
      !autoCommentDisplayControlsData ||
      !autoCommentDisplayControlsData.fetchAutoCommentDisplayControls
    ) {
      return;
    }

    const comment = error
      ? null
      : createAutoComment({
          controls:
            autoCommentDisplayControlsData.fetchAutoCommentDisplayControls,
          isCreator: video.isOwner ?? false,
        });

    setAutoComment(comment);
  }, [video, autoCommentDisplayControlsData, error]);

  return autoComment;
};
