import fetch from '@js/utilities/fetch';
import {
  removeAllCorrections,
  createCorrections,
  type CorrectionCreationResult,
} from '@js/utilities/transcript/corrections';
import {
  findIndicesOfSearchPhraseInPhrases,
  type WordSegment,
} from '@js/utilities/transcript/findSearchWordInTranscript';
import { RetranscriptionStatus } from '@js/utilities/transcript/statuses';
import create from 'zustand';

import {
  Phrase,
  Transcript,
  TranscriptionCorrection,
} from '@loomhq/shared-utilities';
import {
  REVERT_CORRECTIONS_DENIED,
  UPDATE_TRANSCRIPT_DENIED,
} from '@loomhq/shared-utilities/constants/errors';
import {
  VideoTranscriptDetails,
  type CreateTranscriptCorrectionsNewCorrectionV2Input,
  CorrectionEditType,
  CorrectionPositionType,
} from '@js/globalTypes.generated';

type PanelMode = 'view' | 'correction';

export type PhraseIndex = {
  index: number;
  counter: number;
};

export type TranscriptDetails = Pick<
  VideoTranscriptDetails,
  | 'createdAt'
  | 'id'
  | 'language'
  | 'transcription_status'
  | 'processing_service'
  | 'processing_end_time'
  | 'processing_start_time'
  | 's3_id'
  | 'source_url'
  | 'transcript_url'
  | 'updatedAt'
  | 'video_id'
  | 'version'
>;

type TranscriptStateAttributes = {
  transcript: Transcript | null;
  panelMode: PanelMode;
  isCorrectMode: boolean;
  isProcessingCorrections: boolean;
  isSearchOpen: boolean;
  isCorrectionsPopupOpen: boolean;
  selectedPhraseIndex: number | null;
  message: string | null;
  searchPhrase: string;
  searchPhraseIndexes: PhraseIndex[] | null;
  selectedPhraseIndexInCorrectMode: number | null;
  currentPhraseSearchIndex: number;
  localCorrections: TranscriptionCorrection[];
  retranscriptionStatus: RetranscriptionStatus;
  selectedWordSegments: WordSegment[] | null;
};

type TranscriptStateActions = {
  enableCorrectionMode: VoidFunction;
  enableViewMode: VoidFunction;
  openSearch: VoidFunction;
  openCorrectionsPopup: (data: {
    wordSegments: WordSegment[];
    phraseIndex: number;
  }) => void;
  closeCorrectionsPopup: VoidFunction;
  closeSearch: VoidFunction;
  setSelectedPhraseIndex: (index: number) => void;
  startProcessingCorrections: VoidFunction;
  endProcessingCorrections: VoidFunction;
  setMessage: (message: string | null) => void;
  setSearchPhrase: (phrase: string) => void;
  setTranscript: (transcript: Transcript) => void;
  incrementPhraseSearchIndex: VoidFunction;
  decrementPhraseSearchIndex: VoidFunction;
  getCurrentPhraseSearchIndex: () => PhraseIndex | null;
  setRetranscriptionStatus: (status: RetranscriptionStatus) => void;
  resetTranscription: VoidFunction;
  revertAllCorrections: (videoId: string) => Promise<void>;
  saveCorrections: (
    videoId: string,
    value: string,
    clipId: string | null,
    elementIds: string[],
    position: CorrectionPositionType
  ) => Promise<void>;
  saveCorrectionsAll: (
    videoId: string,
    corrections: CreateTranscriptCorrectionsNewCorrectionV2Input[]
  ) => Promise<void>;
  deleteCorrections: (
    videoId: string,
    clipId: string | null,
    elementIds: string[]
  ) => Promise<void>;
};

const initialState: TranscriptStateAttributes = {
  currentPhraseSearchIndex: 0,
  isCorrectMode: false,
  isCorrectionsPopupOpen: false,
  isProcessingCorrections: false,
  isSearchOpen: false,
  localCorrections: [],
  message: null,
  panelMode: 'view',
  retranscriptionStatus: RetranscriptionStatus.NOT_STARTED,
  searchPhrase: '',
  searchPhraseIndexes: null,
  selectedPhraseIndex: null,
  selectedPhraseIndexInCorrectMode: null,
  selectedWordSegments: null,
  transcript: null,
};

const findSearchPhrases = (searchPhrase: string, phrases?: Phrase[] | null) => {
  const searchPhraseIndexes: PhraseIndex[] | null =
    phrases?.length && phrases.length > 0 && searchPhrase.length > 0
      ? findIndicesOfSearchPhraseInPhrases(searchPhrase, phrases)
      : null;
  const currentPhraseSearchIndex: number = searchPhraseIndexes?.length ? 1 : 0;

  return { searchPhraseIndexes, currentPhraseSearchIndex };
};

const loadNewTranscriptVersions = async (
  mutationResult: CorrectionCreationResult | null
): Promise<void> => {
  if (!mutationResult) {
    return;
  }

  const { setTranscript } = useTranscriptStore.getState();
  const { phrasesUrl: newTranscriptionUrl } = mutationResult;

  // pull the newest versions of transcript from CDN
  const transcriptJson = await fetch(newTranscriptionUrl);

  if (!transcriptJson?.ok) {
    throw new Error('Failed to fetch transcript json');
  }

  const updatedTranscript = await transcriptJson.json();

  // overwrite local transcript with the new CDN version + clear out any local corrections
  setTranscript(updatedTranscript);
};

