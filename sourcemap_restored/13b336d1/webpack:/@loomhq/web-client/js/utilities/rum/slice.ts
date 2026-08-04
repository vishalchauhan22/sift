import {
  MarkerName,
  MarkErrorRUMAction,
  MarkSuccessRUMAction,
  RUMAction,
  RUMActionTypesWithPayload,
  RUMMarkFail,
  RUMMarkSuccess,
  SimpleRUMActionTypes,
} from './types';

export const markSuccess = (payload: RUMMarkSuccess): MarkSuccessRUMAction => ({
  type: RUMActionTypesWithPayload.MARK_SUCCESS,
  payload,
});

export const markError = (payload: RUMMarkFail): MarkErrorRUMAction => ({
  type: RUMActionTypesWithPayload.MARK_ERROR,
  payload,
});

export const initReported = {
  type: SimpleRUMActionTypes.INIT_REPORTED,
};

export const pageFailureReported = {
  type: SimpleRUMActionTypes.PAGE_FAILURE_REPORTED,
};

export const pageSuccessReported = {
  type: SimpleRUMActionTypes.PAGE_SUCCESS_REPORTED,
};

export const timeoutStarted = {
  type: SimpleRUMActionTypes.TIMEOUT_STARTED,
};

export const timeoutsReported = {
  type: SimpleRUMActionTypes.TIMEOUTS_REPORTED,
};

interface RUMState {
  reportableSuccessMarks: { [name: MarkerName]: RUMMarkSuccess };
  allSuccessMarks: RUMMarkSuccess[];
  errors: RUMMarkFail[];
  hasReportedInit: boolean;
  hasReportedFailure: boolean;
  hasReportedSuccess: boolean;
  hasReportedTimeouts: boolean;
}

export function buildInitialState(): RUMState {
  return {
    reportableSuccessMarks: {},
    allSuccessMarks: [],
    errors: [],
    hasReportedInit: false,
    hasReportedFailure: false,
    hasReportedSuccess: false,
    hasReportedTimeouts: false,
  };
}

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const RUMReducer = (state: RUMState, action: RUMAction): RUMState => {
  const newState = { ...state };
  switch (action.type) {
    case SimpleRUMActionTypes.INIT_REPORTED:
      newState.hasReportedInit = true;
      return newState;
    case RUMActionTypesWithPayload.MARK_SUCCESS:
      newState.allSuccessMarks = state.allSuccessMarks.concat(action.payload);

      if (!state.reportableSuccessMarks[action.payload.name]) {
        newState.reportableSuccessMarks = {
          ...state.reportableSuccessMarks,
          [action.payload.name]: action.payload,
        };
      }

      return newState;
    case RUMActionTypesWithPayload.MARK_ERROR:
      newState.errors = state.errors.concat(action.payload);
      return newState;
    case SimpleRUMActionTypes.PAGE_FAILURE_REPORTED:
      newState.hasReportedFailure = true;
      return newState;
    case SimpleRUMActionTypes.PAGE_SUCCESS_REPORTED:
      newState.hasReportedSuccess = true;
      return newState;
    case SimpleRUMActionTypes.TIMEOUTS_REPORTED:
      newState.hasReportedTimeouts = true;
      return newState;
    default:
      return state;
  }
};
