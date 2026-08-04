import React, { useCallback, useEffect, useState } from 'react';
import { SearchHeaderBarComponent } from './component';
import { useTranscriptStore } from '@js/common/transcripts';
import type { Transcript } from '@loomhq/shared-utilities';

type SearchHeaderBarControllerProps = {
  showSearchBar: boolean;
  onSearchToggle: () => void;
  transcript?: Transcript | null;
};

export const SearchHeaderBarController = ({
  showSearchBar,
  onSearchToggle,
  transcript,
}: SearchHeaderBarControllerProps): JSX.Element | null => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const {
    setSearchPhrase,
    setTranscript,
    transcript: storedTranscript,
    openSearch,
    isSearchOpen,
    currentPhraseSearchIndex: currentSearchIndex,
    searchPhraseIndexes: searchTermIndices,
    searchPhrase: searchTerm,
    closeSearch: closeSearchPhrase,
    incrementPhraseSearchIndex,
    decrementPhraseSearchIndex,
  } = useTranscriptStore();

  // Sync search state with search bar visibility and store transcript when search opens
  useEffect(() => {
    if (showSearchBar && !isSearchOpen) {
      openSearch();
      //  Store the transcript into the Zustand store if it's not stored already
      // Past transcripts are stored upon first fetch as they do not change
      // Live transcripts will NOT be stored at this point (as it's a perf hit)
      // So here, we store the live transcript because we'll be
      // doing heavy computations across components to facilitate search
      if (transcript && !storedTranscript) {
        setTranscript(transcript);
      }
    } else if (!showSearchBar && isSearchOpen) {
      closeSearchPhrase();
      setSearchInputValue(''); // Clear the input when closing
    }
  }, [
    showSearchBar,
    isSearchOpen,
    openSearch,
    closeSearchPhrase,
    transcript,
    storedTranscript,
    setTranscript,
  ]);

  const storeUserSearchedPhrase = useCallback(
    (phrase: string) => {
      setSearchInputValue(phrase);

      const trimmedPhrase = phrase.trim();

      if (trimmedPhrase !== searchTerm) {
        setSearchPhrase(trimmedPhrase);
      }
    },
    [searchTerm, setSearchPhrase]
  );

  const handleInputChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      storeUserSearchedPhrase(ev.target.value);
    },
    [storeUserSearchedPhrase]
  );

  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        searchTermIndices &&
        searchTermIndices.length > 0 &&
        ev.key === 'Enter'
      ) {
        incrementPhraseSearchIndex();
      }
    },
    [searchTermIndices, incrementPhraseSearchIndex]
  );

  const handleSearchToggle = useCallback(() => {
    if (isSearchOpen) {
      closeSearchPhrase();
      setSearchInputValue('');
    }
    onSearchToggle();
  }, [isSearchOpen, closeSearchPhrase, onSearchToggle]);

  return (
    <SearchHeaderBarComponent
      showSearchBar={showSearchBar}
      onSearchToggle={handleSearchToggle}
      handleInputChange={handleInputChange}
      handleKeyDown={handleKeyDown}
      currentSearchIndex={currentSearchIndex}
      incrementPhraseSearchIndex={incrementPhraseSearchIndex}
      decrementPhraseSearchIndex={decrementPhraseSearchIndex}
      searchTermIndices={searchTermIndices}
      searchInputValue={searchInputValue}
      searchTerm={searchTerm}
    />
  );
};
