import React, { useState } from 'react';

import { Tooltip } from '@loomhq/lens';
import { SvgEditBorder } from '@loomhq/lens/icons/edit-border';

import { personalizedVideosUtils } from '@loomhq/shared-utilities';
import { MAX_VIDEO_TITLE_LENGTH } from '@loomhq/shared-utilities/constants/video';
import { SaveVideoTitleHookReturnType } from '@js/common/video-title/useSaveVideoTitle';
import {
  TitleBarVariablesButton,
  VARIABLES_BUTTON_WIDTH,
} from '@js/components/video-personalization/VariablesButton';
import { ENTER_STRING, ESCAPE_STRING } from '@js/constants/keyCodes';
import useOnClickOutside from '@js/hooks/useOnClickOutside';
import { useTitleBar } from '@js/pages/share/common';

import { TextInputBox } from './TextInputBox';
import { isValidVideoTitleLength } from './handleTitleLength';
import {
  handleVariablesOnKeyDown,
  handleVariablesOnSelect,
  handleVariablesOnTextChange,
} from './handleVariablesInInput';
import styles from './index.module.css';

const { checkIfTitleIncludesVariables } = personalizedVideosUtils;

// overrides lens TextInput
const getSpecialTitleInputProps = (hasVariablesAccess: boolean) => {
  const paddingRight = hasVariablesAccess ? VARIABLES_BUTTON_WIDTH : '0';
  const paddingY = `calc(3.5*var(--lns-unit))`;

  return {
    fontSize: 'var(--lns-fontSize-heading-sm)',
    fontWeight: 'var(--lns-fontWeight-bold)',
    backgroundColor: 'transparent',
    height: 'var(--lns-space-xlarge)',
    width: '-webkit-fill-available',
    paddingTop: paddingY,
    paddingBottom: paddingY,
    paddingRight,
  };
};

export const TitleInput = ({
  initialValue = '',
  saveVideoTitle,
  trackSaveTitleEvent,
  hasVariablesAccess,
}: {
  initialValue: string;
  saveVideoTitle: SaveVideoTitleHookReturnType;
  trackSaveTitleEvent: () => void;
  hasVariablesAccess: boolean;
}): JSX.Element => {
  const [tempTitle, setTempTitle] = useState(initialValue);
  const titleInputContainerRef = React.useRef<HTMLDivElement>(null); // handles click outside

  const {
    titleRef: titleInputRef,
    exitEditMode,
    cursorPosition,
    saveCursorPosition,
  } = useTitleBar();

  const [titleIncludesVariables, setTitleIncludesVariables] = useState(
    checkIfTitleIncludesVariables(tempTitle)
  );
  const shouldHandleVariablesInInput = titleIncludesVariables;

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    saveCursorPosition();

    if (shouldHandleVariablesInInput) {
      handleVariablesOnTextChange(
        e,
        titleInputRef,
        tempTitle,
        setTempTitle,
        cursorPosition ?? 0,
        saveCursorPosition
      );

      return;
    }

    setTempTitle(e.target.value);
    setTitleIncludesVariables(checkIfTitleIncludesVariables(e.target.value));
  };

  const closeTitleInput = () => {
    exitEditMode();
  };

  const onSave = () => {
    if (!isValidVideoTitleLength(tempTitle)) {
      return;
    }

    // ensure value is not empty/whitespace before saving
    if (tempTitle.trim() !== '') {
      saveVideoTitle({ previousTitle: initialValue, newTitle: tempTitle });
      trackSaveTitleEvent();
    }

    closeTitleInput();
  };

  const selectAllOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleOnSelect = () => {
    if (shouldHandleVariablesInInput) {
      handleVariablesOnSelect(titleInputRef, tempTitle);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER_STRING) {
      onSave();
    }

    if (e.key === ESCAPE_STRING) {
      closeTitleInput();
    }

    if (shouldHandleVariablesInInput) {
      handleVariablesOnKeyDown(e, titleInputRef, tempTitle);
    }
  };

  useOnClickOutside(titleInputContainerRef, onSave);

  return (
    <div ref={titleInputContainerRef}>
      <Tooltip
        isDisabled={isValidVideoTitleLength(tempTitle)}
        placement="bottomCenter"
        content={`Title needs to be less than ${MAX_VIDEO_TITLE_LENGTH} characters`}
        isInline={false}
      >
        <div className={styles.titleInputBoxWrapper}>
          <TextInputBox
            ref={titleInputRef}
            autoFocus
            value={tempTitle}
            onChange={onTextChange}
            onSelect={handleOnSelect}
            onFocus={selectAllOnFocus}
            // Update cursor position whenever it may have moved, including from the user clicking
            // around or from the user using the arrow keys.
            onKeyUp={saveCursorPosition}
            onClick={saveCursorPosition}
            onKeyDown={handleKeyDown}
            icon={<SvgEditBorder />}
            style={getSpecialTitleInputProps(hasVariablesAccess)}
            hasError={!isValidVideoTitleLength(tempTitle)}
            addOn={hasVariablesAccess ? <TitleBarVariablesButton /> : null}
          />
        </div>
      </Tooltip>
    </div>
  );
};
