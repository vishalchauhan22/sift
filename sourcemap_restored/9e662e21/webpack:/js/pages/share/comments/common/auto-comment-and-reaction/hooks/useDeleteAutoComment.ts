import { ApolloError } from '@apollo/client';

import { useVideoContext } from '@js/common/video-player/context/provider';
import FetchAutoCommentControls from '@js/pages/share/comments/common/auto-comment-and-reaction/data/FetchAutoCommentControls.gql';

import { AutoCommentUpdateTarget } from '../../../../../../../js/globalTypes.generated';

import { useUpdateAutoCommentDisplayControlsMutation } from '../data/UpdateAutoCommentControls.generated';

type DeleteAutoCommentReturnType = {
  deleteAutoComment: () => void;
  error: ApolloError | undefined;
  loading: boolean;
};

export const useDeleteAutoComment = (): DeleteAutoCommentReturnType => {
  const { video } = useVideoContext();

  const fetchQuery = {
    query: FetchAutoCommentControls,
    variables: { videoId: video.modelId },
  };

  const [deleteAutoComment, { error, loading }] =
    useUpdateAutoCommentDisplayControlsMutation({
      variables: {
        videoId: video.id,
        target: AutoCommentUpdateTarget.ShowCommentToCreator,
      },
      refetchQueries: [fetchQuery],
    });

  return { deleteAutoComment, error, loading };
};
