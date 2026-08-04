import { segmentToGasMap } from '@js/constants/segment-to-gas-map';

import {
  eventType as eventTypeEnum,
  type OperationalEventPayload,
} from '@atlassiansox/analytics-web-client';
import { getAtlassianAnalyticsClient } from '@js/common/analytics/atlassian-analytics/get-analytics-client';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import * as logger from '../loggerx';
import { AnalyticsEvent, AnalyticsEventProps } from './types';

export const sendAtlassianAnalyticsEvent = (
  evt: AnalyticsEvent,
  attributes: AnalyticsEventProps
  // TODO: add callback when segment is removed
): void => {
  try {
    const gasEventEntry = segmentToGasMap[evt];
    if (!gasEventEntry) {
      throw new Error(`No gas event entry found for segment event: ${evt}`);
    }

    const analyticsClient = getAtlassianAnalyticsClient();

    // screen event does not have action or actionSubject
    if ('action' in gasEventEntry && 'actionSubject' in gasEventEntry) {
      const {
        action,
        actionSubject,
        actionSubjectId,
        eventType,
        source: gasEventSource,
      } = gasEventEntry;

      const source = gasEventSource
        ? gasEventSource
        : attributes.source
          ? attributes.source
          : 'website';

      const eventPayload: OperationalEventPayload = {
        action,
        actionSubject,
        actionSubjectId,
        source,
        attributes,
      };

      logger.info(`📊 [analytics] Send Atlassian analytics event: ${evt}`, {
        userId: attributes.userId,
      });

      switch (eventType) {
        case 'track':
          analyticsClient.sendTrackEvent(eventPayload);
          break;
        case 'operational':
          analyticsClient.sendOperationalEvent(eventPayload);
          break;
        default:
        case 'ui':
          analyticsClient.sendUIEvent(eventPayload); // TODO: add callback when segment is removed
          break;
      }
    } else if (gasEventEntry.eventType === eventTypeEnum.SCREEN) {
      analyticsClient.sendScreenEvent({
        name: gasEventEntry.name,
        attributes,
      });
    }
  } catch (error) {
    logger.error(
      error,
      { message: 'Error sending Atlassian analytics event' },
      {
        feature: Feature.AtlassianAnalytics,
      }
    );
  }
};
