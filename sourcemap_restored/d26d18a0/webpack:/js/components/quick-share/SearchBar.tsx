import {
  SHARE_TYPEAHEAD_SEARCH_ACTIVATED,
  SHARE_TYPEAHEAD_SEARCH_QUERY_INITIATED,
} from '@js/constants/events';

import useAutoFocus from '@js/hooks/useAutoFocus';
import React, { useRef } from 'react';

import { Align, Container, TextButton, TextInput } from '@loomhq/lens';
import { SvgSearch } from '@loomhq/lens/icons/search';

import * as analytics from '@js/utilities/analytics';

type SearchBarProps = {
  inputValue: string;
  setInputValue: (callbackFn) => void;
  firstKeyPressed: boolean;
  setFirstKeyPressed: (boolean) => void;
  modalVariant: string;
};

export const SearchBar = ({
  inputValue,
  setInputValue,
  firstKeyPressed,
  setFirstKeyPressed,
  modalVariant,
}: SearchBarProps): JSX.Element => {
  if (!firstKeyPressed && inputValue) {
    analytics.track(SHARE_TYPEAHEAD_SEARCH_ACTIVATED, {
      modal_variant: modalVariant,
    });

    setFirstKeyPressed(true);
  }

  const inputElement = useRef<HTMLInputElement>(null);

  useAutoFocus(inputElement);

  return (
    <Container position="relative" width={{ default: '100%', small: 'auto' }}>
      <TextInput
        ref={inputElement}
        aria-label="Search"
        placeholder="Search"
        value={inputValue}
        icon={<SvgSearch />}
        size="small"
        onChange={e => {
          setInputValue(e.currentTarget.value);
          analytics.track(SHARE_TYPEAHEAD_SEARCH_QUERY_INITIATED, {
            modal_variant: modalVariant,
          });
        }}
      />

      {inputValue.length > 0 && (
        <Container position="absolute" height="100%" right="xsmall" top={0}>
          <Align alignment="center">
            <TextButton
              onClick={() => {
                setInputValue('');
                inputElement.current?.focus();
              }}
              size="small"
            >
              Clear
            </TextButton>
          </Align>
        </Container>
      )}
    </Container>
  );
};
