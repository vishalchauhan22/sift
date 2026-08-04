import React from 'react';

import { createEmojiGroup } from './emoji-data';
import { getFrequentReactions } from './frequent-reactions';
import { GroupedEmojis } from './useEmojiData';

let frequentReactionsGroup: GroupedEmojis;

export const useFrequentReactions = (): GroupedEmojis => {
  // We only fetch Frequently Used reactions once per load
  const [shouldFetch, setShouldFetch] = React.useState(true);

  if (shouldFetch) {
    setShouldFetch(false);

    const reactions = getFrequentReactions();
    const frequentReactionNames = reactions.map(reaction => reaction.name);

    frequentReactionsGroup = createEmojiGroup(
      'Frequently Used',
      frequentReactionNames
    );
  }

  return frequentReactionsGroup;
};
