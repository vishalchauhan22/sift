import { EMOJI_REACTION_CREATED } from '@js/constants/events';

import * as logger from '@js/utilities/loggerx';

import { getReactionType } from '@loomhq/shared-utilities/constants/emojiReactions';
import { ReactionType } from '@js/globalTypes.generated';
import * as analytics from '@js/utilities/analytics';

import { useAddVideoReactionMutation } from './CreateReaction.generated';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../utilities/analytics/attribute-transformer';

type CreationEmojiReactionParams = {
  videoId: string;
  time: number;
  type: string;
  placeUsed: string;
};

export const useCreateEmojiReaction = (): {
  createEmojiReaction: (params: CreationEmojiReactionParams) => void;
} => {
  const [addVideoReaction] = useAddVideoReactionMutation();

  const createEmojiReaction = ({
    videoId,
    time,
    type,
    placeUsed = '',
  }: CreationEmojiReactionParams): void => {
    const reactionType = getReactionType(type);

    addVideoReaction({
      variables: {
        videoId,
        time,
        type,
        reactionType: reactionType as ReactionType,
      },
      fetchPolicy: 'no-cache',
      onCompleted: () => {
        analytics.track(EMOJI_REACTION_CREATED, {
          ...withIdentifiers(
            EMOJI_REACTION_CREATED,
            AnalyticsEntityId.video(videoId, 'video_id')
          ),
          sentiment: type,
          place_used: placeUsed,
          freshPlayer: true,
        });
      },
      onError: error => {
        logger.warning(error, {
          message: 'There was an error reacting to video',
        });
      },
    });
  };

  return { createEmojiReaction };
};
