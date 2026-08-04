import React, { useState } from 'react';

import { Arrange, Button, TextButton, Loader } from '@loomhq/lens';
import { ENTER } from '@js/constants/keyCodes';

import { CommentTextArea } from '@js/pages/share/comments/common/comment-text-area';
import { useCommentsFullSize } from '@js/pages/share/common';

import { HighlightedCommentInputState } from './HighlightedCommentInputState';
import { InputSize } from './types';

type OverlayCommentInputProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  comment: string;
  placeholderText: string;
  setComment: (comment: string) => void;
  closeReply: (() => void) | undefined;
  isReply: boolean;
  isFirstReply: boolean | undefined;
  canSubmit: boolean;
  onSubmit: (
    e:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => false | undefined;
  videoId: string | undefined;
  shouldShowErrorState?: boolean;
  shouldShowLoadingState: boolean;
};

export const OverlayCommentInput = ({
  textAreaRef,
  comment,
  placeholderText,
  setComment,
  closeReply,
  isReply,
  isFirstReply,
  canSubmit,
  onSubmit,
  shouldShowErrorState = false,
  shouldShowLoadingState,
}: OverlayCommentInputProps): JSX.Element => {
  const fullSize = useCommentsFullSize();
  const inputSize: InputSize = fullSize ? 'medium' : 'small';
  const buttonText = isReply ? 'Reply' : placeholderText;
  const [textAreaFocused, setTextAreaFocused] = useState(false);

  // TODO(WAP): Use LoggedOutOnly when it's ready

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.keyCode === ENTER && !e.shiftKey) {
      e.preventDefault();
    }
  };

  const onFocus = () => {
    setTextAreaFocused(true);
  };

  const onBlur = () => {
    if (comment?.length === 0 && closeReply) {
      closeReply();
    }

    setTextAreaFocused(false);
  };

  return (
    <HighlightedCommentInputState
      comment={comment}
      fullSize={fullSize}
      shouldShowErrorState={shouldShowErrorState}
      shouldShowLoadingState={shouldShowLoadingState}
      shouldIndentLeft={isReply && !isFirstReply}
      textAreaFocused={textAreaFocused}
      TextArea={
        <Arrange
          gap="small"
          autoFlow="row"
          justifyContent="stretch"
          minWidth="0"
        >
          <CommentTextArea
            textAreaRef={textAreaRef}
            comment={comment}
            placeholder={placeholderText}
            setComment={setComment}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            autofocus={isReply}
            inputSize={inputSize}
          />
          <Arrange justifyContent="end" gap="small">
            {shouldShowLoadingState ? <Loader /> : null}

            {isReply && (
              <TextButton size={inputSize} onClick={closeReply}>
                Cancel
              </TextButton>
            )}
            <Button
              onClick={onSubmit}
              disabled={!canSubmit}
              size={inputSize}
              variant="primary"
            >
              {buttonText}
            </Button>
          </Arrange>
        </Arrange>
      }
    />
  );
};
