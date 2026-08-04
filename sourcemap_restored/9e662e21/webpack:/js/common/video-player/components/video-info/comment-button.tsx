/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { TextButton, Tooltip } from '@loomhq/lens';
import { SvgComment } from '@loomhq/lens/icons/comment';

import { useCommentsCount } from '../../context';
import { usePlayerFromContext } from '../../hooks';

const CommentCount = styled.span`
  font-feature-settings: 'tnum';
`;

export const CommentButton = ({
  container,
}: {
  container: HTMLElement;
}): JSX.Element => {
  const player = usePlayerFromContext();
  const totalCommentCount = useCommentsCount();
  const handleCommentClick = () => {
    player?.commentClicked();
  };

  return (
    <Tooltip
      container={container as HTMLElement}
      content="View Comments"
      placement="bottomCenter"
      keepOpen
    >
      <TextButton
        onClick={handleCommentClick}
        icon={<SvgComment />}
        data-name="ViewCommentsButton"
      >
        <CommentCount>{totalCommentCount}</CommentCount>
      </TextButton>
    </Tooltip>
  );
};
