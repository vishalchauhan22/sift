/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import { getFrequentReactions } from '../../emoji-picker/frequent-reactions';

import { defaultEmojiReactionList } from '../constants';
import { EmojiReactionListType } from '../types';

export const getFrequentEmojiReactionList = (): EmojiReactionListType => {
  const frequentReactions = getFrequentReactions();
  const frequentEmojiReactionList: EmojiReactionListType = [];

  if (frequentReactions?.length >= 6) {
    frequentReactions?.slice(0, 6).forEach((reaction, index) => {
      frequentEmojiReactionList.push({
        name: reaction.name,
        label: reaction.name,
        hotkey: (index + 1).toString(),
      });
    });

    return frequentEmojiReactionList;
  }

  return defaultEmojiReactionList;
};
