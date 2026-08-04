import { ThunkDispatch, createSlice, current } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import fetch from '@js/utilities/fetch';

import {
  Phrase,
  PhraseRange,
  Transcript,
  TranscriptElementIndex,
  TranscriptionCorrection,
  TranscriptMutationResult,
} from '@loomhq/shared-utilities';
import {
  REVERT_CORRECTIONS_DENIED,
  UPDATE_TRANSCRIPT_DENIED,
} from '@loomhq/shared-utilities/constants/errors';

import { correctWords, revertAll } from '../utilities/transcript/corrections';

export const CORRECTION_POPUP_ANCHOR_ID = 'correction-popup-anchor';

export type TranscriptionState = {
  correctionsEnabled: boolean;
  editedRowIndex: number;
  hoveredRowIndex: number;
  isPopupOpen: boolean;
  localCorrections: TranscriptionCorrection[];
  selectedElementSource?: string;
  selectedOccurrenceIndex: number;
  textToCorrect: string;
  transcript: Transcript;
  transcriptCorrectionMessage: string | null;
  transcriptWithLocalCorrections: Transcript;
};
const initialState: TranscriptionState = {
  correctionsEnabled: true,
  editedRowIndex: -1,
  hoveredRowIndex: -1,
  isPopupOpen: false,
  localCorrections: [],
  // @ts-expect-error ignore due to enabling strict null checks
  selectedElementSource: null,
  selectedOccurrenceIndex: -1,
  textToCorrect: '',
  // @ts-expect-error ignore due to enabling strict null checks
  transcript: null,
  transcriptCorrectionMessage: null,
  // @ts-expect-error ignore due to enabling strict null checks
  transcriptWithLocalCorrections: null,
};

const sameSource = (
  source1: TranscriptElementIndex,
  source2?: TranscriptElementIndex
) => {
  if (source1.elementId && source2?.elementId) {
    return source1.elementId === source2?.elementId;
  }

  return (
    source1.element === source2?.element &&
    source1.monologue === source2?.monologue
  );
};

const applyCorrectionToPhrase = (
  phrase: string,
  range: PhraseRange,
  newValue: string,
  rangeOffset: number
): string => {
  return (
    phrase.substr(0, range.start + rangeOffset) +
    newValue +
    phrase.substr(range.start + rangeOffset + range.length)
  );
};

const applyCorrectionToPhraseRanges = (
  ranges: PhraseRange[],
  newValue: string,
  modifiedRangeIndex: number
): PhraseRange[] => {
  const newRanges: any[] = [];

  // ranges before the modified index are kept the same
  for (let i = 0; i < modifiedRangeIndex; i++) {
    newRanges.push({ ...ranges[i] });
  }

  const nextIndex = modifiedRangeIndex + 1;

  // only keep the range for the modified word if it was not a deletion
  if (newValue.length > 0) {
    newRanges.push({
      ...ranges[modifiedRangeIndex],
      length: newValue.length,
    });
    // nextIndex = modifiedRangeIndex;
  }

  // adjust all ranges after the modified one
  const lengthDiff = newValue.length - ranges[modifiedRangeIndex].length;

  for (let i = nextIndex; i < ranges.length; i++) {
    const origRange = ranges[i];

    newRanges.push({ ...origRange, start: origRange.start + lengthDiff });
  }

  return newRanges;
};

export const applyLocalCorrections = (
  transcript: Transcript,
  localCorrections: TranscriptionCorrection[]
): Transcript => {
  const transcriptWithLocal = transcript.phrases.map(phrase => {
    let rangeOffset = 0;
    const newPhrase = { ...phrase };

    phrase.ranges?.forEach((range, rangeIdx) => {
      const correctionForRange = localCorrections.find(localCorrection => {
        return localCorrection.sources.some(source =>
          sameSource(source, range.source)
        );
      });

      if (correctionForRange) {
        const newValue = correctionForRange.newValue;

        newPhrase.value = applyCorrectionToPhrase(
          newPhrase.value,
          range,
          newValue,
          rangeOffset
        );

        newPhrase.ranges = applyCorrectionToPhraseRanges(
          // @ts-expect-error ignore due to enabling strict null checks
          newPhrase.ranges,
          newValue,
          rangeIdx
        );

        rangeOffset += newValue.length - range.length;
      }
    });

    return newPhrase;
  });

  return {
    phrases: transcriptWithLocal,
    schemaVersion: transcript.schemaVersion,
  };
};

const transcriptionSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    pushLocalCorrections(state, action) {
      state.localCorrections.push(action.payload);

      state.transcriptWithLocalCorrections = applyLocalCorrections(
        current(state.transcript),
        action.payload
      );
    },
    startLongProcess(state) {
      state.correctionsEnabled = false;
    },
    endLongProcess(state) {
      state.correctionsEnabled = true;
    },
    updateTranscriptPhrases(state, action) {
      state.transcript = action.payload;
      state.localCorrections = [];
      state.transcriptWithLocalCorrections = state.transcript;
    },
    updateTranscriptCorrectionMessage(state, action) {
      state.transcriptCorrectionMessage = action.payload;
    },
    openCorrectionPopup(state, action) {
      state.textToCorrect = action.payload.textToCorrect;
      state.selectedOccurrenceIndex = action.payload.selectedOccurrenceIndex;
      state.selectedElementSource = action.payload.selectedElementSource;
      state.editedRowIndex = action.payload.editedRowIndex;
      state.isPopupOpen = true;
    },
    updateSelectedElementSource(state, action) {
      state.selectedElementSource = action.payload.selectedElementSource;
    },
    toggleCorrectionPopup(state, action) {
      state.isPopupOpen = action.payload;
    },
    updateHoveredRowIndex(state, action) {
      state.hoveredRowIndex = action.payload;
    },
    resetTranscription(state) {
      Object.assign(state, initialState);
    },
  },
});

const getRangeText = (phrase: Phrase, range: PhraseRange): string =>
  range && phrase.value.substring(range.start, range.length + range.start);

const isSpace = (phrase: Phrase, range: PhraseRange): boolean => {
  const text = getRangeText(phrase, range);

  return range?.type === 'punct' && text === ' ';
};

const isSentenceEndPunct = (phrase: Phrase, range: PhraseRange): boolean => {
  const text = getRangeText(phrase, range);

  return range?.type === 'punct' && ['.', '!', '?'].includes(text);
};

const isComma = (phrase: Phrase, range: PhraseRange): boolean => {
  const text = getRangeText(phrase, range);

  return range?.type === 'punct' && text === ',';
};

export const addCorrectionPair = (
  correctionsMap: Record<string, TranscriptionCorrection>,
  revertMap: Record<string, TranscriptionCorrection>,
  newValue: string,
  prevValue: string,
  ...sources: TranscriptElementIndex[]
): void => {
  // this function helps ensuring anytime we add a correction we also add
  // its reverse operation

  if (sources.length === 0) {
    return;
  }

  const sourcesCopy = sources.map(s => ({ ...s }));

  // 1 - Add the delete correction:
  //     ensure there's a correction for the new value
  if (!correctionsMap[newValue]) {
    correctionsMap[newValue] = {
      newValue,
      sources: [],
    };
  }

  correctionsMap[newValue].sources.push(...sourcesCopy);

  // 2 - Add the reverse correction counterpart:
  //     ensure there's a correction for reverting to the original value if things go wrong
  if (!revertMap[prevValue]) {
    revertMap[prevValue] = {
      newValue: prevValue,
      sources: [],
    };
  }

  revertMap[prevValue].sources.push(...sourcesCopy);
};

