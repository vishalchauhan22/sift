import { RUM_MARKER } from '@js/constants/events';
import { LOOM_SHOW_RUM_FEATURE_LOGS } from '@js/constants/runtimeConfig';

import isFunction from 'lodash/isFunction';

import {
  Feature,
  FeatureInfo,
} from '@loomhq/shared-utilities/constants/product';
import * as analytics from '@js/utilities/analytics';

import * as loggerx from '../loggerx';
import { datadogRum } from '../rum';
import {
  RUMEvents,
  TriggerNames,
  MarkersForTriggers,
  SegmentMarkers,
} from './constants';
import { FeatureEvents } from './feature-wrapper/constants';
import {
  FailType,
  RUMMark,
  RUMTrigger,
  CancelType,
  RUMMarkSuccess,
} from './types';

export interface RUMReportingContext {
  [key: string]: unknown;
}

interface BaseReportingInfo {
  pageName: string;
  pageWasEverHidden: boolean;
}

type SettledReportingInfo = BaseReportingInfo & {
  timestamp: DOMHighResTimeStamp;
};

type MarkerReportingInfo<T extends RUMMark> = BaseReportingInfo & {
  mark: T;
};

type TriggerReportingInfo = { trigger: RUMTrigger };
type MarkerResultReportingInfo = {
  name: MarkersForTriggers;
  trigger: TriggerNames;
  duration: number;
};

// Reporting data with all function values evaluated
type EvaluatedReportingData<BaseReportingContext extends RUMReportingContext> =
  {
    [key in keyof BaseReportingContext]: BaseReportingContext[key] extends () => unknown
      ? ReturnType<BaseReportingContext[key]>
      : BaseReportingContext[key];
  };

/**
 * Calls any function values in the extraReportingContext and returns the evaluated object
 * For example, if extraReportingContext = { foo: () => 'bar' }, then the returned object will be { foo: 'bar' }
 * @param reportingData
 * @returns Reporting context that can be sent to our analytics provider
 */
function evaluateReportingData<T extends RUMReportingContext>(
  reportingData: T
): EvaluatedReportingData<T> {
  return Object.keys(reportingData).reduce(
    (accObj, key) => ({
      ...accObj,
      [key]: isFunction(reportingData[key])
        ? (reportingData[key] as () => unknown)()
        : reportingData[key],
    }),
    {} as Partial<EvaluatedReportingData<T>>
  ) as EvaluatedReportingData<T>;
}

export function safePerformanceMark(
  markName: string,
  markOptions?: PerformanceMarkOptions | undefined
): void {
  if (window.performance.mark) {
    window.performance.mark(markName, markOptions);
  }
}

function trackRUMMarkerToSegment<T extends RUMReportingContext>(
  eventName: RUMEvents | FeatureEvents,
  data: MarkerReportingInfo<RUMMark | RUMMarkSuccess> & T
) {
  const { mark, ...rest } = data;

  if (mark.name in SegmentMarkers) {
    analytics.track(RUM_MARKER, {
      actionName: eventName,
      ...mark,
      ...evaluateReportingData(rest),
    });
  }
}

/**
 * Type guard to check if data is MarkerReportingInfo<RUMMark>
 */
export function isMarkerReportingInfo<T extends RUMReportingContext>(
  data: T
): data is T & MarkerReportingInfo<RUMMark> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'mark' in data &&
    typeof data.mark === 'object' &&
    data.mark !== null &&
    'name' in data.mark &&
    typeof data.mark.name === 'string' &&
    'markedAt' in data.mark &&
    typeof data.mark.markedAt === 'number'
  );
}

function logRumAction<T extends RUMReportingContext>(
  eventName: RUMEvents | FeatureEvents,
  data: T,
  requiresOptIn?: boolean // For verbose logging we want to allow opt-in for using an env var
) {
  const evaluatedData = evaluateReportingData(data);

  // LOOM_SHOW_RUM_FEATURE_LOGS defaults to false. Engs can set to true in their local env vars to true
  if (
    !requiresOptIn ||
    (requiresOptIn && LOOM_SHOW_RUM_FEATURE_LOGS === 'true')
  ) {
    loggerx.debug(
      `[RUM] ${eventName}${isMarkerReportingInfo(data) ? `: ${data.mark.name}` : ''}`,
      evaluatedData
    );
  }

  datadogRum.addAction(eventName, evaluatedData);
}

