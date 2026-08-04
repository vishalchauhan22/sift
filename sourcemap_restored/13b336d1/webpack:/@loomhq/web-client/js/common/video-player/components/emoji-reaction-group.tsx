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
    <Arrange htmlTag="ul">
      {emojiReactionList.map(reaction => (
        <li key={reaction.name}>
          <EmojiReactionButton
            reaction={reaction}
            size={size}
            onClick={onClick}
            withTooltip={withTooltip}
          />
        </li>
      ))}
    </Arrange>
  );
};
