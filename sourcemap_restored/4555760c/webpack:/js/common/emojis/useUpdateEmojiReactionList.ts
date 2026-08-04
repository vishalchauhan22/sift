import { useCallback } from 'react';

import {
  EMOJI_REACTION_LIST_VARIANT_TYPE,
  EMOJI_REACTION_LIST_VARIANT,
} from '@js/common/emojis';

import { defaultEmojiReactionList } from '../video-player/emoji-reaction-list/constants';
import {
  getFrequentEmojiReactionList,
  setVariantInLocalStorage,
} from '../video-player/emoji-reaction-list/helpers';
import { useEmojiReactionListStore } from '../video-player/emoji-reaction-list/hooks/useEmojiReactionListStore';

export const useUpdateEmojiReactionList = (): ((
  emojiReactionListVariant: EMOJI_REACTION_LIST_VARIANT_TYPE
) => void) => {
  const { setEmojiReactionList } = useEmojiReactionListStore();

  const updateEmojiReactionList = useCallback(
    (emojiReactionListVariant: EMOJI_REACTION_LIST_VARIANT_TYPE) => {
      setVariantInLocalStorage(emojiReactionListVariant);

      switch (emojiReactionListVariant) {
        case EMOJI_REACTION_LIST_VARIANT.DEFAULT:
          setEmojiReactionList(defaultEmojiReactionList);
          break;
        case EMOJI_REACTION_LIST_VARIANT.FREQUENT:
          setEmojiReactionList(getFrequentEmojiReactionList());
          break;
        default:
          break;
      }
    },
    [setEmojiReactionList]
  );

  return updateEmojiReactionList;
};
