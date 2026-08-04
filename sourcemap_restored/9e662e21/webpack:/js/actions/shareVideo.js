/* eslint-disable @loomhq/loom/no-js-extension */
import {
  TOGGLE_IS_TRANSCRIPT_SEARCH_OPEN,
  UPDATE_CURRENT_SEARCH_INDEX,
  UPDATE_RETRANSCRIPTION_STATUS,
  UPDATE_TRANSCRIPT_PANEL_MODE,
  UPDATE_TRANSCRIPT_SEARCH_PHRASE,
  UPDATE_TRANSCRIPT_SEARCH_PHRASE_INDEX_ARRAY,
} from '@js/constants/actions';

export const updateRetranscriptionStatus = status => {
  return {
    type: UPDATE_RETRANSCRIPTION_STATUS,
    status,
  };
};

export const toggleIsTranscriptSearchOpen = isTranscriptSearchOpen => {
  return {
    type: TOGGLE_IS_TRANSCRIPT_SEARCH_OPEN,
    isTranscriptSearchOpen,
  };
};

export const updateTranscriptSearchPhrase = transcriptSearchPhrase => {
  return {
    type: UPDATE_TRANSCRIPT_SEARCH_PHRASE,
    transcriptSearchPhrase,
  };
};

export const updateTranscriptSearchPhraseIndexArray =
  transcriptSearchPhraseIndexArray => {
    return {
      type: UPDATE_TRANSCRIPT_SEARCH_PHRASE_INDEX_ARRAY,
      transcriptSearchPhraseIndexArray,
    };
  };

export const updateTranscriptPanelMode = transcriptPanelMode => {
  return {
    type: UPDATE_TRANSCRIPT_PANEL_MODE,
    transcriptPanelMode,
  };
};

export const updateCurrentSearchIndex = currentSearchIndex => {
  return {
    type: UPDATE_CURRENT_SEARCH_INDEX,
    currentSearchIndex,
  };
};
