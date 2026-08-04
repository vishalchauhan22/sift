import { PreviewRange } from '@js/pages/consolidated-edit/transcript-editor/common';
import { getWordWithoutPossessive } from '@js/pages/edit-video/common/getWordWithoutPossessive';
import {
  isTokenSelected,
  makeKey,
} from '@js/pages/edit-video/page/transcript-editor/common/helpers';
import {
  DecoratedToken,
  TokenDict,
} from '@js/pages/edit-video/page/transcript-editor/common/types';

import { TimestampedToken, TrimRange } from '@loomhq/shared-utilities';
import { WordLevelTimestampTranscript } from '@loomhq/shared-utilities/types/transcription';

import { VariableKey } from '../state/common/types';

import { isTimestampInRange } from './isTimestampInRange';

export const MAX_SUGGESTIONS = 3;

export type SuggestionObject = { suggestion: string; index: number };

const CAPITAL_LETTER_REGEX = /^[A-Z]/;
const MIN_WORD_LENGTH = 3;

export const findSuggestedVariables = (
  transcript: WordLevelTimestampTranscript
): SuggestionObject[] => {
  let isNewSentence = true;
  let tokenIndex = 0;
  const suggestions: SuggestionObject[] = [];
  const capitalizedWords = new Set<string>();

  for (const phrase of transcript.phrases) {
    for (const token of phrase.tokens) {
      if (token.type === 'punct' && ['?', '!', '.'].includes(token.value)) {
        isNewSentence = true;
      } else if (token.type === 'text') {
        const word = getWordWithoutPossessive(token.value);

        // We want to find capitalized words that are not at the beginning of a sentence
        // We use MIN_WORD_LENGTH to avoid suggesting single letter words like "I"
        if (
          !isNewSentence &&
          token.value.match(CAPITAL_LETTER_REGEX) &&
          token.value.length > MIN_WORD_LENGTH &&
          suggestions.length < MAX_SUGGESTIONS &&
          !capitalizedWords.has(word)
        ) {
          suggestions.push({
            suggestion: word,
            index: tokenIndex,
          });
          capitalizedWords.add(word);
        }

        isNewSentence = false;
      }

      if (suggestions.length >= MAX_SUGGESTIONS) {
        return suggestions;
      }

      tokenIndex++;
    }
  }

  return suggestions;
};

export const getTimestampsInSecondsForVariableKeys = ({
  variableKeys,
  tokenKeyToIndex,
  tokensArray,
}: {
  variableKeys: VariableKey[];
  tokenKeyToIndex: Record<string, number>;
  tokensArray: DecoratedToken[];
}): {
  startTsInSecs: number;
  endTsInSecs: number;
}[] => {
  return variableKeys.map(variableKey => {
    const indexForStart = tokenKeyToIndex[variableKey.startKey];
    const indexForEnd = tokenKeyToIndex[variableKey.endKey];
    let tokenForStart = tokensArray[indexForStart];
    let tokenForEnd = tokensArray[indexForEnd];

    if (tokenForStart.start === undefined || tokenForStart.start === null) {
      let newIndexForStart = indexForStart;

      while (
        (tokenForStart.start === undefined || tokenForStart.start === null) &&
        newIndexForStart < tokensArray.length
      ) {
        tokenForStart = tokensArray[newIndexForStart];
        newIndexForStart++;
      }
    }

    if (tokenForEnd.end === undefined || tokenForEnd.end === null) {
      let newIndexForEnd = indexForEnd;

      while (
        (tokenForEnd.end === undefined || tokenForEnd.end === null) &&
        newIndexForEnd >= 0
      ) {
        tokenForEnd = tokensArray[newIndexForEnd];
        newIndexForEnd--;
      }
    }

    if (
      tokenForStart.start === undefined ||
      tokenForEnd.end === undefined ||
      tokenForStart.start === null ||
      tokenForEnd.end === null
    ) {
      throw new Error('Could not find start or end token');
    }

    return {
      startTsInSecs: tokenForStart.start,
      endTsInSecs: tokenForEnd.end,
    };
  });
};

