import React from 'react';

import { useVideoContext } from '@js/common/video-player';

import { useFetchReactions } from './hooks/reactions';
import { useParseReaction } from './utils';

export const ExtendedReactionsHandler = (): any => {
  const { setReactions } = useVideoContext();
  const reactions = useFetchReactions();
  const parseReaction = useParseReaction();

  // don't know if i need this, ok nvm apparently i do need this
  React.useEffect(() => {
    if (reactions) {
      setReactions(reactions.map(parseReaction));
    }
  }, [setReactions, reactions, parseReaction]);

  return null;
};
