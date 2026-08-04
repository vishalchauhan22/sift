import { ErrorSeverities } from '@js/constants/error-severities';
import { ERROR_BAR_DISMISSED } from '@js/constants/events';

import _isString from 'lodash/isString';
import create from 'zustand';

import {
  DAILY_BANNER_KEYS,
  getDowntimeDateVal,
} from '@js/constants/banner-types';
import { track } from '@js/utilities/analytics';
import { setLocalStorageKey } from '@js/utilities/localStorage';

import { ErrorBarState, ErrorBarStore, ShowErrorBarOptions } from './types';

export const defaultErrorBarState: ErrorBarState = {
  actionHref: undefined,
  actionHrefLabel: undefined,
  autoCloseTimer: undefined,
  bannerId: undefined,
  message: '',
  severity: ErrorSeverities.ERROR,
  showing: false,
};

export const invalidMessageErrorMessage = 'Oops! Something went wrong';

export const useErrorBar = create<ErrorBarStore>(set => ({
  errorBar: defaultErrorBarState,
  /**
   * This method resets the error bar to the initial state defined above in `defaultErrorBarState`. Most notable aspect of the default
   * error bar state is that `showing` is explicitly false. The other values are not relevant.
   *
   * @remarks
   * This Zustand method resets the data rendered in the error bar component: "projects/webapp-client/js/components/error-bar/index.tsx"
   */
  closeErrorBar: () => {
    return set(({ errorBar }: { errorBar: ErrorBarState }) => {
      const { bannerId } = errorBar;
      track(ERROR_BAR_DISMISSED, errorBar);

      if (bannerId && DAILY_BANNER_KEYS.includes(bannerId)) {
        setLocalStorageKey(bannerId, getDowntimeDateVal());
      }

      return {
        errorBar: defaultErrorBarState,
      };
    });
  },
  /**
   * This method sends data that the error bar component will consume to display, at minimum, the message and given severity.
   * The error bar component is able to handle 5 different severities: error, info, internal, success, and warning.
   *
   * @remarks
   * This Zustand method sends its data to the error bar component: "projects/webapp-client/js/components/error-bar/index.tsx"
   *
   * @param options.message - (REQUIRED) the string displayed in the error bar component
   * @param options.severity - (REQUIRED) determines which UI will be used to render the message. Use `ErrorSeverities` enum to determine which one is right for your use case
   * @param options.actionHref - (OPTIONAL) href string provided in conjunction with actionHrefLabel to create a hyperlink
   * @param options.actionHrefLabel - (OPTIONAL) label string provided in conjunction with actionHref to create an alias for the hyperlink
   * @param options.autoCloseTimer - (OPTIONAL) Number in milliseconds (3000, 5000, 10000) to elapse before closing the notification
   * @param options.bannerId - (OPTIONAL) string that will be applied as the ID of the error bar component for testing purposes
   */
  showErrorBar: ({
    actionHref,
    actionHrefLabel,
    autoCloseTimer,
    bannerId = undefined,
    message,
    severity,
  }: ShowErrorBarOptions) => {
    set(() => {
      let messageString;

      if (_isString(message)) {
        messageString = message;
      } else {
        if (message?.toString) {
          messageString = message.toString();
        } else {
          messageString = invalidMessageErrorMessage;
        }
      }

      return {
        errorBar: {
          actionHref,
          actionHrefLabel,
          autoCloseTimer,
          bannerId,
          message: messageString,
          severity,
          showing: true,
        },
      };
    });
  },
}));
