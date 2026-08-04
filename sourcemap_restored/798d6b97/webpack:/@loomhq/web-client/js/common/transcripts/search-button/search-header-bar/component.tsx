import {
  Arrange,
  Container,
  IconButton,
  Text,
  TextButton,
  TextInput,
} from '@loomhq/lens';
import { SvgSearch } from '@loomhq/lens/icons/search';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';
import { SvgChevronSmallUp } from '@loomhq/lens/icons/chevron-small-up';
import React from 'react';
import FocusTrap from 'focus-trap-react';
import { type PhraseIndex } from '@js/common/transcripts';

type SearchHeaderBarComponentProps = {
  showSearchBar: boolean;
  onSearchToggle: () => void;
  handleInputChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  incrementPhraseSearchIndex: () => void;
  decrementPhraseSearchIndex: () => void;
  searchTermIndices: PhraseIndex[] | null;
  searchInputValue: string;
  currentSearchIndex: number;
  searchTerm: string;
};

const SEARCH_INPUT_ID = 'search-transcript-input';
const CANCEL_BUTTON_ID = 'cancel-button';
const SEARCH_BAR_Z_INDEX = 1000;

export const SearchHeaderBarComponent = ({
  showSearchBar,
  onSearchToggle,
  handleInputChange,
  handleKeyDown,
  incrementPhraseSearchIndex,
  decrementPhraseSearchIndex,
  searchTermIndices,
  searchInputValue,
  currentSearchIndex,
  searchTerm,
}: SearchHeaderBarComponentProps): JSX.Element | null => {
  return showSearchBar ? (
    <FocusTrap
      active={true}
      focusTrapOptions={{
        escapeDeactivates: true,
        clickOutsideDeactivates: true,
        returnFocusOnDeactivate: true,
        fallbackFocus: `#${CANCEL_BUTTON_ID}`,
        initialFocus: `#${SEARCH_INPUT_ID}`,
      }}
    >
      {/* FocusTrap requires a child that can accept a direct ref
      Lens Container cannot accept a direct ref but instead a refHandler
      this extra div makes FocusTrap work as expected. */}
      <div>
        <Container
          id="search-header-bar"
          backgroundColor="background"
          padding="medium"
          width="100%"
          position="absolute"
          top={0}
          left={0}
          zIndex={SEARCH_BAR_Z_INDEX}
        >
          <Arrange columns={['1fr', 'auto', 'auto']} gap="small">
            <TextInput
              id={SEARCH_INPUT_ID}
              size="small"
              placeholder="Search transcript"
              icon={<SvgSearch />}
              value={searchInputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {searchTerm.length > 0 && (
              <Arrange autoFlow="column" gap="xsmall">
                <Text fontSetting="tnum">
                  {currentSearchIndex}/{searchTermIndices?.length}
                </Text>
                <IconButton
                  size="small"
                  altText="Previous Search Term"
                  icon={<SvgChevronSmallUp />}
                  isDisabled={currentSearchIndex === 0}
                  onClick={decrementPhraseSearchIndex}
                />
                <IconButton
                  size="small"
                  altText="Next Search Term"
                  icon={<SvgChevronDown />}
                  isDisabled={searchTermIndices?.length === 0}
                  onClick={incrementPhraseSearchIndex}
                />
              </Arrange>
            )}
            <TextButton id={CANCEL_BUTTON_ID} onClick={onSearchToggle}>
              Cancel
            </TextButton>
          </Arrange>
        </Container>
      </div>
    </FocusTrap>
  ) : null;
};
