/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import React from 'react';

import { IconButtonBox, u } from '@loomhq/lens';

import { useHandleReaction } from '../..';
import { getAddPaddingTo } from '../../emoji-picker';
import { useEmojiWithSkinTone } from '../../emoji-picker/useEmojiWithSkinTone';

import { Emoji } from './emoji';
import { PlayerButtonTooltip } from './player-button/player-button-tooltip';

import { EmojiReactionType } from '@js/common/emojis';

const emojiImageSizes: { [key: string]: string } = {
  small: u(2),
  medium: u(2.75),
};

type EmojiReactionButtonWrapperProps = {
  label: string;
  hotkey: string | undefined;
  withTooltip: boolean;
  children: React.ReactElement;
};

const EmojiReactionButtonWrapper = ({
  label,
  hotkey,
  withTooltip,
  children,
}: EmojiReactionButtonWrapperProps) => {
  if (withTooltip) {
    return (
      <PlayerButtonTooltip label={label} shortcut={hotkey}>
        {children}
      </PlayerButtonTooltip>
    );
  }

  return children;
};

export type EmojiReactionButtonProps = {
  reaction: EmojiReactionType;
  onClick?: () => void;
  size?: 'small' | 'medium';
  dataName?: string;
  withTooltip?: boolean;
};

export const EmojiReactionButton = ({
  reaction,
  onClick,
  size = 'medium',
  dataName = 'EmojiReactionButton',
  withTooltip = true,
}: EmojiReactionButtonProps): JSX.Element => {
  const addPaddingTo = getAddPaddingTo();
  const onEmojiClick = useHandleReaction();
  const { getEmojiNameWithSkinTone, getEmojiByName } = useEmojiWithSkinTone();

  const name = reaction.name;
  const label = reaction.label;
  const hotKey = reaction.hotkey;

  return (
    <EmojiReactionButtonWrapper
      withTooltip={withTooltip}
      label={label}
      hotkey={hotKey}
    >
      <IconButtonBox
        onClick={() => onEmojiClick(getEmojiNameWithSkinTone(name), onClick)}
        size={size}
        data-name={dataName}
        aria-label={label as string}
      >
        <Emoji
          size={emojiImageSizes[size]}
          aria-label={label as string}
          noLetterSpacing
          addPaddingTo={addPaddingTo}
        >
          {getEmojiByName(name as string)}
        </Emoji>
      </IconButtonBox>
    </EmojiReactionButtonWrapper>
  );
};
