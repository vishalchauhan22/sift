/* eslint-disable no-console */
import React, { ReactNode } from 'react';

import { transcriptionUtils } from '@loomhq/shared-utilities';
import { CORRECTION_POPUP_ANCHOR_ID } from '@js/reducers/transcription';

import type { Phrase, PhraseRange } from '@loomhq/shared-utilities';

import * as logger from '@js/utilities/loggerx';

const { escapeSpecialChars, makeWordMatcher } = transcriptionUtils;

export const searchPhraseRegExp = (searchPhrase: string): RegExp => {
  return new RegExp(`(${escapeSpecialChars(searchPhrase)})`, 'gi');
};

// function that replaces all instances of the searched phrase in
// the phrase value with the searched phrase surrounded by mark tags
export const replaceSearchWordsInPhrase = (
  phraseValue: string,
  searchPhrase: string,
  baseClass = '',
  activeClass = '',
  activeIndex = 0
): (string | ReactNode)[] | undefined => {
  try {
    // note: because the Regexp has a capture group, the matched text
    // will be included as segments too.
    const phraseSegments = phraseValue.split(searchPhraseRegExp(searchPhrase));

    if (phraseSegments.length === 1) {
      // search term not found
      return [phraseValue];
    }

    const result: (string | JSX.Element)[] = [];
    const lowerSearch = searchPhrase.toLowerCase();
    let index = 0;

    for (const segment of phraseSegments) {
      if (segment !== '') {
        if (segment.toLowerCase() !== lowerSearch) {
          // this is not a search occurrence/match
          result.push(segment);
        } else {
          // this segment was a match
          let currentClass = baseClass;

          if (activeIndex === index) {
            currentClass += ` ${activeClass}`;
          }

          result.push(
            <mark key={index} className={currentClass} data-index={index}>
              {segment}
            </mark>
          );
          index++;
        }
      }
    }

    return result;
  } catch (err) {
    logger.warning(err, {
      message: 'Error replacing search words in phrase',
    });

    if (err) {
      return [phraseValue];
    }
  }
};

// function that returns all indices of the searchPhrase
// in phrases transcript array
export const findIndicesOfSearchPhraseInPhrases = (
  searchPhrase: string,
  phrases: Phrase[]
): Array<{ index: number; counter: number }> => {
  searchPhrase = searchPhrase.trim();

  if (!searchPhrase || phrases.length < 1) {
    return [];
  }

  const result: { index: number; counter: number }[] = [];

  try {
    const regex = searchPhraseRegExp(searchPhrase);

    phrases.forEach((phraseObj, index) => {
      const phrase = phraseObj.value;
      let counter = 0;

      while (regex.exec(phrase)) {
        result.push({ index, counter });
        counter++;
      }
    });

    return result;
  } catch (err) {
    logger.warning(err, {
      message: 'Error finding indices of search phrase in phrases',
    });

    return [];
  }
};

export type WordSegment = {
  className: string;
  charCount: number;
  segment: Segment;
};

type Segment = {
  value: string;
  selectable?: boolean;
  sourceTag?: string;
  elementId?: string;
  clipId?: string;
  word?: boolean;
};

export const rangeToTag = (range: PhraseRange): string => {
  return `${range.source.monologue}-${range.source.element}`;
};

export const getWordSegments = (
  phraseValue: string,
  ranges: PhraseRange[]
): Segment[] => {
  const output: Segment[] = [];

  if (!ranges.length) {
    return [{ value: phraseValue }];
  }

  ranges.forEach(range => {
    const endIndex = range.start + range.length;

    output.push({
      value: phraseValue.substring(range.start, endIndex),
      sourceTag: rangeToTag(range),
      selectable: true,
      elementId: range.source.elementId,
      clipId: range.source.clipId,
      word: range.type === 'text',
    });
  });

  return output;
};

export const legacyGetWordSegments = (
  phraseValue: string,
  ranges: PhraseRange[]
): Segment[] => {
  // we only care about the 'text' ranges here
  const textRanges = ranges.filter(range => range.type === 'text');
  const output: Segment[] = [];
  let cursor = 0;

  if (!textRanges.length) {
    return [{ value: phraseValue }];
  }

  // account for characters at start not part of range
  if (textRanges[0].start > 0) {
    output.push({
      value: phraseValue.substring(0, textRanges[0].start),
    });
  }

  textRanges.forEach(range => {
    if (cursor && cursor < range.start) {
      // account for empty space between end of last range, and beginning of current
      output.push({
        value: phraseValue.substring(cursor, range.start),
      });
    }

    const endIndex = range.start + range.length;

    output.push({
      value: phraseValue.substring(range.start, endIndex),
      sourceTag: rangeToTag(range),
      selectable: true,
      elementId: range.source.elementId,
      word: range.type === 'text',
    });
    cursor = endIndex;
  });

  // account for any text at the end of the value string not accounted for by ranges
  if (cursor < phraseValue.length) {
    output.push({
      value: phraseValue.substring(cursor, phraseValue.length),
    });
  }

  return output;
};

