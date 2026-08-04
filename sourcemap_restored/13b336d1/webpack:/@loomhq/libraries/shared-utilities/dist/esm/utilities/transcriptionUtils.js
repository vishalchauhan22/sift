import "../chunk-BYZ2GIR3.js";
import flatten from "lodash/flatten";
import keyBy from "lodash/keyBy";
import {
  TRANSCRIPTION_UNFINISHED_STATUSES,
  TRANSCRIPTION_TERMINAL_STATUSES,
  TRANSCRIPTION_STATUSES_CONTAINING_TRANSCRIPTS,
  TRANSCRIPTION_UNSUCCESSFUL_STATUSES
} from "../constants/videoTranscript";
import {
  Language
} from "../types/transcription";
const isNewTranscriptArchitecture = (transcript) => {
  var _a, _b, _c, _d;
  return Boolean((_d = (_c = (_b = (_a = transcript == null ? void 0 : transcript.phrases) == null ? void 0 : _a[0]) == null ? void 0 : _b.ranges) == null ? void 0 : _c[0]) == null ? void 0 : _d.source.elementId);
};
const isTranscriptLanguageEnglish = (language) => language === Language.EN || language === Language.UNKNOWN || language === null;
const findPhraseIndex = (target, phrases) => {
  const len = phrases.length;
  if (target >= phrases[phrases.length - 1].ts) {
    return phrases.length - 1;
  }
  let low = 0;
  let high = len - 1;
  while (low <= high) {
    const mid = low + (high - low) / 2 | 0;
    if (phrases[mid].ts < target) {
      low = mid + 1;
    } else if (phrases[mid].ts > target) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  if (high < 0) {
    return 0;
  } else if (low > len - 1) {
    return len;
  }
  return low < high ? low : high;
};
const findTranscriptSourceIndexes = (phrases, word) => {
  var _a;
  const wordRegExp = makeWordMatcher(word);
  const indexesPerPhrase = new Array(phrases.length);
  for (const [phraseIndex, phrase] of phrases.entries()) {
    const matches = [...phrase.value.matchAll(wordRegExp)];
    indexesPerPhrase[phraseIndex] = new Array(
      matches.length
    );
    const phraseSources = indexesPerPhrase[phraseIndex];
    if (matches.length > 0) {
      const rangesByStartIndex = keyBy(phrase.ranges, "start");
      for (const [index, match] of matches.entries()) {
        const beforeMatchedWord = match[1];
        const startIndex = ((_a = match.index) != null ? _a : 0) + beforeMatchedWord.length;
        phraseSources[index] = rangesByStartIndex[startIndex.toString()].source;
      }
    }
  }
  return flatten(indexesPerPhrase);
};
const escapeSpecialChars = (str) => {
  const specials = /[.*+?|()[\]{}\\$^]/g;
  return str.replace(specials, "\\$&");
};
const makeWordMatcher = (word) => new RegExp(
  "(\\b|^|\\s)(".concat(escapeSpecialChars(word), ")(\\b|\\s|\\.|,|\\?|!|;|:|$)"),
  "gi"
);
const singleWordRegExp = new RegExp("^(?:\\p{L}+|\\d+)((?:[\\p{L}\\d'-]*\\d*%?)|(?:(?:\\.\\w+)*\\.*\\w*))*$", "gu");
const asteriskRegExp = /\*/;
const isValidSingleWordForCorrection = (word) => {
  if (!word) {
    return false;
  }
  const isRedactedProfanity = word.match(asteriskRegExp);
  return Boolean(word.match(singleWordRegExp) || isRedactedProfanity);
};
const makeStatusCheckFunction = (statuses) => {
  const statusMap = Object.values(statuses).reduce((acc, status) => {
    acc[status] = true;
    return acc;
  }, {});
  return (status) => {
    return Boolean(status && statusMap[status]);
  };
};
const isTerminalTranscriptionStatus = makeStatusCheckFunction(
  TRANSCRIPTION_TERMINAL_STATUSES
);
const isUnfinishedTranscriptionStatus = makeStatusCheckFunction(
  TRANSCRIPTION_UNFINISHED_STATUSES
);
const isTranscriptionStatusContainingTranscript = makeStatusCheckFunction(TRANSCRIPTION_STATUSES_CONTAINING_TRANSCRIPTS);
const isUnsuccessfulTranscriptionStatus = makeStatusCheckFunction(
  TRANSCRIPTION_UNSUCCESSFUL_STATUSES
);
const isOnlyWhitespace = (input) => {
  return /^\s*$/.test(input);
};
export {
  escapeSpecialChars,
  findPhraseIndex,
  findTranscriptSourceIndexes,
  isNewTranscriptArchitecture,
  isOnlyWhitespace,
  isTerminalTranscriptionStatus,
  isTranscriptLanguageEnglish,
  isTranscriptionStatusContainingTranscript,
  isUnfinishedTranscriptionStatus,
  isUnsuccessfulTranscriptionStatus,
  isValidSingleWordForCorrection,
  makeWordMatcher
};
//# sourceMappingURL=transcriptionUtils.js.map
