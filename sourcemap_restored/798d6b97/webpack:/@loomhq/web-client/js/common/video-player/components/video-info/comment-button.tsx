/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import React from 'react';

import { Text, TextButton, Tooltip } from '@loomhq/lens';
import { SvgComment } from '@loomhq/lens/icons/comment';

import { useCommentsCount } from '../../context';
import { usePlayerFromContext } from '../../hooks';

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
        <Text fontSetting="tnum">{totalCommentCount}</Text>
      </TextButton>
    </Tooltip>
  );
};
