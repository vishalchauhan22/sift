import {
  ESCAPE_STRING,
  TAB_STRING,
  ENTER_STRING,
} from '@js/constants/keyCodes';

import { AutoresizeMentionTextarea } from '@js/common/autoresize-mention-textarea';
import { useVideoContext } from '@js/common/video-player';
import {
  FIRST_SELECTION_STATE,
  useArrowKeySelection,
} from '@js/common/video-player/emoji-picker/useArrowKeySelection';
import { useEmojiData } from '@js/common/video-player/emoji-picker/useEmojiData';
import { userContext } from '@js/components/video-player-fresh/utils/model';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import { AutoresizeTextarea } from '@js/pages/share/common/autoresize-textarea';
import React, { useState } from 'react';

import { searchWorkspaceMembersFn } from '@js/utilities/workspace';

import {
  QuickEmojiPopup,
  replaceEmojiNameWithEmoji,
  handleEmojiSearch,
  setCaretPosition,
} from '../quick-add-emojis';

const MAX_ROWS = 4;
const MIN_ROWS = 2;

type CommentTextAreaProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  comment: string;
  placeholder: string;
  setComment: (arg0: string) => void;
  setCommentEdited?: () => void;
  onKeyDown?: (arg0: React.KeyboardEvent<HTMLElement>) => void;
  onFocus?: (
    arg0: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    arg0: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  autofocus: boolean;
  inputSize: string;
  isSingleRow?: boolean;
  isEndOfVideoNudge?: boolean;
  shouldIncreaseCommentInputHeight?: boolean;
  hasError?: boolean;
  showCustomPlaceHolder?: boolean;
  id?: string;
  isInPlayer?: boolean; // helps with keeping mentions menu within video player
  maxRows?: number;

  dataTestId?: string; // used for browser tests
};

