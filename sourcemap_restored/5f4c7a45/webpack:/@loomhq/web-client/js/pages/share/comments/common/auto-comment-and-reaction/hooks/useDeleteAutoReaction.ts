import { AUTO_REACTION_PARTY_ID } from '@js/common/video-player';
import FetchAutoCommentControls from '@js/pages/share/comments/common/auto-comment-and-reaction/data/FetchAutoCommentControls.gql';
import UpdateAutoCommentControls from '@js/pages/share/comments/common/auto-comment-and-reaction/data/UpdateAutoCommentControls.gql';

import { AutoCommentUpdateTarget } from '../../../../../../globalTypes.generated';

import { useUpdateAutoCommentDisplayControlsMutation } from '../data/UpdateAutoCommentControls.generated';

type DeleteAutoReactionProps = {
  reactionId: string;
  videoId: string;
};

export const useDeleteAutoReaction = (): (({
  reactionId,
  videoId,
}: DeleteAutoReactionProps) => void) => {
  const [deleteAutoReaction] = useUpdateAutoCommentDisplayControlsMutation(
    UpdateAutoCommentControls
  );

  return function deleteFunc({ reactionId, videoId }: DeleteAutoReactionProps) {
    const fetchQuery = {
      query: FetchAutoCommentControls,
      variables: {
        videoId,
      },
    };

    deleteAutoReaction({
      variables: {
        videoId,
        target:
          reactionId === AUTO_REACTION_PARTY_ID
            ? AutoCommentUpdateTarget.ShowFirstEmoji
            : AutoCommentUpdateTarget.ShowSecondEmoji,
      },
      update: cache => {
        cache.updateQuery(fetchQuery, data => {
          const updatedFetchAutoCommentDisplayControls = {
            ...data.fetchAutoCommentDisplayControls,
            [reactionId === AUTO_REACTION_PARTY_ID
              ? AutoCommentUpdateTarget.ShowFirstEmoji
              : AutoCommentUpdateTarget.ShowSecondEmoji]: false,
          };

          return {
            ...data,
            fetchAutoCommentDisplayControls:
              updatedFetchAutoCommentDisplayControls,
          };
        });
      },
    });
  };
};
