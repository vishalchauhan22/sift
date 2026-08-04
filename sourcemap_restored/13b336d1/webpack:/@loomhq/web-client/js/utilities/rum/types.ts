import { TriggerNames } from './constants';

export type MarkerName = string;

export enum FailType {
  TIMEOUT = 'TIMEOUT',
  ERROR_MARKER = 'ERROR_MARKER',
}

export interface RUMMark {
  name: MarkerName;
  markedAt: DOMHighResTimeStamp;
}

export interface RUMMarkSuccess extends RUMMark {
  isOptional: boolean;
}

export interface RUMTriggerExtraProps {
  entryPoint?: string;
  revisitTrim?: boolean;
  videoSourceDuration?: number;
  isInitialLoad?: boolean;
  transcriptTokenCount?: number;
}

export interface RUMTrigger {
  name: TriggerNames;
  timestamp: DOMHighResTimeStamp;
  duration?: number;
  properties?: RUMTriggerExtraProps;
}

export interface RUMMarkFail extends RUMMark {
  failType: FailType;
}

export enum CancelType {
  TIMEOUT = 'TIMEOUT',
  NEW_TRIGGER = 'NEW TRIGGER',
}

export enum ViewType {
  CREATOR = 'CREATOR',
  VIEWER = 'VIEWER',
  ANONYMOUS = 'ANONYMOUS',
}

export enum RUMActionTypesWithPayload {
  MARK_SUCCESS = 'rum/mark-success',
  MARK_ERROR = 'rum/mark-error',
}

export enum SimpleRUMActionTypes {
  INIT_REPORTED = 'rum/init',
  PAGE_FAILURE_REPORTED = 'rum/page-failure-reported',
  PAGE_SUCCESS_REPORTED = 'rum/page-success-reported',
  TIMEOUT_STARTED = 'rum/timeout-started',
  TIMEOUTS_REPORTED = 'rum/timeouts-reported',
}

export type SimpleRUMAction = {
  type: SimpleRUMActionTypes;
};

export type MarkSuccessRUMAction = {
  type: RUMActionTypesWithPayload.MARK_SUCCESS;
  payload: RUMMarkSuccess;
};
export type MarkErrorRUMAction = {
  type: RUMActionTypesWithPayload.MARK_ERROR;
  payload: RUMMarkFail;
};

export type RUMAction =
  | SimpleRUMAction
  | MarkSuccessRUMAction
  | MarkErrorRUMAction;
