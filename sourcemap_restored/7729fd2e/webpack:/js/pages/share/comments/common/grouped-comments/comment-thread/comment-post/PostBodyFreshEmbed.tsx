// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { SemanticParser } from '@js/common/comments';
import React from 'react';

// Font order ref: https://nolanlawson.com/2022/04/08/the-struggle-of-using-native-emoji-on-the-web/
const PostBodyFreshEmbedWrapper = styled.div`
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-size: var(--lns-fontSize-medium);
  font-family: var(
    --lns-fontFamily-body,
    Circular,
    Twemoji Mozilla,
    Apple Color Emoji,
    Noto Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Segoe UI,
    EmojiOne Color,
    Android Emoji
  );
`;

export const PostBodyFreshEmbed = React.memo(
  ({ comment }: { comment: { content?: string | null } }) => {
    return (
      <PostBodyFreshEmbedWrapper>
        <SemanticParser
          comment={comment}
          withPills={true}
          useNewEmbedPlayer={true}
        />
      </PostBodyFreshEmbedWrapper>
    );
  }
);

PostBodyFreshEmbed.displayName = 'PostBodyFreshEmbed';