export function reportRUMInit<T extends RUMReportingContext>(
  data: BaseReportingInfo & T & { timestamp: DOMHighResTimeStamp }
): void {
  safePerformanceMark(RUMEvents.RUMInit, { startTime: data.timestamp });
  logRumAction(RUMEvents.RUMInit, data);
}

export function reportSuccessMarker<T extends RUMReportingContext>(
  data: MarkerReportingInfo<RUMMarkSuccess> & T
): void {
  safePerformanceMark(`${RUMEvents.Success}: ${data.mark.name}`, {
    startTime: data.mark.markedAt,
  });
  trackRUMMarkerToSegment(RUMEvents.Success, data);
  logRumAction(RUMEvents.Success, data);
}

export function reportDuplicateSuccessMarker<T extends RUMReportingContext>(
  data: MarkerReportingInfo<RUMMarkSuccess> & T
): void {
  safePerformanceMark(`${RUMEvents.DupSuccess}: ${data.mark.name}`, {
    startTime: data.mark.markedAt,
  });
  logRumAction(RUMEvents.DupSuccess, data);
}

export function reportErrorMarker<T extends RUMReportingContext>(
  data: MarkerReportingInfo<RUMMark> & T & { error?: Error }
): void {
  safePerformanceMark(`${RUMEvents.Error}: ${data.mark.name}`);
  trackRUMMarkerToSegment(RUMEvents.Error, data);
  logRumAction(RUMEvents.Error, data);
}

export function reportFeatureEvent(
  eventName: FeatureEvents,
  feature: FeatureInfo,
  loggingValues: Record<string, any> = {}
): void {
  const {
    name: featureName,
    team: { name: teamOwner },
  } = feature;

  let timestamp;

  try {
    timestamp = window.performance.now();
  } catch (err) {
    loggerx.error(
      err,
      { message: 'Performance API not available' },
      { feature: Feature.FeatureWrapper }
    );
  }

  safePerformanceMark(`${featureName}: ${eventName}`, { startTime: timestamp });
  logRumAction(
    eventName,
    {
      featureName,
      teamOwner,
      timestamp,
      ...loggingValues,
    },
    true
  );
}

export function reportMarkerTimeout<T extends RUMReportingContext>(
  data: MarkerReportingInfo<RUMMark> & T
): void {
  safePerformanceMark(`${RUMEvents.MarkerTimeout}: ${data.mark.name}`, {
    startTime: data.mark.markedAt,
  });
  logRumAction(RUMEvents.MarkerTimeout, data);
}

export function reportPageLoadSuccess<T extends RUMReportingContext>(
  data: SettledReportingInfo & T
): void {
  safePerformanceMark(RUMEvents.PageLoadSuccess, { startTime: data.timestamp });
  logRumAction(RUMEvents.PageLoadSuccess, data);
}

export function reportPageLoadFail<T extends RUMReportingContext>(
  data: SettledReportingInfo & T & { failType: FailType }
): void {
  safePerformanceMark(RUMEvents.PageLoadFail, { startTime: data.timestamp });
  logRumAction(RUMEvents.PageLoadFail, data);
}

// Trigger
export function reportTriggerStarts<T extends RUMReportingContext>(
  data: TriggerReportingInfo & T
): void {
  safePerformanceMark(`${RUMEvents.TriggerStarts}: ${data.trigger.name}`, {
    startTime: data.trigger.timestamp,
  });
  logRumAction(RUMEvents.TriggerStarts, data);
}

export function reportTriggerEnds<T extends RUMReportingContext>(
  data: TriggerReportingInfo & T
): void {
  safePerformanceMark(`${RUMEvents.TriggerEnds}: ${data.trigger.name}`, {
    startTime: data.trigger.timestamp,
  });
  logRumAction(RUMEvents.TriggerEnds, data);
}

export function reportingMarkerUpdated<T extends RUMReportingContext>(
  data: MarkerResultReportingInfo & T
): void {
  safePerformanceMark(`${RUMEvents.MarkerUpdated}: ${data.name}`);
  logRumAction(RUMEvents.MarkerUpdated, { updatedMarker: data });
}

export function reportTriggerCancelled<T extends RUMReportingContext>(
  data: TriggerReportingInfo & T,
  reason: CancelType
): void {
  safePerformanceMark(`${RUMEvents.TriggerCancelled}: ${data.trigger.name}`, {
    startTime: data.trigger.timestamp,
  });
  logRumAction(RUMEvents.TriggerCancelled, { ...data, reason });
}
