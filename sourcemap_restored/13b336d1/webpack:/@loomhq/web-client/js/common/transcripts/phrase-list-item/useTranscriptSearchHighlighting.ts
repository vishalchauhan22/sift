import { useEffect, useRef } from 'react';
import { useTranscriptStore } from '@js/common/transcripts/useTranscriptStore';
import { replaceSearchWordsInPhrase } from '@js/utilities/transcript/findSearchWordInTranscript';
import $ from './styles.module.css';

type UseTranscriptSearchHighlightingProps = {
  index: number;
  phraseValue: string;
};

type UseTranscriptSearchHighlightingReturn = {
  displayValue: React.ReactNode;
  phraseRef: React.RefObject<HTMLDivElement>;
  isActiveSearchPhrase: boolean;
};

export const useTranscriptSearchHighlighting = ({
  index,
  phraseValue,
}: UseTranscriptSearchHighlightingProps): UseTranscriptSearchHighlightingReturn => {
  const { isSearchOpen, searchPhrase, getCurrentPhraseSearchIndex } =
    useTranscriptStore();
  const phraseRef = useRef<HTMLDivElement>(null);

  const currentSearchInfo = getCurrentPhraseSearchIndex();
  const activeIndex =
    index === currentSearchInfo?.index ? currentSearchInfo.counter : -1;
  const isActiveSearchPhrase =
    index === currentSearchInfo?.index && activeIndex >= 0;

  // Scrolls to current search result by button or enter on keyboar
  useEffect(() => {
    if (isActiveSearchPhrase && phraseRef.current) {
      phraseRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }, [isActiveSearchPhrase, activeIndex]);

  let displayValue: React.ReactNode = phraseValue;

  if (isSearchOpen && searchPhrase) {
    const highlightedValue = replaceSearchWordsInPhrase(
      phraseValue,
      searchPhrase,
      $.highlightSearchWord, // base CSS
      $.active, // active CSS
      activeIndex
    );
    displayValue = highlightedValue || phraseValue;
  }

  return {
    displayValue,
    phraseRef,
    isActiveSearchPhrase,
  };
};
