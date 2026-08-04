/* eslint-disable @loomhq/loom/no-js-extension */
import { createSelector } from '@reduxjs/toolkit';

import {
  TRANSCRIPT_PANEL_MODE_CORRECTION,
  TRANSCRIPT_PANEL_MODE_VIEW,
} from '@js/reducers/shareVideo';

import { selectShareVideo } from './shareVideo';

const selectTranscription = state => state.transcription;

export const selectTranscriptSearch = createSelector(
  selectShareVideo,
  shareVideo => shareVideo.transcriptSearch
);

export const selectIsTranscriptSearchOpen = createSelector(
  selectTranscriptSearch,
  transcriptSearch => transcriptSearch.isTranscriptSearchOpen
);

export const selectTranscriptSearchPhrase = createSelector(
  selectTranscriptSearch,
  transcriptSearch => transcriptSearch.transcriptSearchPhrase
);

export const selectTranscriptSearchPhraseIndexArray = createSelector(
  selectTranscriptSearch,
  transcriptSearch => transcriptSearch.transcriptSearchPhraseIndexArray
);

export const selectCurrentSearchIndex = createSelector(
  selectTranscriptSearch,
  transcriptSearch => transcriptSearch.currentSearchIndex
);

export const selectSelectedElementSource = createSelector(
  selectTranscription,
  transcription => transcription.selectedElementSource
);

export const selectEditedRowIndex = createSelector(
  selectTranscription,
  transcription => transcription.editedRowIndex
);

export const selectHoveredRowIndex = createSelector(
  selectTranscription,
  transcription => transcription.hoveredRowIndex
);

export const selectTranscriptPanelMode = createSelector(
  selectShareVideo,
  shareVideo => shareVideo.transcriptPanelMode
);

export const selectIsTranscriptCorrectionsPopUpOpen = createSelector(
  selectTranscription,
  transcription => transcription.isPopupOpen
);

export const selectTranscriptTextToCorrect = createSelector(
  selectTranscription,
  transcription => transcription.textToCorrect
);

export const selectTranscriptSelectedOccurrenceIndex = createSelector(
  selectTranscription,
  transcription => transcription.selectedOccurrenceIndex
);

export const selectShowDefaultTranscriptHeader = createSelector(
  selectIsTranscriptSearchOpen,
  selectTranscriptPanelMode,
  (isSearchOpen, panelMode) =>
    !isSearchOpen && panelMode === TRANSCRIPT_PANEL_MODE_VIEW
);

export const selectShowTranscriptCorrectionHeader = createSelector(
  selectIsTranscriptSearchOpen,
  selectTranscriptPanelMode,
  (isSearchOpen, panelMode) =>
    !isSearchOpen && panelMode === TRANSCRIPT_PANEL_MODE_CORRECTION
);

export const selectTranscriptWithLocalCorrections = createSelector(
  selectTranscription,
  transcription => transcription.transcriptWithLocalCorrections
);

export const selectTranscriptCorrectionMessage = createSelector(
  selectTranscription,
  transcription => transcription.transcriptCorrectionMessage
);

export const selectTranscriptCorrectionsEnabled = createSelector(
  selectTranscription,
  transcription => transcription.correctionsEnabled
);

export const selectRetranscriptionStatus = createSelector(
  selectShareVideo,
  shareVideo => shareVideo.retranscription_status
);
