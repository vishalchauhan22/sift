// TODO(lens): Pull enums directly from Lens NotificationBar component when that is ready
export enum ErrorSeverities {
  ERROR = 'error',
  INFO = 'info',
  INTERNAL = 'internal',
  SUCCESS = 'success',
  WARNING = 'warning',
}

// NOTE(tatiana): To avoid unnecessary import code changes, using reassignment.
export const ERROR = ErrorSeverities.ERROR;
export const INFO = ErrorSeverities.INFO;
export const INTERNAL = ErrorSeverities.INTERNAL;
export const SUCCESS = ErrorSeverities.SUCCESS;
export const WARNING = ErrorSeverities.WARNING;

// TODO(tatiana): Remove this duration from the severities
export const TOAST_MESSAGE_DURATION = 4000;
