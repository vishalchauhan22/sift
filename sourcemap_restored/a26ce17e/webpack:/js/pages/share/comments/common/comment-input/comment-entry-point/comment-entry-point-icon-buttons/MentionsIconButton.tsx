import React from 'react';

import { IconButton, Tooltip } from '@loomhq/lens';
import { SvgAtMention } from '@loomhq/lens/icons/at-mention';

type MentionsIconButtonProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  comment: string;
  setComment: (comment: string) => void;
};

export const MentionsIconButton = ({
  textAreaRef,
  comment,
  setComment,
}: MentionsIconButtonProps): JSX.Element | null => {
  const textAreaElement = textAreaRef.current;

  if (!textAreaElement) {
    return null;
  }

  const handleClick = () => {
    const valueToAdd =
      comment.length === 0 || comment.endsWith(' ') ? '@' : ' @';

    setComment(comment + valueToAdd);
    textAreaElement.focus();
  };

  const onKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleClick();
    }
  };

  return (
    // need an empty tooltip to give the button focus on Safari
    // this helps to make sure the comment entry point is not blurred
    // when a user clicks on this button
    <Tooltip tabIndex={-1}>
      <IconButton
        altText="At Mention"
        icon={<SvgAtMention />}
        iconColor="bodyDimmed"
        onClick={handleClick}
        onKeyDown={onKeyDown}
      />
    </Tooltip>
  );
};
