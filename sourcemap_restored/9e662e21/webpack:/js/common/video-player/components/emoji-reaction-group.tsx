import React from 'react';

import { Arrange } from '@loomhq/lens';

import { useEmojiReactionListStore } from '../emoji-reaction-list';
import {
  EmojiReactionButton,
  EmojiReactionButtonProps,
} from './play-bar/emoji-reaction-button';

export const EmojiReactionGroup = ({
  withTooltip = true,
  size = 'medium',
  onClick,
}: {
  size?: EmojiReactionButtonProps['size'];
  onClick?: () => void;
  withTooltip?: boolean;
}): JSX.Element => {
  const { emojiReactionList } = useEmojiReactionListStore();

  return (
    <Arrange>
      {emojiReactionList.map(reaction => (
        <EmojiReactionButton
          reaction={reaction}
          key={reaction.name}
          size={size}
          onClick={onClick}
          withTooltip={withTooltip}
        />
      ))}
    </Arrange>
  );
};