export const getDeleteCorrections = (
  transcript: Transcript,
  originalCorrection: TranscriptionCorrection,
  originalValue: string
): {
  corrections: TranscriptionCorrection[];
  reverseCorrections: TranscriptionCorrection[];
} => {
  const correctionsMap: Record<string, TranscriptionCorrection> = {};
  const revertMap: Record<string, TranscriptionCorrection> = {};

  // add the correction for the main delete (the selected word)
  addCorrectionPair(
    correctionsMap,
    revertMap,
    '',
    originalValue,
    ...originalCorrection.sources
  );

  for (const phrase of transcript.phrases) {
    for (
      let rangeIdx = 0;
      rangeIdx < Number(phrase.ranges?.length);
      rangeIdx++
    ) {
      const range = phrase.ranges?.[rangeIdx];
      const rangeWillBeCorrected = originalCorrection.sources.some(source =>
        sameSource(source, range?.source)
      );

      if (rangeWillBeCorrected) {
        // this range is being modified by the delete, we need to go
        // inspect around it and decide what else to delete to avoid dangling
        // commas or spaces. Please refer to the unit test cases.

        const isStartOfPhrase = rangeIdx === 0;
        const spaces: PhraseRange[] = [];
        const commas: PhraseRange[] = [];
        let prevIdx = rangeIdx - 1;
        // @ts-expect-error ignore due to enabling strict null checks
        let prevRange = phrase.ranges[prevIdx];
        let nextIdx = rangeIdx + 1;
        // @ts-expect-error ignore due to enabling strict null checks
        let nextRange = phrase.ranges[nextIdx];
        const isEndOfSentence = isSentenceEndPunct(phrase, nextRange);

        // Look at what comes before the deleted word:
        // keep collecting leading commas or spaces until we find a
        // word or a sentence-ending punctuation
        while (
          prevRange &&
          (isSpace(phrase, prevRange) || isComma(phrase, prevRange))
        ) {
          if (isSpace(phrase, prevRange)) {
            spaces.unshift(prevRange);
          } else {
            commas.unshift(prevRange);
          }

          // @ts-expect-error ignore due to enabling strict null checks
          prevRange = phrase.ranges[--prevIdx];
        }

        const isStartOfSentence =
          isStartOfPhrase || isSentenceEndPunct(phrase, prevRange);

        // Now look at what comes after the deleted word
        // keep collecting trailing commas or spaces until we find a
        // word or a sentence-ending punctuation
        while (
          !isEndOfSentence &&
          nextRange &&
          (isSpace(phrase, nextRange) || isComma(phrase, nextRange))
        ) {
          if (isSpace(phrase, nextRange)) {
            spaces.push(nextRange);
          } else {
            commas.push(nextRange);
          }

          // @ts-expect-error ignore due to enabling strict null checks
          nextRange = phrase.ranges[++nextIdx];
        }

        // remove the identified spaces and commas, keeping at most one of each,
        // possibly the first
        const spacesToKeep =
          isStartOfPhrase || isEndOfSentence || spaces.length === 0 ? 0 : 1;
        const commasToKeep =
          isStartOfSentence || isEndOfSentence || commas.length === 0 ? 0 : 1;

        let spacesToRemove = spaces.slice(spacesToKeep);
        const commasToRemove = commas.slice(commasToKeep);

        // if we're keeping a comma and a space then the space needs to be after the comma
        if (spacesToKeep > 0 && commasToKeep > 0) {
          const commaElement = commas[0].source.element;

          if (spaces[0].source.element < commaElement) {
            // the first found comma happens after the first space, we need to
            // find another space after the comma
            for (const [idx, spc] of spaces.entries()) {
              if (spc.source.element > commaElement) {
                // found a space after the comma, that's the one we'll keep
                // - remove it from the array of found spaces
                spaces.splice(idx, 1);
                spacesToRemove = [...spaces];
                break;
              }
            }
          }
        }

        addCorrectionPair(
          correctionsMap,
          revertMap,
          '',
          ' ',
          ...spacesToRemove.map(rng => rng.source)
        );
        addCorrectionPair(
          correctionsMap,
          revertMap,
          '',
          ',',
          ...commasToRemove.map(rng => rng.source)
        );

        // if the next element after we removed the original and all
        // undesirable punctuation is a word, we'll capitalize it if
        // we are at the start of a sentence
        if (isStartOfSentence && nextRange?.type === 'text') {
          const nextWord = getRangeText(phrase, nextRange);
          const capitalized =
            nextWord.charAt(0).toUpperCase() + nextWord.substring(1);

          addCorrectionPair(
            correctionsMap,
            revertMap,
            capitalized,
            nextWord,
            nextRange.source
          );
        }

        const isSingleWordSentence = isStartOfSentence && isEndOfSentence;

        if (isSingleWordSentence && nextRange) {
          const finalPunct = getRangeText(phrase, nextRange);

          addCorrectionPair(
            correctionsMap,
            revertMap,
            '',
            finalPunct,
            nextRange.source
          );
        }
      }
    }
  }

  return {
    corrections: Object.values(correctionsMap),
    reverseCorrections: Object.values(revertMap),
  };
};

/**
 * Some corrections may need to be unfolded in multiple different corrections because
 * they can require adjustments to neighboring elements (e.g. dangling punctuation
 * after a word deletion)
 * @param {Transcript} transcript - the current transcript
 * @param {TranscriptionCorrection} originalCorrection - the initial correction being attempted by the user
 * @param {string} originalValue - the text that is being corrected
 * @returns {TranscriptionCorrection[]} - the actual list of corrections needed to completely perform the
 * initial correction. In ost cases it will really only contain the original correction,
 */
