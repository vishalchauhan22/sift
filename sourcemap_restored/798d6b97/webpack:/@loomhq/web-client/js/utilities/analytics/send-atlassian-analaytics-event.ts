import { segmentToGasMap } from '@js/constants/segment-to-gas-map';

import {
  eventType as eventTypeEnum,
  type OperationalEventPayload,
} from '@atlassiansox/analytics-web-client';
import { getAtlassianAnalyticsClient } from '@js/common/analytics/atlassian-analytics/get-analytics-client';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import * as logger from '../loggerx';
import * as metrics from '../metrics';
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

      logger.info(
        `📊 [analytics] Send Atlassian analytics event (${eventType}) : ${evt}`,
        {
          userId: attributes.userId,
        }
      );

      switch (eventType) {
        case 'track':
          analyticsClient
            .sendTrackEvent(eventPayload)
            .then(() => {
              metrics.incrementMetric(
                'frontend.atlassian_analytics.send_event.success',
                {
                  eventType,
                }
              );
            })
            .catch(error => {
              metrics.incrementMetric(
                'frontend.atlassian_analytics.send_event.error',
                {
                  eventType,
                }
              );

              logger.error(
                error,
                {
                  message: 'Error sending Atlassian analytics track event',
                  eventName: evt,
                  eventDetails: eventPayload,
                },
                {
                  feature: Feature.AtlassianAnalytics,
                }
              );
            });

          break;
        case 'operational':
          analyticsClient
            .sendOperationalEvent(eventPayload)
            .then(() => {
              metrics.incrementMetric(
                'frontend.atlassian_analytics.send_event.success',
                {
                  eventType,
                }
              );
            })
            .catch(error => {
              metrics.incrementMetric(
                'frontend.atlassian_analytics.send_event.error',
                {
                  eventType,
                }
              );

              logger.error(
                error,
                {
                  message:
                    'Error sending Atlassian analytics operational event',
                  eventName: evt,
                  eventDetails: eventPayload,
                },
                {
                  feature: Feature.AtlassianAnalytics,
                }
              );
            });
          break;
        default:
        case 'ui':
          analyticsClient
            .sendUIEvent(eventPayload)
            .then(() => {
              metrics.incrementMetric(
                'frontend.atlassian_analytics.send_event.success',
                {
                  eventType,
                }
              );
            })
            .catch(error => {
              metrics.incrementMetric(
                'frontend.atlassian_analytics.send_event.error',
                {
                  eventType,
                }
              );
              logger.error(
                error,
                {
                  message: 'Error sending Atlassian analytics UI event',
                  eventName: evt,
                  eventDetails: eventPayload,
                },
                {
                  feature: Feature.AtlassianAnalytics,
                }
              );
            });
          break;
      }
    } else if (gasEventEntry.eventType === eventTypeEnum.SCREEN) {
      logger.info(
        `📊 [analytics] Send Atlassian analytics event (screen) : ${evt}`,
        {
          userId: attributes.userId,
        }
      );

      analyticsClient
        .sendScreenEvent({
          name: gasEventEntry.name,
          attributes,
        })
        .then(() => {
          metrics.incrementMetric(
            'frontend.atlassian_analytics.send_event.success',
            {
              eventType: eventTypeEnum.SCREEN,
            }
          );
        })
        .catch(error => {
          metrics.incrementMetric(
            'frontend.atlassian_analytics.send_event.error',
            {
              eventType: eventTypeEnum.SCREEN,
            }
          );
          logger.error(
            error,
            {
              message: 'Error sending Atlassian analytics screen event',
              eventName: evt,
              eventDetails: attributes,
            },
            {
              feature: Feature.AtlassianAnalytics,
            }
          );
        });
    }
  } catch (error) {
    logger.error(
      error,
      { message: 'Error sending Atlassian analytics event', eventDetails: evt },
      {
        feature: Feature.AtlassianAnalytics,
      }
    );
  }
};
