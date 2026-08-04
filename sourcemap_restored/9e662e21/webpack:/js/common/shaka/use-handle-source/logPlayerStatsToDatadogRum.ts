import { datadogRum } from '@js/utilities/rum';

const SHAKA_STATS_ACTION_NAME = 'ShakaStats';

export enum LogReason {
  PlaybackEnded = 'PlaybackEnded',
  BeforeUnloadEvent = 'BeforeUnloadEvent',
}

export function logPlayerStatsToDataDogRum(
  data: Record<string, any> = {},
  reason: LogReason
): void {
  datadogRum.addAction(SHAKA_STATS_ACTION_NAME, {
    ...data,
    reason,
  });
}
