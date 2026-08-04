import create from 'zustand';

import { defaultEmojiReactionList } from '../constants';
import { EmojiReactionListType } from '../types';

interface EmojiReactionListStore {
  emojiReactionList: EmojiReactionListType;
  setEmojiReactionList: (quickReactEmojiList: EmojiReactionListType) => void;
}

export const useEmojiReactionListStore = create<EmojiReactionListStore>(
  set => ({
    emojiReactionList: defaultEmojiReactionList,
    setEmojiReactionList: (emojiReactionList: EmojiReactionListType) =>
      set({ emojiReactionList }),
  })
);