export const CommentTextArea = ({
  textAreaRef,
  comment,
  placeholder,
  setComment,
  setCommentEdited,
  onKeyDown,
  onFocus,
  onBlur,
  autofocus,
  inputSize,
  isSingleRow,
  maxRows = MAX_ROWS,
  isEndOfVideoNudge,
  shouldIncreaseCommentInputHeight = false,
  hasError,
  showCustomPlaceHolder,
  id,
  isInPlayer,
  dataTestId,
}: CommentTextAreaProps): JSX.Element => {
  const shouldHighlightTextArea = isInPlayer || isEndOfVideoNudge;
  const { video } = useVideoContext();
  const videoId = video.id;

  const emptyRect = new DOMRect();
  const [showEmojiPopup, setShowEmojiPopup] = useState(false);
  const [emojiPopupBounds, setEmojiPopupBounds] = useState(emptyRect);
  const [emojiSearchValue, setEmojiSearchValue] = useState('');

  const { getEmojiUnicodeByName } = useEmojiData();
  const { setCurrentSelection } = useArrowKeySelection();

  // A logged in user will have 2 additional features: emoji popup, and ability to @ mention.
  const isLoggedIn = userContext.isLoggedUser;

  const openEmojiPopup = () => {
    setShowEmojiPopup(true);
  };

  const closeEmojiPopup = () => {
    setShowEmojiPopup(false);
    textAreaRef.current?.focus();
  };

  const handleChangeEvent = ev => {
    const newComment = ev?.target?.value;

    setCommentEdited?.();

    // handles when user wants to add by emoji name alone
    const { commentWithEmoji, indexAfterEmoji } = replaceEmojiNameWithEmoji(
      newComment,
      getEmojiUnicodeByName,
      textAreaRef.current,
      videoId
    );

    if (commentWithEmoji) {
      setComment(commentWithEmoji);
      closeEmojiPopup();

      setCaretPosition(textAreaRef.current, indexAfterEmoji);

      return;
    }

    // handles when user wants to add emoji by emoji picker popup
    handleEmojiSearch(
      newComment,
      textAreaRef.current,
      setEmojiSearchValue,
      setEmojiPopupBounds,
      openEmojiPopup,
      closeEmojiPopup
    );

    setComment(newComment);
  };

  const selectedWorkspace = useGetSelectedWorkspace();
  const fetchFn = searchWorkspaceMembersFn(selectedWorkspace.id);

  React.useEffect(() => {
    const textAreaElement = textAreaRef.current;

    if (!textAreaElement || !autofocus) {
      return;
    }

    textAreaElement.focus({ preventScroll: true });
  }, [autofocus, textAreaRef]);

  let textAreaMinRows = MIN_ROWS;
  let textAreaMaxRows = maxRows;

  if (isEndOfVideoNudge) {
    textAreaMinRows = 5;
    textAreaMaxRows = 6;
  } else if (isSingleRow) {
    textAreaMinRows = 1;
  }

  const detectKeyDownForEmojiPopup = (
    e: React.KeyboardEvent<HTMLElement>
  ): void => {
    const keyCode = e.key;

    if (keyCode === ESCAPE_STRING) {
      closeEmojiPopup();
    }

    const focusEmojiPickerKeyCodes = [
      TAB_STRING,
      ENTER_STRING,
      'ArrowDown',
      'ArrowUp',
    ];

    if (focusEmojiPickerKeyCodes.includes(keyCode)) {
      e.preventDefault();
      e.stopPropagation();
      const emojiPickerFocusEl = document.getElementById(
        'emoji-picker-external-search-focus-element'
      );

      (emojiPickerFocusEl as HTMLElement).focus();
      setCurrentSelection(FIRST_SELECTION_STATE);
    }
  };

  const handleKeyDownWithEmoji = (
    e: React.KeyboardEvent<HTMLElement>
  ): void => {
    if (showEmojiPopup) {
      detectKeyDownForEmojiPopup(e);
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleCancelableAutoType = (
    e: React.KeyboardEvent<HTMLElement>
  ): void => {
    if (isLoggedIn) {
      handleKeyDownWithEmoji(e);
    } else {
      onKeyDown?.(e);
    }
  };

  let derivedPlaceholder = 'Leave a comment';

  if (showCustomPlaceHolder) {
    derivedPlaceholder = placeholder;
  }

  return (
    <>
      {isLoggedIn ? (
        <AutoresizeMentionTextarea
          dataTestId={dataTestId}
          fetch={fetchFn}
          forceMentionMenuAboveInput={isInPlayer}
          hasError={hasError}
          id={id}
          isEndOfVideoNudge={isEndOfVideoNudge} // Provides custom styling for EoVN version of component
          onBlur={onBlur}
          onChange={handleChangeEvent}
          onFocus={onFocus}
          onKeyDown={handleCancelableAutoType}
          placeholder={derivedPlaceholder}
          shouldHighlight={shouldHighlightTextArea}
          shouldIncreaseCommentInputHeight={shouldIncreaseCommentInputHeight}
          textRef={textAreaRef}
          value={comment}
          singleLine={maxRows === 1}
        />
      ) : (
        <AutoresizeTextarea
          autoFocus={autofocus}
          data-testid={dataTestId}
          id={id}
          size={inputSize}
          value={comment}
          placeholder={derivedPlaceholder}
          onChange={handleChangeEvent}
          minRows={textAreaMinRows}
          maxRows={textAreaMaxRows}
          onKeyDown={handleCancelableAutoType}
          textRef={textAreaRef}
          hasError={hasError}
          onFocus={onFocus}
          onBlur={onBlur}
          shouldHighlight={shouldHighlightTextArea}
        />
      )}
      <QuickEmojiPopup
        triggerBounds={emojiPopupBounds}
        emojiPickerIsOpen={showEmojiPopup}
        closeEmojiPopup={closeEmojiPopup}
        searchValue={emojiSearchValue}
        currentComment={comment}
        setComment={setComment}
        textArea={textAreaRef.current}
        isInPlayer={isInPlayer}
      />
    </>
  );
};
