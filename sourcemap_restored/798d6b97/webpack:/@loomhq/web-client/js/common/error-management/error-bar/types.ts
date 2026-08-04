import { ErrorSeverities } from '@js/constants/error-severities';

export enum AutoCloseTimings {
  THREE_SECONDS = 3000,
  FIVE_SECONDS = 5000,
  TEN_SECONDS = 10000,
}

type ShowErrorBarBaseOptions = {
  autoCloseTimer?: AutoCloseTimings;
  bannerId?: string;
  message: string | unknown;
  severity: ErrorSeverities;
};

type WithActionHref = {
  actionHref?: string;
  actionHrefLabel?: string;
};

export type ShowErrorBarOptions = ShowErrorBarBaseOptions & WithActionHref;

export type ErrorBarState = ShowErrorBarOptions & { showing: boolean };

type ErrorBarActions = {
  closeErrorBar: () => void;
  showErrorBar: (showErrorBarOptions: ShowErrorBarOptions) => void;
};

export type ErrorBarStore = { errorBar: ErrorBarState } & ErrorBarActions;
