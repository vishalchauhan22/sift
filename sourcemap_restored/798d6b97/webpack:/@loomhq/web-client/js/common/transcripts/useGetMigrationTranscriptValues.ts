import { isNewTranscriptArchitecture } from '@loomhq/shared-utilities/utilities/transcriptionUtils';
import {
  useTranscriptStore,
  type PhraseIndex,
} from '@js/common/transcripts/useTranscriptStore';
import { RetranscriptionStatus } from '@js/utilities/transcript/statuses';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsTranscriptSearchOpen,
  selectRetranscriptionStatus,
  selectShowDefaultTranscriptHeader,
  selectShowTranscriptCorrectionHeader,
  selectTranscriptSearchPhrase,
  selectTranscriptSearchPhraseIndexArray,
  selectCurrentSearchIndex,
  selectTranscriptWithLocalCorrections,
  selectTranscriptCorrectionsEnabled,
  selectIsTranscriptCorrectionsPopUpOpen,
} from '@js/selectors/transcripts';
import { revertAllCorrections as legacyRevertAllCorrections } from '@js/reducers/transcription';
import { Transcript, Language } from '@loomhq/shared-utilities';

type UseGetMigrationTranscriptValuesReturnValue = {
  transcriptWithLocalCorrections: Transcript | null;
  isSearchOpen: boolean;
  isCorrectionsPopupOpen: boolean;
  currentPhraseSearchIndex: number;
  searchPhraseIndexes: PhraseIndex[] | null;
  searchPhrase: string;
  retranscriptionStatus: RetranscriptionStatus;
  showCorrectionsHeader: boolean;
  showDefaultTranscriptHeader: boolean;
  transcriptLanguage?: Language;
  newTranscriptArchitecture: boolean;
  isProcessingCorrections: boolean;
  revertAllCorrections: (videoId: string) => Promise<void>;
};

/**
 * Temporary hook to get data from either Redux or zustand based on the type of architecture
 * Files has to be deleted once new architecture if fully implemented.
 *
 * Note: Redux actions/reducers along with Zustand actions are being separetally called
 */
export const useGetMigrationTranscriptValues =
  (): UseGetMigrationTranscriptValuesReturnValue => {
    const dispatch = useDispatch();
    const {
      transcript,
      isSearchOpen,
      searchPhrase,
      currentPhraseSearchIndex,
      searchPhraseIndexes,
      retranscriptionStatus,
      isCorrectMode,
      isProcessingCorrections,
      revertAllCorrections,
      isCorrectionsPopupOpen,
    } = useTranscriptStore();
    const legacyTranscriptWithLocalCorrections = useSelector(
      selectTranscriptWithLocalCorrections
    );
    const legacyIsSearchOpen = useSelector(selectIsTranscriptSearchOpen);

    const legacyRetranscriptionStatus = useSelector(
      selectRetranscriptionStatus
    );
    const searchTerm = useSelector(selectTranscriptSearchPhrase);
    const searchTermIndices = useSelector(
      selectTranscriptSearchPhraseIndexArray
    );
    const currentSearchIndex = useSelector(selectCurrentSearchIndex);
    const showCorrectionsHeader = useSelector(
      selectShowTranscriptCorrectionHeader
    );
    const showDefaultTranscriptHeader = useSelector(
      selectShowDefaultTranscriptHeader
    );
    const correctionsEnabled = useSelector(selectTranscriptCorrectionsEnabled);
    const popUpIsOpen = useSelector(selectIsTranscriptCorrectionsPopUpOpen);

    const newTranscriptArchitecture = isNewTranscriptArchitecture(transcript);

    if (newTranscriptArchitecture) {
      return {
        currentPhraseSearchIndex,
        isCorrectionsPopupOpen,
        isProcessingCorrections,
        isSearchOpen,
        newTranscriptArchitecture,
        retranscriptionStatus,
        revertAllCorrections,
        searchPhrase,
        searchPhraseIndexes,
        showCorrectionsHeader: isCorrectMode && !isSearchOpen,
        showDefaultTranscriptHeader: !isCorrectMode && !isSearchOpen,
        transcriptWithLocalCorrections: transcript,
      };
    }

    return {
      currentPhraseSearchIndex: currentSearchIndex,
      isCorrectionsPopupOpen: popUpIsOpen,
      isProcessingCorrections: !correctionsEnabled,
      isSearchOpen: legacyIsSearchOpen,
      newTranscriptArchitecture,
      retranscriptionStatus: legacyRetranscriptionStatus,
      revertAllCorrections: async (videoId: string) => {
        await dispatch(legacyRevertAllCorrections(videoId));
      },
      searchPhrase: searchTerm,
      searchPhraseIndexes: searchTermIndices,
      showCorrectionsHeader,
      showDefaultTranscriptHeader,
      transcriptWithLocalCorrections: legacyTranscriptWithLocalCorrections,
    };
  };
