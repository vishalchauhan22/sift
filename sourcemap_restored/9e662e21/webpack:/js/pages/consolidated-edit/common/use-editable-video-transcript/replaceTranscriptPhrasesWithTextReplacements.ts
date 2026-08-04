import { AiGeneratedToken, Token, TranscriptPhrase } from '../types';

import { ConsolidatedEditTextReplacementFragment } from '../use-video-text-replacements/ConsolidatedEditGetVideoTextReplacements.generated';

/**
 * Helper function to find the nearest timestamped token in a direction
 */
const findNearestTimestampedToken = ({
  phrases,
  phraseIndex,
  tokenIndex,
  direction,
}: {
  phrases: TranscriptPhrase[];
  phraseIndex: number;
  tokenIndex: number;
  direction: 'prev' | 'next';
}): Token | null => {
  let phraseIndexCursor = phraseIndex;
  let tokenIndexCursor = direction === 'prev' ? tokenIndex - 1 : tokenIndex + 1;

  while (phraseIndexCursor >= 0 && phraseIndexCursor < phrases.length) {
    const phrase = phrases[phraseIndexCursor];

    while (tokenIndexCursor >= 0 && tokenIndexCursor < phrase.tokens.length) {
      const token = phrase.tokens[tokenIndexCursor];
      if ('start' in token) {
        return token;
      }
      tokenIndexCursor += direction === 'prev' ? -1 : 1;
    }

    phraseIndexCursor += direction === 'prev' ? -1 : 1;
    if (phraseIndexCursor >= 0 && phraseIndexCursor < phrases.length) {
      tokenIndexCursor =
        direction === 'prev' ? phrases[phraseIndexCursor].tokens.length - 1 : 0;
    }
  }
  return null;
};

/**
 * Given a list of phrases and a time range, returns all tokens that fall within that range
 * and their combined text value.
 */
const getTokensInRange = (
  phrases: TranscriptPhrase[],
  startMs: number,
  endMs: number
): { tokens: Token[]; originalText: string } => {
  const tokens: Token[] = [];
  let originalText = '';

  // First, collect all timestamped tokens that fall within the range
  const timestampedTokensInRange: Token[] = [];
  for (let phraseIndex = 0; phraseIndex < phrases.length; phraseIndex++) {
    const phrase = phrases[phraseIndex];
    for (let tokenIndex = 0; tokenIndex < phrase.tokens.length; tokenIndex++) {
      const token = phrase.tokens[tokenIndex];
      if ('start' in token && token.start >= startMs && token.end <= endMs) {
        timestampedTokensInRange.push(token);
      }
    }
  }

  // If no timestamped tokens found, return empty result
  if (timestampedTokensInRange.length === 0) {
    return { tokens, originalText };
  }

  // Now collect tokens in order, including punctuation between timestamped tokens in range
  let lastPhraseIndex = -1;

  for (let phraseIndex = 0; phraseIndex < phrases.length; phraseIndex++) {
    const phrase = phrases[phraseIndex];

    for (let tokenIndex = 0; tokenIndex < phrase.tokens.length; tokenIndex++) {
      const token = phrase.tokens[tokenIndex];

      if ('start' in token) {
        // For timestamped tokens, only include if they're in our range
        if (timestampedTokensInRange.includes(token)) {
          // Add a space if we're crossing a phrase boundary
          if (lastPhraseIndex !== -1 && lastPhraseIndex !== phraseIndex) {
            originalText += ' ';
          }
          tokens.push(token);
          if ('value' in token) {
            originalText += token.value;
          }
          lastPhraseIndex = phraseIndex;
        }
      } else {
        // For punctuation tokens, find the nearest timestamped tokens on both sides
        const prevTimestampedToken = findNearestTimestampedToken({
          phrases,
          phraseIndex,
          tokenIndex,
          direction: 'prev',
        });
        const nextTimestampedToken = findNearestTimestampedToken({
          phrases,
          phraseIndex,
          tokenIndex,
          direction: 'next',
        });

        const isPrevTokenInRange =
          prevTimestampedToken &&
          timestampedTokensInRange.includes(prevTimestampedToken);
        const isNextTokenInRange =
          nextTimestampedToken &&
          timestampedTokensInRange.includes(nextTimestampedToken);

        // Include punctuation if it's between two timestamped tokens that are both in our range
        if (isPrevTokenInRange && isNextTokenInRange) {
          tokens.push(token);
          if ('value' in token) {
            originalText += token.value;
          }
        }
      }
    }
  }

  return { tokens, originalText };
};

