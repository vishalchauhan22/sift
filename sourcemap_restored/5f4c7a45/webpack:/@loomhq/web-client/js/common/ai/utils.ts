import {
  AutoChapterStatusesType,
  IntelligenceStatusType,
} from '@js/globalTypes.generated';

export const INTELLIGENCE_TIMEOUT_MS = 10000; // 10 seconds

type StatusType = null | IntelligenceStatusType | AutoChapterStatusesType;

// determines if the feature status has reached a final state, i.e.
// it's not in progress and we're no longer expecting it to transition to
// another status.
export const isTerminalStatus = (featureStatus: StatusType): boolean =>
  ![
    null,
    IntelligenceStatusType.Pending,
    AutoChapterStatusesType.InProgress,
  ].includes(featureStatus);

// determine the resulting status for a feature, taking into account the
// possibility that we may have waited too long and just want to give up on it
// as timed out.
export function resolveIntelligenceStatus(
  status: IntelligenceStatusType | null,
  hasTimedOut: boolean,
  timedOutStatus: IntelligenceStatusType | null
): IntelligenceStatusType | null {
  // if we already have the final status, use it regardless if some other feature timed out
  if (isTerminalStatus(status)) {
    return status;
  }

  return hasTimedOut ? timedOutStatus : status;
}
export function resolveChapterStatus(
  status: AutoChapterStatusesType | null,
  hasTimedOut: boolean,
  timedOutStatus: AutoChapterStatusesType | null
): AutoChapterStatusesType | null {
  // if we already have the final status, use it regardless if some other feature timed out
  if (isTerminalStatus(status)) {
    return status;
  }

  return hasTimedOut ? timedOutStatus : status;
}