export const getVariableKeysFromTimestampsInSeconds = ({
  startInSeconds,
  endInSeconds,
  tokensArray,
}: {
  startInSeconds: number;
  endInSeconds: number;
  tokensArray: DecoratedToken[];
}): VariableKey => {
  const startToken = tokensArray.find(token => token.start === startInSeconds);

  const startTokenKey = startToken ? startToken.key : null;

  if (!startTokenKey) {
    throw new Error('Could not find start token key');
  }

  const tokensInRange = [startTokenKey];
  let endTokenKey = startTokenKey;

  if (startToken && endInSeconds !== startToken.end) {
    const endToken = tokensArray.find(token => token.end === endInSeconds);
    const potentialEndTokenKey = endToken?.key;

    if (potentialEndTokenKey) {
      endTokenKey = potentialEndTokenKey;
      let index = startToken.index + 1;

      while (index <= endToken.index) {
        tokensInRange.push(tokensArray[index].key);
        index++;
      }
    }
  }

  return {
    startKey: startTokenKey,
    endKey: endTokenKey,
    keysInRange: tokensInRange,
  };
};

export const cleanTranscriptWord = (word: string): string => {
  const newWord: string = word
    .replace(/[“”"()]/g, '') // Remove quotes and parentheses
    .replace(/\.{2,}/g, '') // Remove ellipses
    .replace(/[^a-zA-Z0-9-']+$/, '') // Remove non-alphanumeric except hyphen and apostrophe
    .replace(/(?<=\w)-$/, '') // Remove trailing hyphen if preceded by a word character
    .toLowerCase(); // Convert to lowercase

  return getWordWithoutPossessive(newWord);
};

export const buildVariablesInitialData = ({
  transcript,
  clipPosition,
}: {
  transcript: WordLevelTimestampTranscript;
  clipPosition: number;
}): {
  transcriptTokens: TokenDict;
  tokenKeyToIndex: Record<string, number>;
  tokensArray: DecoratedToken[];
  wordToTokens: Map<string, DecoratedToken[]>;
  indexToTokenKey: string[];
} => {
  const transcriptTokens: TokenDict = {};
  const tokenKeyToIndex: Record<string, number> = {};
  const tokensArray: DecoratedToken[] = [];
  const indexToTokenKey: string[] = [];

  let overallTokenIndex = 0;
  const wordToTokens: Map<string, DecoratedToken[]> = new Map<
    string,
    DecoratedToken[]
  >();

  transcript.phrases.forEach((phrase, phraseIndex) => {
    phrase.tokens.forEach((token, tokenIndex) => {
      const key = makeKey(clipPosition, phraseIndex, tokenIndex);

      transcriptTokens[key] = token;
      tokenKeyToIndex[key] = tokensArray.length;
      const decoratedToken = { ...token, key, index: overallTokenIndex };

      tokensArray.push(decoratedToken);
      indexToTokenKey.push(key);
      overallTokenIndex++;

      const cleanWord = cleanTranscriptWord(token.value);

      const existentTokens = wordToTokens.get(cleanWord);
      if (existentTokens === undefined) {
        wordToTokens.set(cleanWord, [decoratedToken]);
      } else {
        wordToTokens.set(cleanWord, [...existentTokens, decoratedToken]);
      }
    });
  });

  return {
    transcriptTokens,
    tokenKeyToIndex,
    tokensArray,
    wordToTokens,
    indexToTokenKey,
  };
};

export const getHasDeletedTokenWithinTokenKeys = ({
  deletedTokens,
  tokenKeyToIndex,
  startTokenKey,
  endTokenKey,
}: {
  deletedTokens: TokenDict;
  tokenKeyToIndex: Record<string, number>;
  startTokenKey: string;
  endTokenKey: string;
}): boolean => {
  let hasDeletedToken = false;

  Object.keys(deletedTokens).forEach(tokenKey => {
    const tokenIndex = tokenKeyToIndex[tokenKey];

    const startTokenIndex = tokenKeyToIndex[startTokenKey];
    const endTokenIndex = tokenKeyToIndex[endTokenKey];

    if (isTokenSelected(tokenIndex, startTokenIndex, endTokenIndex)) {
      hasDeletedToken = true;
    }
  });

  return hasDeletedToken;
};

function findFirstTokenThatStartsAtOrAfter(
  tokens: TimestampedToken[],
  time: number
): TimestampedToken | undefined {
  let left = 0;
  let right = tokens.length - 1;
  let result: TimestampedToken | undefined;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (tokens[mid].start! * 1000 >= time) {
      result = tokens[mid];
      right = mid - 1; // Look for a smaller start time that still satisfies the condition
    } else {
      left = mid + 1;
    }
  }
  return result;
}

function findLastTokenThatEndsAtOrBefore(
  tokens: TimestampedToken[],
  time: number
): TimestampedToken | undefined {
  let left = 0;
  let right = tokens.length - 1;
  let result: TimestampedToken | undefined;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (tokens[mid].end! * 1000 <= time) {
      result = tokens[mid];
      left = mid + 1; // Look for a larger end time that still satisfies the condition
    } else {
      right = mid - 1;
    }
  }
  return result;
}

export const getPreviewRangesWithoutTrimRangesOverlap = (
  previewRanges: PreviewRange[],
  trimRanges: TrimRange[],
  tokensArray: TimestampedToken[]
): PreviewRange[] => {
  if (trimRanges.length === 0 || previewRanges.length === 0) {
    return previewRanges;
  }

  // Only consider text tokens (tokens that have a start and end)
  const textTokensAscending = tokensArray.filter(
    token =>
      token.type === 'text' &&
      typeof token.start === 'number' &&
      typeof token.end === 'number'
  );

  textTokensAscending.sort((a, b) => a.start! - b.start!);

  const updatedPreviewRanges: PreviewRange[] = [];

  // Sort trimRanges to allow for efficient traversal
  const trimRangesAscending = [...trimRanges];

  trimRangesAscending.sort((a, b) => a.from - b.from);

  previewRanges.forEach(range => {
    const updatedPreviewRange = { ...range };

    for (const trimRange of trimRangesAscending) {
      // Note: trimRange is in milliseconds and updatedRange is in seconds
      if (trimRange.from > updatedPreviewRange.end * 1000) {
        // No need to check further trim ranges
        break;
      }

      const isStartWithinTrimRange = isTimestampInRange({
        targetTimeInSeconds: updatedPreviewRange.start,
        startRangeInMilliseconds: trimRange.from,
        endRangeInMilliseconds: trimRange.to,
      });

      const isEndWithinTrimRange = isTimestampInRange({
        targetTimeInSeconds: updatedPreviewRange.end,
        startRangeInMilliseconds: trimRange.from,
        endRangeInMilliseconds: trimRange.to,
        isEndBoundaryInclusive: true,
      });

      if (isStartWithinTrimRange && isEndWithinTrimRange) {
        throw new Error(
          'Cannot have a preview range that is entirely within a trim range'
        );
      }

      if (isStartWithinTrimRange) {
        const validToken = findFirstTokenThatStartsAtOrAfter(
          textTokensAscending,
          trimRange.to
        );

        if (validToken && validToken.start) {
          updatedPreviewRange.start = validToken.start;
        }
      } else if (isEndWithinTrimRange) {
        const validToken = findLastTokenThatEndsAtOrBefore(
          textTokensAscending,
          trimRange.from
        );

        if (validToken && validToken.end) {
          updatedPreviewRange.end = validToken.end;
        }
      }
    }

    if (updatedPreviewRange.start >= updatedPreviewRange.end) {
      throw new Error('Range start must always be less than range end');
    }

    updatedPreviewRanges.push(updatedPreviewRange);
  });

  return updatedPreviewRanges;
};