/**
 * Given the processed transcript phrases, and the video text replacements,
 * this function will replace the tokens that fall within the selection range
 * of any replacements, with a new token that contains the replacement text.
 */
export const replaceTranscriptPhrasesWithTextReplacements = ({
  videoTextReplacements,
  transcriptPhrases,
}: {
  videoTextReplacements: ConsolidatedEditTextReplacementFragment[];
  transcriptPhrases: TranscriptPhrase[];
}): TranscriptPhrase[] => {
  if (videoTextReplacements.length === 0) {
    return transcriptPhrases;
  }

  // First, collect all tokens that need to be replaced
  const tokensToReplace = new Map<string, AiGeneratedToken>();

  // Validate replacements and sort by start time to handle overlapping replacements
  const sortedReplacements = [...videoTextReplacements].sort(
    (a, b) => a.selectionLowerMs - b.selectionLowerMs
  );

  for (const replacement of sortedReplacements) {
    // Skip invalid replacements
    if (replacement.selectionLowerMs >= replacement.selectionUpperMs) {
      continue;
    }

    const { tokens, originalText } = getTokensInRange(
      transcriptPhrases,
      replacement.selectionLowerMs,
      replacement.selectionUpperMs
    );

    // Skip this replacement if no tokens were found
    if (tokens.length === 0) {
      continue;
    }

    // Skip this replacement if any of its tokens have already been replaced
    if (tokens.some(token => tokensToReplace.has(token.key))) {
      continue;
    }

    // Create the AI generated token
    const aiGeneratedToken: AiGeneratedToken = {
      type: 'ai-generated',
      // Use the first token's key, clipId, phraseIndex, and tokenIndex
      key: tokens[0].key,
      clipId: tokens[0].clipId,
      phraseIndex: tokens[0].phraseIndex,
      tokenIndex: tokens[0].tokenIndex,

      videoTextReplacementId: replacement.id,
      start: replacement.selectionLowerMs,
      end: replacement.selectionUpperMs,
      value: replacement.selectionReplacementText,
      originalValue: originalText,
      audioGenerationStatus: replacement.audioGenerationStatus,
    };

    // Mark all tokens for replacement
    tokens.forEach(token => {
      tokensToReplace.set(token.key, aiGeneratedToken);
    });
  }

  // Then, process each phrase and apply the replacements
  const appliedReplacements = new Map<string, number>(); // Map of replacement key to end time

  return transcriptPhrases
    .map(phrase => {
      const newTokens: Token[] = [];

      for (const token of phrase.tokens) {
        const replacementToken = tokensToReplace.get(token.key);

        if (replacementToken) {
          // Only apply the replacement if we haven't seen it before
          const replacementKey = `${replacementToken.start}:${replacementToken.end}`;
          if (!appliedReplacements.has(replacementKey)) {
            newTokens.push(replacementToken);
            appliedReplacements.set(replacementKey, replacementToken.end);
          }
        } else {
          newTokens.push(token);
        }
      }

      // If we have tokens, use the first one's timestamp
      let phraseStartTime = phrase.start;
      if (newTokens.length > 0) {
        const firstTokenWithTimestamp = newTokens.find(
          token => 'start' in token
        );
        if (firstTokenWithTimestamp && 'start' in firstTokenWithTimestamp) {
          phraseStartTime = firstTokenWithTimestamp.start;
        }
      }

      return {
        ...phrase,
        start: phraseStartTime,
        tokens: newTokens,
        tokenKeys: new Set(newTokens.map(t => t.key)),
      };
    })
    .filter(phrase => phrase.tokens.length > 0); // Remove phrases with no tokens
};
