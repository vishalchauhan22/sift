import { UIEventPayload } from '@atlassiansox/analytics-web-client';
import * as loggerx from '@js/utilities/loggerx';

import { getAtlassianAnalyticsClient } from './get-analytics-client';

/**
 * Creates a function that sends a UI event to Atlassian Analytics.
 * This is a wrapper around the `sendUIEvent` method of the `AnalyticsWebClient` class.
 *
 * It is different than `../use-event-ui-view-event.ts : useSendUiViewEvent()` because this can be used with any UI event defined in the Atlassian Data Registry,
 * whereas useSendUiViewEvent() tracks MAU per feature by triggering UIViewStart and UIViewComplete events.
 *
 * @param baseOptions The base UI event payload that defines the event structure (action, actionSubject, source, etc.)
 * and any static attributes that won't change between invocations.
 *
 * @returns A function that, when called, will send the UI event. This function accepts an optional
 * `updatedAttributes` parameter that allows you to dynamically add or override specific attributes
 * at the time the event is triggered, without having to recreate the entire event payload.
 *
 * @example
 * // At the component level:
 * const sendToggleEvent = useSendUiEvent({
 *   action: 'clicked',
 *   actionSubject: 'toggle',
 *   source: 'loom',
 *   attributes: {
 *     location: 'settings',
 *   },
 * });
 *
 * Then at the call site, dynamically update the attributes:
 * sendToggleEvent({ enabled: isEnabled });
 *
 * This pattern ensures developers can declare static values once at the component level,
 * and also retain the flexibility to update dynamic attributes at call-time.
 */
export const useSendUiEvent = (
  baseOptions: UIEventPayload
): ((updatedAttributes?: UIEventPayload['attributes']) => void) => {
  const analyticsClient = getAtlassianAnalyticsClient();

  return (updatedAttributes = {}) => {
    try {
      analyticsClient.sendUIEvent({
        ...baseOptions,
        attributes: {
          ...baseOptions.attributes,
          ...updatedAttributes,
          application: 'loom',
        },
      });
    } catch (error) {
      loggerx.warning('Error sending UI event', error);
    }
  };
};

/**
 * Sends a UI event to Atlassian Analytics.
 * This is a wrapper around the `sendUIEvent` method of the `AnalyticsWebClient` class.
 *
 * This is different than `useSendUiEvent()` because this is a standalone function that can be used in any component, and does not accept `attributes` overrides at call time.
 *
 * @param options The UI event payload that defines the event structure (action, actionSubject, source, etc.)
 * and any static attributes that won't change between invocations.
 */

export const sendUiEvent = (options: UIEventPayload): void => {
  const analyticsClient = getAtlassianAnalyticsClient();
  try {
    analyticsClient.sendUIEvent({
      ...options,
      attributes: {
        ...options.attributes,
        application: 'loom',
      },
    });
  } catch (error) {
    loggerx.warning('Error sending UI event', error);
  }
};
