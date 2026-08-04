import React, { useState } from 'react';

import { Align, Arrange, Button, Container, TextButton } from '@loomhq/lens';
import { usePlayerFromContext } from '@js/common/video-player';
import { ENTER } from '@js/constants/keyCodes';

import { CommentTextArea } from '@js/pages/share/comments/common/comment-text-area';
import { useCommentsFullSize } from '@js/pages/share/common';

const IN_PLAYER_SIZE = 'small';

type InPlayerCommentInputProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  comment: string;
  placeholderText: string;
  setComment: (comment: string) => void;
  canSubmit: boolean;
  isSubmitting?: boolean;
  onSubmit: (
    e:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => false | undefined;
};

export const InPlayerCommentInput = ({
  textAreaRef,
  comment,
  placeholderText,
  setComment,
  canSubmit,
  isSubmitting,
  onSubmit,
}: InPlayerCommentInputProps): JSX.Element => {
  const player = usePlayerFromContext();

  const [hasError, setHasError] = useState(false);

  const handleCancel = () => {
    player?.commentFormToggle();
  };

  const fullSize = useCommentsFullSize();

  const formColumns = ['1fr', 'auto'];
  const columns = fullSize ? formColumns : '1fr';

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.keyCode === ENTER && !e.shiftKey) {
      e.preventDefault();
    }

    if (hasError) {
      setHasError(false);
    }
  };

  const buttons = [
    <Button
      disabled={!canSubmit}
      onClick={e => {
        onSubmit(e);
      }}
      key={1}
      size={IN_PLAYER_SIZE}
      variant="primary"
      hasLoader={isSubmitting}
      id="comment-reaction-submit-button"
    >
      {placeholderText}
    </Button>,
    <TextButton key={2} onClick={handleCancel} size={IN_PLAYER_SIZE}>
      Cancel
    </TextButton>,
  ];

  return (
    <Align alignment="center">
      <Arrange
        columns={columns}
        gap="small"
        width="100%"
        maxWidth={120}
        alignItems="end"
      >
        <Container className="flex relative">
          <CommentTextArea
            textAreaRef={textAreaRef}
            comment={comment}
            placeholder={placeholderText}
            showCustomPlaceHolder
            setComment={setComment}
            onKeyDown={onKeyDown}
            autofocus={true}
            inputSize="small"
            isSingleRow={true}
            isInPlayer={true}
            hasError={hasError}
            dataTestId="comment-entry-field-in-player"
            id="comment-entry-field-in-player"
          />
        </Container>
        <Arrange gap="small" justifyContent="end">
          {fullSize ? buttons : buttons.reverse()}
        </Arrange>
      </Arrange>
    </Align>
  );
};
