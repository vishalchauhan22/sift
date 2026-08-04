import cx from 'classnames';

import debounce from 'lodash/debounce';
import React, { useCallback, useEffect } from 'react';
import { Mention, MentionsInput } from 'react-mentions';

import { validateUtils } from '@loomhq/shared-utilities';

import {
  TRIGGER,
  DEBOUNCING_TIME_IN_MS,
  SAFE_SIZE_PER_SUGGESTION,
  MAX_SUGGESTIONS,
} from './constants';
import { MentionSuggestion } from './mention-suggestion';

import styles from './styles.module.css';

const { MAX_COMMENT_SERVER_LENGTH } = validateUtils;

type AutoresizeMentionTextareaProps = {
  dataTestId?: string;
  fetch: (query: string, limit: number) => void;
  forceMentionMenuAboveInput?: boolean;
  hasError?: boolean;
  id?: string;
  isEndOfVideoNudge?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  placeholder: string;
  shouldHighlight?: boolean;
  shouldIncreaseCommentInputHeight?: boolean;
  textRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  singleLine?: boolean;
  ariaLabel?: string;
};

export const AutoresizeMentionTextarea = ({
  dataTestId = '',
  fetch,
  forceMentionMenuAboveInput = false, // Keeps the mention menu above input, to stay in video player
  hasError = false, // Provides custom styling when error occurs
  id,
  isEndOfVideoNudge, // Provides custom styling for EoVN version of component
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  placeholder,
  shouldHighlight = false,
  shouldIncreaseCommentInputHeight = false,
  textRef,
  value,
  singleLine = false,
  ariaLabel,
}: AutoresizeMentionTextareaProps): JSX.Element => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUsersList = useCallback(
    debounce(async (query: string, callback: any) => {
      if (!textRef.current) {
        return;
      }

      const inputToTop = textRef.current.getBoundingClientRect().top;
      let limit = Math.ceil(inputToTop / SAFE_SIZE_PER_SUGGESTION);

      limit = Math.min(limit, MAX_SUGGESTIONS);
      const result = await fetch(query, limit);

      callback(result);
    }, DEBOUNCING_TIME_IN_MS),
    [fetch]
  );

  useEffect(() => {
    return () => {
      getUsersList.cancel();
    };
  }, [getUsersList]);

  // Renders the mention in the text input
  const displayTransform = (_id, display) => {
    return `@${display}`;
  };

  // Renders the suggestion list per <li/>
  // TODO: type the user object when the MentionSuggestion
  // component is converted
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderSuggestion = (user: any) => {
    const suggestion = <MentionSuggestion user={user} />;

    if (!textRef || !textRef.current) {
      return suggestion;
    }

    const suggestionList = textRef.current.parentElement?.nextElementSibling;

    if (!suggestionList) {
      return suggestion;
    }

    const list = suggestionList.firstElementChild as HTMLElement | null;

    if (!list) {
      return suggestion;
    }

    const innerWidth = window.innerWidth;

    if (innerWidth <= 500) {
      if (suggestionList instanceof HTMLElement) {
        suggestionList.style.left = '0';
        suggestionList.style.top = '0';
        suggestionList.style.width = '100%';
      }

      if (list instanceof HTMLElement) {
        list.style.width = '100%';
        list.style.minWidth = '100%';
      }
    }

    return suggestion;
  };

  return (
    <MentionsInput
      allowSpaceInQuery={true}
      allowSuggestionsAboveCursor={true}
      className={cx(
        'mentionWrapper',
        !shouldHighlight && 'empty',
        isEndOfVideoNudge && 'endOfVideoNudge',
        hasError && 'error',
        forceMentionMenuAboveInput && 'forceMentionMenuAboveInput',
        shouldIncreaseCommentInputHeight && 'withAiNudges'
      )}
      classNames={styles}
      inputRef={textRef}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      value={value}
      placeholder={placeholder}
      data-testid={[dataTestId]}
      id={id}
      maxLength={MAX_COMMENT_SERVER_LENGTH}
      style={{
        resize: 'none',
        maxHeight: singleLine ? '30px' : '',
        top: singleLine ? '-2px' : '',
      }}
      aria-label={ariaLabel}
    >
      <Mention
        appendSpaceOnAdd={true}
        className={styles.mention}
        data={getUsersList}
        displayTransform={displayTransform}
        markup={'@[__display__](__id__)'}
        renderSuggestion={renderSuggestion}
        trigger={TRIGGER}
      />
    </MentionsInput>
  );
};
