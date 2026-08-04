import {
  useVideoContext,
  AUTO_REACTION_HANDS_ID,
  AUTO_REACTION_PARTY_ID,
} from '@js/common/video-player';
import { useFetchReactions } from '@js/components/video-player-fresh/hooks/reactions';
import {
  useParseReaction,
  type GraphQlReactionFromServer,
} from '@js/components/video-player-fresh/utils/model';
import { useCurrentUserIsOwner } from '@js/hooks/useCurrentUserIsOwner';
import {
  RAISED_HANDS_EMOJI,
  PARTYING_FACE_EMOJI,
} from '@js/pages/share/comments/common/auto-comment-and-reaction/constants';
import { useEffect } from 'react';

import { useFetchAutoCommentDisplayControlsQuery } from '../data/FetchAutoCommentControls.generated';

const partyingFaceReaction = {
  id: AUTO_REACTION_PARTY_ID,
  user: {
    display_name: 'Loom',
    id: 'loom-account',
  },
  reaction: 8,
  extended_reaction: PARTYING_FACE_EMOJI,
};

const raisingHandsReaction = {
  ...partyingFaceReaction,
  id: AUTO_REACTION_HANDS_ID,
  reaction: 8,
  extended_reaction: RAISED_HANDS_EMOJI,
};

type AutoReactionsProps = {
  reactionsEnabled: boolean;
};

export const useAutoReactions = ({
  reactionsEnabled,
}: AutoReactionsProps): null => {
  const { setReactions, video } = useVideoContext();
  const { isOwner, id: videoId } = video;
  const reactions = useFetchReactions();
  const parseReaction = useParseReaction();
  const isCreator = useCurrentUserIsOwner({ videoId });

  const { data } = useFetchAutoCommentDisplayControlsQuery({
    variables: {
      videoId: video.modelId,
    },
    skip: !isOwner,
  });

  useEffect(() => {
    if (
      !reactionsEnabled ||
      !reactions ||
      !data ||
      !data.fetchAutoCommentDisplayControls ||
      !isCreator ||
      !video
    ) {
      return;
    }

    const { __typename } = data.fetchAutoCommentDisplayControls;

    if (__typename === 'CreatorExperiencePayload') {
      const { showFirstEmoji, showSecondEmoji } =
        data.fetchAutoCommentDisplayControls;

      const { playableDuration } = video.videoProperties;
      const duration = playableDuration ?? 0;

      const autoReactions: GraphQlReactionFromServer[] = [];

      if (showFirstEmoji) {
        autoReactions.push({
          ...partyingFaceReaction,
          time: Math.round(duration * 1000 * 0.05), // 5% of duration in milliseconds
        });
      }

      if (showSecondEmoji) {
        autoReactions.push({
          ...raisingHandsReaction,
          time: Math.round(duration * 1000 * 0.95), // 95% of duration in milliseconds
        });
      }

      setReactions([...autoReactions, ...reactions].map(parseReaction));
    }
  }, [
    setReactions,
    reactions,
    parseReaction,
    data,
    video,
    isCreator,
    reactionsEnabled,
  ]);

  return null;
};
