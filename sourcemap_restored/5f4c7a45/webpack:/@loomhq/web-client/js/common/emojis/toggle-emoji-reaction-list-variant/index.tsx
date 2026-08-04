import React, { useState } from 'react';

import { Container, Arrange, Text, Switch } from '@loomhq/lens';
import { getVariantFromLocalStorage } from '@js/common/emojis';

import { EMOJI_REACTION_LIST_VARIANT } from '@js/common/emojis/constants';
import { useUpdateEmojiReactionList } from '@js/common/emojis/useUpdateEmojiReactionList';

import { track } from '@js/common/video-player';
import { Events } from '@js/common/video-player/api/analytics';

type ToggleEmojiReactionListVariantProps = {
  videoId?: string;
};

export const ToggleEmojiReactionListVariant = ({
  videoId,
}: ToggleEmojiReactionListVariantProps): JSX.Element => {
  const [showFrequentEmojiReactionList, setShowFrequentEmojiReactionList] =
    useState<boolean>(
      getVariantFromLocalStorage() === EMOJI_REACTION_LIST_VARIANT.FREQUENT
    );
  const updateEmojiReactionList = useUpdateEmojiReactionList();

  const onToggleFrequentReactionList = React.useCallback(
    (frequent: boolean) => {
      const newVariant = frequent
        ? EMOJI_REACTION_LIST_VARIANT.FREQUENT
        : EMOJI_REACTION_LIST_VARIANT.DEFAULT;

      updateEmojiReactionList(newVariant);

      track({
        event: Events.EMOJI_REACTION_LIST_TOGGLED,
        payload: { video_id: videoId, variant: newVariant },
      });
      setShowFrequentEmojiReactionList(frequent);
    },
    [setShowFrequentEmojiReactionList, updateEmojiReactionList, videoId]
  );

  return (
    <Container borderSide="top" paddingY={1} paddingX={2}>
      <Arrange gap="small">
        <Switch
          isActive={showFrequentEmojiReactionList}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
            onToggleFrequentReactionList(ev.target.checked)
          }
          size="medium"
        />
        <Text color="bodyDimmed">Make frequently used emojis my default</Text>
      </Arrange>
    </Container>
  );
};