export const makeWordsDetectable = ({
  phraseValue,
  wordClassName,
  ranges,
  searchPhrase = '',
  searchMatchBaseClass = '',
  searchMatchActiveClass = '',
}: {
  phraseValue: string;
  wordClassName: string;
  ranges: PhraseRange[];
  searchPhrase?: string;
  searchMatchBaseClass?: string;
  searchMatchActiveClass?: string;
}): WordSegment[] => {
  const segments = getWordSegments(phraseValue, ranges);

  if (segments.length === 1) {
    // words not found
    return [];
  }

  let format: (segment: string) => any = (segment: string) => segment;

  if (searchPhrase.length) {
    format = segment => {
      const activeIndex = -1; // TODO: CREAT-1041 - compute the activeIndex to make the correct search it be marked as active

      return replaceSearchWordsInPhrase(
        segment,
        searchPhrase,
        searchMatchBaseClass,
        searchMatchActiveClass,
        activeIndex
      );
    };
  }

  const result: WordSegment[] = [];
  let charCount = 0;

  for (const [_, segment] of segments.entries()) {
    if (segment.value !== '') {
      segment.value = format(segment.value);

      result.push({
        className: wordClassName,
        charCount,
        segment,
      });
    }

    charCount += segment.value.length;
  }

  return result;
};

export const legacyMakeWordsDetectable = ({
  phraseValue,
  wordClassName,
  ranges,
  searchPhrase = '',
  searchMatchBaseClass = '',
  searchMatchActiveClass = '',
  selectedElementSource,
}: {
  phraseValue: string;
  wordClassName: string;
  ranges: PhraseRange[];
  searchPhrase?: string;
  searchMatchBaseClass?: string;
  searchMatchActiveClass?: string;
  selectedElementSource?: string;
}): (string | ReactNode)[] => {
  const segments = legacyGetWordSegments(phraseValue, ranges);

  if (segments.length === 1) {
    // words not found
    return [phraseValue];
  }

  let format = (segment: string) => segment as string | ReactNode;

  if (searchPhrase.length) {
    format = (segment: string) => {
      const activeIndex = -1; // TODO: CREAT-1041 - compute the activeIndex to make the correct search it be marked as active

      return replaceSearchWordsInPhrase(
        segment,
        searchPhrase,
        searchMatchBaseClass,
        searchMatchActiveClass,
        activeIndex
      );
    };
  }

  const result: (string | ReactNode)[] = [];
  let charCount = 0;

  for (const [key, segment] of segments.entries()) {
    if (segment.value !== '') {
      if (!segment.selectable) {
        // this is not a word match, maybe whitespace or punctuation, etc
        result.push(segment.value);
      } else {
        // this segment is a single word
        const isPopupAnchor = segment.sourceTag === selectedElementSource;

        result.push(
          <span
            key={key}
            className={wordClassName}
            data-start-index={charCount}
            data-is-word={true}
            data-source-tag={segment.sourceTag}
            {...(segment.elementId
              ? { 'data-element-id': segment.elementId }
              : {})}
            id={isPopupAnchor ? CORRECTION_POPUP_ANCHOR_ID : undefined}
          >
            {format(segment.value)}
          </span>
        );
      }
    }

    charCount += segment.value.length;
  }

  return result;
};

/**
 * returns the occurrence index for the word appearing at a given position in a piece of text
 * @param {string} text - the text to look for matches of the word
 * @param {string} word - the word we're looking for
 * @param {number} occurrenceCharIndex - the expected character index of the word in the text
 * @return {number}
 */
export const findIndexOfOccurrence = (
  text: string,
  word: string,
  occurrenceCharIndex: number
): number | null => {
  const wordRegExp = makeWordMatcher(word);

  const matches = [...text.matchAll(wordRegExp)];

  for (const [index, match] of matches.entries()) {
    const beforeMatchedWord = match[1];
    const matchedWordStartIndex = (match.index ?? 0) + beforeMatchedWord.length;

    if (matchedWordStartIndex === occurrenceCharIndex) {
      return index;
    }
  }

  return null;
};
