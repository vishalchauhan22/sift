import {
  TOGGLE_IS_TRANSCRIPT_SEARCH_OPEN,
  UPDATE_CURRENT_SEARCH_INDEX,
  UPDATE_RETRANSCRIPTION_STATUS,
  UPDATE_TRANSCRIPT_PANEL_MODE,
  UPDATE_TRANSCRIPT_SEARCH_PHRASE,
  UPDATE_TRANSCRIPT_SEARCH_PHRASE_INDEX_ARRAY,
} from '@js/constants/actions';
import { RetranscriptionStatus } from '@js/utilities/transcript/statuses';

type IndexArray = {
  index: number;
  counter: number;
};

export const updateRetranscriptionStatus = (
  status: RetranscriptionStatus
): { type: string; status: string } => {
  return {
    type: UPDATE_RETRANSCRIPTION_STATUS,
    status,
  };
};

export const toggleIsTranscriptSearchOpen = (
  isTranscriptSearchOpen: boolean
): { type: string; isTranscriptSearchOpen: boolean } => {
  return {
    type: TOGGLE_IS_TRANSCRIPT_SEARCH_OPEN,
    isTranscriptSearchOpen,
  };
};

export const updateTranscriptSearchPhrase = (
  transcriptSearchPhrase: string
): { type: string; transcriptSearchPhrase: string } => {
  return {
    type: UPDATE_TRANSCRIPT_SEARCH_PHRASE,
    transcriptSearchPhrase,
  };
};

export const updateTranscriptSearchPhraseIndexArray = (
  transcriptSearchPhraseIndexArray: IndexArray[]
): { type: string; transcriptSearchPhraseIndexArray: IndexArray[] } => {
  return {
    type: UPDATE_TRANSCRIPT_SEARCH_PHRASE_INDEX_ARRAY,
    transcriptSearchPhraseIndexArray,
  };
};

export const updateTranscriptPanelMode = (
  transcriptPanelMode: string
): { type: string; transcriptPanelMode: string } => {
  return {
    type: UPDATE_TRANSCRIPT_PANEL_MODE,
    transcriptPanelMode,
  };
};

export const updateCurrentSearchIndex = (
  currentSearchIndex: number
): { type: string; currentSearchIndex: number } => {
  return {
    type: UPDATE_CURRENT_SEARCH_INDEX,
    currentSearchIndex,
  };
};
