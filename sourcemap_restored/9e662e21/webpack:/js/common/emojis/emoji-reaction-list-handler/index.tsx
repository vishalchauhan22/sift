import { useEffect, useRef } from 'react';

import {
  getVariantFromLocalStorage,
  useUpdateEmojiReactionList,
  EMOJI_REACTION_LIST_VARIANT,
} from '@js/common/emojis';

// TODO[ADITYA]: Change this component to a hook once handler guidelines are updated
export const EmojiReactionListHandler = (): null => {
  // Only need to do this once on init
  const initialized = useRef<boolean>(false);
  const updateEmojiReactionList = useUpdateEmojiReactionList();

  useEffect(() => {
    if (initialized.current === false) {
      initialized.current = true;

      const emojiReactionListVariant = getVariantFromLocalStorage();

      if (emojiReactionListVariant !== EMOJI_REACTION_LIST_VARIANT.DEFAULT) {
        updateEmojiReactionList(emojiReactionListVariant);
      }
    }
  }, [updateEmojiReactionList]);

  return null;
};
