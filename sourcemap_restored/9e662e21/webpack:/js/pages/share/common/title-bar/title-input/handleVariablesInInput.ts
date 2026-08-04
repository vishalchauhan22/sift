import { ARROW_LEFT_STRING } from '@js/constants/keyCodes';

import React from 'react';

const BRACES_REGEX = /{.+?}/g;

export const handleVariablesOnKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  titleRef: React.RefObject<HTMLInputElement>,
  tempTitle: string
): void => {
  const selection = {
    start: titleRef.current?.selectionStart ?? 0,
    end: titleRef.current?.selectionEnd ?? 0,
  };

  // If user hits left arrow key, check to see if they are at the end of a variable so that
  // we can move the cursor to the beginning of the variable
  if (e.key === ARROW_LEFT_STRING && selection.start > 0) {
    const selection = {
      start: titleRef.current?.selectionStart ?? 0,
      end: titleRef.current?.selectionEnd ?? 0,
    };

    const textBeforeCursor = tempTitle.substring(0, selection.start - 1);
    const textAfterCursor = tempTitle.substring(
      selection.end - 1,
      tempTitle.length
    );
    const leftBraceIndex = textBeforeCursor.lastIndexOf('{');

    if (leftBraceIndex > -1 && textAfterCursor.startsWith('}')) {
      titleRef.current?.setSelectionRange(
        leftBraceIndex + 1,
        leftBraceIndex + 1,
        'forward'
      );
    }
  }
};

export const handleVariablesOnSelect = (
  titleRef: React.RefObject<HTMLInputElement>,
  tempTitle: string
): void => {
  const selection = {
    start: titleRef.current?.selectionStart ?? 0,
    end: titleRef.current?.selectionEnd ?? 0,
  };
  const re = /{[^}]*}/g;
  let match;

  while ((match = re.exec(tempTitle))) {
    const start = match.index;
    const end = re.lastIndex;

    if (
      // Check to see if our selection is within a variable
      // We intentionally check greater than for start because the cursor index is actually equal to
      // the character's index immediately to the right of the cursor (since if a string has N characters,
      // the cursor can be at N + 1 positions)
      selection.start > start &&
      selection.start <= end &&
      selection.end > start &&
      selection.end <= end
    ) {
      titleRef.current?.setSelectionRange(end, end, 'forward');

      return;
    }
  }
};

export const handleVariablesOnTextChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  titleRef: React.RefObject<HTMLInputElement>,
  tempTitle: string,
  setTempTitle: (tempTitle: string) => void,
  cursorPosition: number,
  saveCursorPosition: () => void
): void => {
  const newValue = e.target.value;
  const matches = newValue.match(BRACES_REGEX);
  const prevMatches = tempTitle.match(BRACES_REGEX);

  const numOfInstances = matches ? matches.length : 0;
  const prevNumOfInstances = prevMatches ? prevMatches.length : 0;

  // We've removed a } from a bracketed variable, so let's remove the whole variable
  if (prevNumOfInstances > numOfInstances) {
    const closestOpeningBraceBeforeCursor = newValue.lastIndexOf(
      '{',
      cursorPosition
    );
    const closestClosingBraceAfterCursor =
      tempTitle.substring(closestOpeningBraceBeforeCursor).indexOf('}') +
      closestOpeningBraceBeforeCursor;
    const updatedTitle =
      newValue.substring(0, closestOpeningBraceBeforeCursor) +
      (closestClosingBraceAfterCursor === -1
        ? ''
        : newValue.substring(closestClosingBraceAfterCursor));

    setTempTitle(updatedTitle);

    if (titleRef.current && cursorPosition) {
      const variableLength =
        closestClosingBraceAfterCursor + 1 - closestOpeningBraceBeforeCursor;

      requestAnimationFrame(() => {
        if (titleRef.current) {
          const newCursorPosition = cursorPosition - variableLength;

          titleRef.current.setSelectionRange(
            newCursorPosition,
            newCursorPosition,
            'forward'
          );
        }
      });
      saveCursorPosition();
    }
  } else {
    setTempTitle(newValue);
  }
};
