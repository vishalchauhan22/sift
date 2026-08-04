import {
  TOGGLE_IS_TRANSCRIPT_SEARCH_OPEN,
  UPDATE_CURRENT_SEARCH_INDEX,
  UPDATE_RETRANSCRIPTION_STATUS,
  UPDATE_TRANSCRIPT_PANEL_MODE,
  UPDATE_TRANSCRIPT_SEARCH_PHRASE,
  UPDATE_TRANSCRIPT_SEARCH_PHRASE_INDEX_ARRAY,
} from '@js/constants/actions';

import { RetranscriptionStatus } from '@js/utilities/transcript/statuses';

export type TranscriptSearchState = {
  isTranscriptSearchOpen: boolean;
  transcriptSearchPhrase: string;
  transcriptSearchPhraseIndexArray: number[];
  currentSearchIndex: number;
};

export type ShareVideoState = {
  retranscription_status: RetranscriptionStatus;
  transcriptPanelMode: string;
  transcriptSearch: TranscriptSearchState;
};

type ShareVideoAction = {
  type: string;
  status: RetranscriptionStatus;
  isTranscriptSearchOpen: boolean;
  transcriptSearchPhrase: string;
  transcriptSearchPhraseIndexArray: number[];
  currentSearchIndex: number;
  transcriptPanelMode: string;
};

const DEFAULT_TRANSCRIPT_SEARCH_STATE = {
  isTranscriptSearchOpen: false,
  transcriptSearchPhrase: '',
  transcriptSearchPhraseIndexArray: [],
  currentSearchIndex: 0,
};

export const TRANSCRIPT_PANEL_MODE_VIEW = 'view';
export const TRANSCRIPT_PANEL_MODE_CORRECTION = 'correction';

/* THIS REDUCER IS NOT ACCESSIBLE BY EMBED VIDEOS */
const DEFAULT_STATE: ShareVideoState = {
  retranscription_status: RetranscriptionStatus.NOT_STARTED,
  transcriptPanelMode: TRANSCRIPT_PANEL_MODE_VIEW,
  transcriptSearch: {
    ...DEFAULT_TRANSCRIPT_SEARCH_STATE,
  },
};

const shareVideoReducer = (
  state: ShareVideoState = DEFAULT_STATE,
  action: ShareVideoAction
): ShareVideoState => {
  let newState = state;

  switch (action.type) {
    case UPDATE_RETRANSCRIPTION_STATUS:
      newState = {
        ...state,
        retranscription_status: action.status,
      };
      break;

    case TOGGLE_IS_TRANSCRIPT_SEARCH_OPEN:
      newState = {
        ...state,
        transcriptSearch: {
          ...DEFAULT_TRANSCRIPT_SEARCH_STATE,
          isTranscriptSearchOpen: action.isTranscriptSearchOpen,
        },
      };
      break;
    case UPDATE_TRANSCRIPT_SEARCH_PHRASE:
      newState = {
        ...state,
        transcriptSearch: {
          ...state.transcriptSearch,
          transcriptSearchPhrase: action.transcriptSearchPhrase,
        },
      };
      break;
    case UPDATE_TRANSCRIPT_SEARCH_PHRASE_INDEX_ARRAY:
      newState = {
        ...state,
        transcriptSearch: {
          ...state.transcriptSearch,
          transcriptSearchPhraseIndexArray:
            action.transcriptSearchPhraseIndexArray,
        },
      };
      break;
    case UPDATE_CURRENT_SEARCH_INDEX:
      newState = {
        ...state,
        transcriptSearch: {
          ...state.transcriptSearch,
          currentSearchIndex: action.currentSearchIndex,
        },
      };
      break;
    case UPDATE_TRANSCRIPT_PANEL_MODE:
      newState = {
        ...state,
        transcriptPanelMode: action.transcriptPanelMode,
      };
      break;

    default:
      newState = state;
  }

  return newState;
};

// eslint-disable-next-line import/no-default-export
export default shareVideoReducer;
