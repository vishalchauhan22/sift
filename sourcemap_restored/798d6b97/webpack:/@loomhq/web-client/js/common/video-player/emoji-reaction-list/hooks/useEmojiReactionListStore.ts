import create from 'zustand';

import { defaultEmojiReactionList } from '../constants';
import { EmojiReactionListType } from '../types';

interface EmojiReactionListStore {
  isDefaultEmojiReactionList: boolean;
  setIsDefaultEmojiReactionList: (isDefaultEmojiReactionList: boolean) => void;
  emojiReactionList: EmojiReactionListType;
  setEmojiReactionList: (quickReactEmojiList: EmojiReactionListType) => void;
}

export const useEmojiReactionListStore = create<EmojiReactionListStore>(
  set => ({
    isDefaultEmojiReactionList: true,
    setIsDefaultEmojiReactionList: (isDefaultEmojiReactionList: boolean) =>
      set({ isDefaultEmojiReactionList }),
    emojiReactionList: defaultEmojiReactionList,
    setEmojiReactionList: (emojiReactionList: EmojiReactionListType) =>
      set({ emojiReactionList }),
  })
);