const computeCorrections = (
  transcript: Transcript,
  originalCorrection: TranscriptionCorrection,
  originalValue: string
): {
  corrections: TranscriptionCorrection[];
  reverseCorrections: TranscriptionCorrection[];
} => {
  if (originalCorrection.newValue === '') {
    // this is a word deletion, we need to address dangling punctuation
    return getDeleteCorrections(transcript, originalCorrection, originalValue);
  }

  return {
    corrections: [originalCorrection],
    reverseCorrections: [{ ...originalCorrection, newValue: originalValue }],
  };
};

const loadNewTranscriptVersions = async (
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  mutationResult: TranscriptMutationResult
): Promise<void> => {
  const {
    source_url: newTranscriptionUrl,
    captions_source_url: newCaptionsUrl,
  } = mutationResult;

  // pull the newest versions of transcript from CDN
  const transcriptJson = await fetch(newTranscriptionUrl);

  if (!transcriptJson?.ok) {
    throw new Error('Failed to fetch transcript json');
  }

  const updatedTranscript = await transcriptJson.json();

  // overwrite local transcript with the new CDN version + clear out any local corrections
  dispatch(updateTranscriptPhrases(updatedTranscript));
};

export const applyLocalCorrection =
  (
    videoId: string,
    originalValue: string,
    transcriptCorrection: TranscriptionCorrection,
    password: string
  ): ThunkAction<void, unknown, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const transcript = (getState() as any).transcription
      .transcript as Transcript;

    // Determine the final list of corrections necessary along with their reverse versions
    const { corrections: transcriptCorrections, reverseCorrections } =
      computeCorrections(transcript, transcriptCorrection, originalValue);
    const correction = {
      videoId,
      transcriptCorrections,
    };

    // 1: apply local corrections so the user can see them immediately
    dispatch(
      transcriptionSlice.actions.pushLocalCorrections(
        correction.transcriptCorrections
      )
    );

    // 2: push the corrections to our updateVideoTranscript endpoint
    const mutationResult = await correctWords(correction, password);

    if (mutationResult?.message) {
      // something went wrong and we could not persist the corrections.
      // we need to warn the user and undo the local changes pushed above.
      dispatch(
        updateTranscriptCorrectionMessage(
          mutationResult.message.replace(`${UPDATE_TRANSCRIPT_DENIED}: `, '')
        )
      );
      dispatch(
        transcriptionSlice.actions.pushLocalCorrections(reverseCorrections)
      );

      return;
    }

    // 3: use the returned versions of the transcript and captions
    // @ts-expect-error ignore due to enabling strict null checks
    await loadNewTranscriptVersions(dispatch, mutationResult);
  };

export const revertAllCorrections =
  (videoId: string): ThunkAction<void, unknown, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const state = getState() as any;
    const password = (state.share_video.password || '') as string;

    // 1: disable further corrections until we're done
    dispatch(transcriptionSlice.actions.startLongProcess());

    try {
      // 2: revert all the changes
      const mutationResult = await revertAll(videoId, password);

      if (mutationResult?.message) {
        // something went wrong and we could not perform the revert,
        // we need to warn the user
        dispatch(
          updateTranscriptCorrectionMessage(
            mutationResult.message.replace(`${REVERT_CORRECTIONS_DENIED}: `, '')
          )
        );

        return;
      }

      // 3: use the returned versions of the transcript and captions
      // @ts-expect-error ignore due to enabling strict null checks
      await loadNewTranscriptVersions(dispatch, mutationResult);
      dispatch(
        updateTranscriptCorrectionMessage('All changes have been undone')
      );
    } catch (err) {
      dispatch(updateTranscriptCorrectionMessage('Could not undo changes'));
      throw err;
    } finally {
      // 4: enable corrections again
      dispatch(transcriptionSlice.actions.endLongProcess());
    }
  };

export const {
  openCorrectionPopup,
  toggleCorrectionPopup,
  updateHoveredRowIndex,
  updateTranscriptCorrectionMessage,
  updateTranscriptPhrases,
  resetTranscription,
  updateSelectedElementSource,
} = transcriptionSlice.actions;

// eslint-disable-next-line import/no-default-export
export default transcriptionSlice.reducer;