const saveCorrections = async (
  videoId: string,
  corrections: CreateTranscriptCorrectionsNewCorrectionV2Input[]
): Promise<void> => {
  const { startProcessingCorrections, endProcessingCorrections, setMessage } =
    useTranscriptStore.getState();

  startProcessingCorrections();

  try {
    const phraseMutationResult = await createCorrections(videoId, corrections);

    if (!phraseMutationResult || phraseMutationResult?.message) {
      setMessage(
        phraseMutationResult?.message?.replace(
          `${UPDATE_TRANSCRIPT_DENIED}: `,
          ''
        ) ?? 'Could not save corrections'
      );
      return;
    }

    await loadNewTranscriptVersions(phraseMutationResult);
  } catch {
    setMessage('Could not save corrections');
  } finally {
    endProcessingCorrections();
  }
};

export const useTranscriptStore = create<
  TranscriptStateAttributes & TranscriptStateActions
>(set => ({
  ...initialState,
  closeCorrectionsPopup: () =>
    set({
      selectedWordSegments: null,
      selectedPhraseIndexInCorrectMode: null,
      isCorrectionsPopupOpen: false,
    }),
  closeSearch: () => {
    set({ isSearchOpen: false, searchPhrase: '' });
  },
  decrementPhraseSearchIndex: () =>
    set(state => {
      const { currentPhraseSearchIndex, searchPhraseIndexes } = state;
      const newIndex =
        currentPhraseSearchIndex > 1
          ? currentPhraseSearchIndex - 1
          : searchPhraseIndexes?.length || 0;

      return { currentPhraseSearchIndex: newIndex };
    }),
  deleteCorrections: async (videoId, clipId, elementIds) => {
    const { startProcessingCorrections, endProcessingCorrections } =
      useTranscriptStore.getState();
    startProcessingCorrections();

    try {
      await saveCorrections(videoId, [
        {
          clipId,
          elementIds,
          correctionType: CorrectionEditType.Remove,
        },
      ]);
    } catch {
      set({ message: 'Could not save corrections' });
    } finally {
      endProcessingCorrections();
    }
  },
  enableCorrectionMode: () =>
    set({ panelMode: 'correction', isCorrectMode: true }),
  enableViewMode: () => set({ panelMode: 'view', isCorrectMode: false }),
  endProcessingCorrections: () => set({ isProcessingCorrections: false }),
  getCurrentPhraseSearchIndex: () => {
    const { currentPhraseSearchIndex, searchPhraseIndexes } =
      useTranscriptStore.getState();
    return searchPhraseIndexes?.[currentPhraseSearchIndex - 1];
  },
  incrementPhraseSearchIndex: () =>
    set(state => {
      const { currentPhraseSearchIndex, searchPhraseIndexes } = state;
      const newIndex =
        currentPhraseSearchIndex < (searchPhraseIndexes?.length || 0)
          ? currentPhraseSearchIndex + 1
          : 1;

      return { currentPhraseSearchIndex: newIndex };
    }),
  openCorrectionsPopup: ({ wordSegments, phraseIndex }) =>
    set({
      isCorrectionsPopupOpen: true,
      selectedWordSegments: wordSegments,
      selectedPhraseIndexInCorrectMode: phraseIndex,
    }),
  openSearch: () => set({ isSearchOpen: true }),
  resetTranscription: () => set({ ...initialState }),
  revertAllCorrections: async (videoId: string) => {
    const { startProcessingCorrections, endProcessingCorrections, setMessage } =
      useTranscriptStore.getState();

    startProcessingCorrections();

    try {
      const mutationResult = await removeAllCorrections(videoId);

      if (mutationResult?.message) {
        setMessage(
          mutationResult.message.replace(`${REVERT_CORRECTIONS_DENIED}: `, '')
        );
        return;
      }

      await loadNewTranscriptVersions({
        version: String(mutationResult?.version),
        phrasesUrl: mutationResult!.source_url,
        captionsUrl: mutationResult!.captions_source_url,
      });
      setMessage('All changes have been undone');
    } catch (err) {
      setMessage('Could not undo changes');
      throw err;
    } finally {
      endProcessingCorrections();
    }
  },
  saveCorrections: async (
    videoId,
    newContent,
    clipId,
    elementIds,
    position
  ) => {
    const { startProcessingCorrections, endProcessingCorrections } =
      useTranscriptStore.getState();
    startProcessingCorrections();

    try {
      await saveCorrections(videoId, [
        {
          position,
          elementIds,
          newContent,
          clipId,
          correctionType: CorrectionEditType.Replace,
        },
      ]);
    } catch {
      set({ message: 'Could not save corrections' });
    } finally {
      endProcessingCorrections();
    }
  },
  saveCorrectionsAll: async (videoId, corrections) => {
    const { startProcessingCorrections, endProcessingCorrections } =
      useTranscriptStore.getState();
    startProcessingCorrections();

    try {
      await saveCorrections(videoId, corrections);
    } catch {
      set({ message: 'Could not save corrections' });
    } finally {
      endProcessingCorrections();
    }
  },
  setMessage: message => set({ message }),
  setRetranscriptionStatus: retranscriptionStatus =>
    set({ retranscriptionStatus }),
  setSearchPhrase: searchPhrase =>
    set(state => {
      const { transcript } = state;
      const { searchPhraseIndexes, currentPhraseSearchIndex } =
        findSearchPhrases(searchPhrase, transcript?.phrases);

      return { searchPhrase, searchPhraseIndexes, currentPhraseSearchIndex };
    }),
  setSelectedPhraseIndex: index => set({ selectedPhraseIndex: index }),
  setTranscript: transcript =>
    set(state => {
      const { searchPhrase } = state;
      const { searchPhraseIndexes, currentPhraseSearchIndex } =
        findSearchPhrases(searchPhrase, transcript.phrases);

      return {
        transcript,
        searchPhraseIndexes,
        currentPhraseSearchIndex,
      };
    }),
  startProcessingCorrections: () => set({ isProcessingCorrections: true }),
}));
