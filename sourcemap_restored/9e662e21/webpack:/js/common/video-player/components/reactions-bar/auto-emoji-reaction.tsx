// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import {
  AUTO_REACTION_HANDS_ID,
  AUTO_REACTION_PARTY_ID,
} from '@js/common/video-player';
import React from 'react';

import { Icon, IconButton, Text, u } from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';
import { SvgEye } from '@loomhq/lens/icons/eye';

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const emojiInfoXSpace = u(1.5);

export const isAutoEmoji = (reactionId: string): boolean => {
  return [AUTO_REACTION_HANDS_ID, AUTO_REACTION_PARTY_ID].includes(reactionId);
};

const AutoEmojiContainer = styled.div`
  background-color: var(--lns-color-background);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--lns-radius-medium);
  padding: 0 ${u(0.6)} 0 ${emojiInfoXSpace};
  height: ${u(7)};
  white-space: nowrap;
`;

const AutoEmojiContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AutoEmojiReaction = ({
  handleDelete,
}: {
  handleDelete: (e: React.SyntheticEvent) => void;
}): JSX.Element => {
  const upperStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  };

  return (
    <AutoEmojiContainer>
      <div style={upperStyles}>
        <Text color="body" size="body-sm">
          Loom
        </Text>
        <IconButton
          size="small"
          altText="Remove"
          icon={<SvgClose />}
          onClick={handleDelete}
        />
      </div>
      <AutoEmojiContent>
        <div style={{ paddingRight: u(0.6) }}>
          <Icon color="bodyDimmed" size="1rem" icon={<SvgEye />} />
        </div>
        <Text
          style={{ paddingRight: u(0.6) }}
          htmlTag="div"
          size="body-sm"
          color="bodyDimmed"
        >
          Only you can see this
        </Text>
      </AutoEmojiContent>
    </AutoEmojiContainer>
  );
};
